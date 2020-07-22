<template>
<!-- 所有标签 -->
  <div class="container">
    <div class="subs">
      <ul class="subs-navs">
        <li 
          @click="subChange(item, index)" 
          :class="['sub', index === subIndex ? 'active' : '']" 
          v-for="(item, index) in subNavs" :key="item.sort"
        >{{item.title}}</li>
      </ul>
      <input 
        class="subs-search"
        type="text" 
        placeholder="搜索标签"
        v-model="searchVal"
        @keyup.enter="search"
      />
    </div>
    <subscribe-item :lists="lists" />
    <div class="root-view-bg"></div>
  </div>
</template>
<script lang="ts">
interface subNavsType {
  sort: string;
  title: string;
}

interface stateType {
  sort: string,
  subIndex: number,
  lists: any[],
  page: number,
  pageSize: number,
  isLoading: boolean,
  searchVal: string | null | undefined,
  [proeprty: string]: any
}

import subscribeItem from  '@/components/tag/subscribe-item.vue'
import tagAPI from '@/api/tag'
import scroll from '@/mixins/scroll'
import { reactive, toRefs } from 'vue';

export default {
  name: '',
  components: {subscribeItem},
  props: ['id'],
  mixins: [scroll],
  setup () {
    let subNavs: subNavsType[] = Object.freeze([
      {
        sort: 'hot',
        title: '最热'
      },
      {
        sort: 'new',
        title: '最新'
      },
    ])
    let state: stateType = reactive({
      sort: 'hot',
      subIndex: 0,
      lists: [],
      page: 1,
      pageSize: 40,
      isLoading: false,
      searchVal: ''
    })

    let reset = () => {
      state.lists = []
      state.page = 1
      state.isLoading = false
      state.hasNextPage = true
    }
    let getLists = async() => {
      if(state.isLoading) return
      state.isLoading = true
      try{
        let {s, d} = await tagAPI.subscribe(state.sort, state.page, state.pageSize);
        if(s === 1) {
          state.lists = state.lists.concat(d.tags)
          state.page++
          state.isLoading = false
        }
      }catch(e){
        console.log(e);
      }
    }

    let subChange = (item: subNavsType, index: number) => {
      state.subIndex = index;
      try{
        state.sort = subNavs.filter((item1: subNavsType) => item1.title === item.title)[0].sort;
      }catch{
        state.sort = 'hot'
      }
      reset();
      getLists();
    }

    let search = async() => {
      reset()
      if(!state.searchVal.trim().length){
        //搜索内容为空时
        getLists();
        return
      }
      try{
        let {s, d} = await tagAPI.subscribeSearch(state.sort, state.searchVal, state.page, state.pageSize);
        if(s === 1) {
          state.lists = d.tags
          state.hasNextPage = state.lists.length >= d.total
        }
      }catch(e){
        console.log(e);
      }
    }

    getLists()

    return {
      subNavs,
      ...toRefs(state),
      subChange,
      search
    }
  },
}
</script>
<style scoped lang="less">
.subs{
  .flex(@ai: center);
  padding: 1rem 0;
  &-navs{
    .flex();
  }
  .sub{
    padding: 1rem .6rem;
    margin-left: .8rem;
    font-size: 1.3rem;
    white-space: nowrap;
    color: #909090;
    cursor: pointer;
    &.active{
      color: @mainColor;
    }
  }
  &-search{
    width: 200px;
    margin-left: 1rem;
    padding: .5rem;
    font-size: 1.2rem;
    border: 1px solid hsla(0,0%,59.2%,.2);
    outline: none;
  }
}

</style>
