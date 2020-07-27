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
// import{objType}from '@/types/commons'
import {subNavsType} from '@/types/tag'
import {subStateType,listStateType} from '@/types/subscribe'

import subscribeItem from  '@/components/tag/subscribe-item.vue'
import tagAPI from '@/api/tag'
import scroll from '@/mixins/scroll'
import { reactive, toRefs, onMounted, watch, ref } from 'vue';

export default {
  name: '',
  components: {subscribeItem},
  props: ['id'],
  setup () {
    let listState: listStateType = reactive({
      lists: [],
      page: 1,
      pageSize: 40,
      isLoading: false,
    })

    let reset = ():void => {
      listState.lists = []
      listState.page = 1
      listState.isLoading = false
      listState.hasNextPage = true
    }

    let subNavs = Object.freeze([
      {
        sort: 'hot',
        title: '最热'
      },
      {
        sort: 'new',
        title: '最新'
      },
    ])
    let subNavsState:subStateType = reactive({
      subIndex: 0,
      sort: 'hot',
    })
    let subChange = (item: subNavsType, index: number) => {
      subNavsState.subIndex = index;
      try{
        subNavsState.sort = subNavs.filter((item1: subNavsType) => item1.title === item.title)[0].sort;
      }catch{
        subNavsState.sort = 'hot'
      }
      reset();
      getLists();
    }

    let getLists = async():Promise<void> => {
      if(listState.isLoading) return
      listState.isLoading = true
      try{
        let {s, d} = await tagAPI.subscribe(subNavsState.sort, listState.page, listState.pageSize);
        if(s === 1) {
          listState.lists = listState.lists.concat(d.tags)
          listState.page++
          listState.isLoading = false
        }
      }catch(e){
        console.log(e);
      }
    }

    let searchVal = ref('')
    let search = async():Promise<void> => {
      reset()
      if(!searchVal.value.trim().length){
        //搜索内容为空时
        getLists();
        return
      }
      try{
        let {s, d} = await tagAPI.subscribeSearch(subNavsState.sort, searchVal.value, listState.page, listState.pageSize);
        if(s === 1) {
          listState.lists = d.tags
          listState.hasNextPage = listState.lists.length >= d.total
        }
      }catch(e){
        console.log(e);
      }
    }

    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )

    onMounted(():void => {
      getLists();
    });

    return {
      subNavs,
      searchVal,
      ...toRefs(subNavsState),
      ...toRefs(listState),
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
