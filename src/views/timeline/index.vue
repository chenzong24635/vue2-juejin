<template>
  <div class>
    <header-sub
      :headerSubs="homeHeaderParams"
      mainRoute="timeline"
      subRoute="name"
      routeTitle="title"
    />
    <div class="container home-box">
      <common-list1 class="home-lists" :lists="lists" :hasNextPage="hasNextPage">
        <nav class>
          <ul class="subs">
            <li
              v-for="(item, index) in subNavs"
              @click="subChange(item, index)"
              :class="['sub', index === subIndex ? 'active' : '']"
              :key="item.order"
            >{{item.title}}</li>
          </ul>
        </nav>
        <activity-skeleton v-show="isLoading && hasNextPage" />
      </common-list1>
      <home-right />
    </div>
  </div>
</template>
<script lang="ts">
import{objType}from '@/types/commons'
import {subNavsType,stateType} from '@/types/timeline'

import headerSub from '@/components/header/header-sub'
import homeRight from '@/components/timeline/right'
import homeHeaderParams from '@/components/timeline/homeHeaderParams'

import timelineAPI from '@/api/timeline'
import scroll from '@/mixins/scroll'

import {reactive, toRefs, watch, onMounted} from 'vue'
// import { useRouter } from 'vue-router'

export default {
  components: {
    headerSub,
    homeRight,
  },
  props: ['id'],
  setup(props:objType) {
    let state: stateType = reactive({
      isLoading: false,
      hasNextPage: true,
      endCursor: '',
      lists: [],
      order: 'POPULAR',
      subIndex: 0,
      apiParmas: null,
    })

    let getApiData = ():void => {
      let params = null
      try{
        params = homeHeaderParams.filter((item: objType) => {
          return item.name === props.id
        })[0].apiData
      }catch(e){
        params = homeHeaderParams[0].apiData
      }
      state.apiParmas = params
    }

    let subNavs = Object.freeze([
      {
        title: "热门",
        order: "POPULAR"
      },
      {
        title: "最新",
        order: "NEWEST"
      },
      {
        title: "热榜",
        order: "THREE_DAYS_HOTTEST"
      }
    ])
    let subChange = (item: subNavsType, index: number):void => {
      state.subIndex = index;
      state.order = subNavs.filter((item1: subNavsType) => item1.title === item.title)[0].order;
      reset()
      getLists()
    }
    let reset = (): void => {
      state.lists = [];
      state.hasNextPage = true;
      state.endCursor = '';
    }

    let getLists = (): void => {
      state.apiParmas.variables.after = state.endCursor;
      state.apiParmas.variables.order = state.order;
      if(state.isLoading || !state.hasNextPage) return
      state.isLoading = true
      timelineAPI.lists(state.apiParmas)
        .then((res: objType) => {
          if(state.hasNextPage && res.data){
            let result = res.data.articleFeed.items;
            state.lists = state.lists.concat(result.edges);
            state.hasNextPage = result.pageInfo.hasNextPage;
            state.endCursor = result.pageInfo.endCursor;
          }
          state.isLoading = false
        })
        .catch((e) => {
          state.isLoading = false
          console.log(e);
        })
    }

    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )
    onMounted(()=>{
      getApiData()
      getLists()
    })

    return {
      homeHeaderParams,
      subNavs,
      ...toRefs(state),
      subChange,
      reset,
      getApiData,
      getLists,
    }
  },
}
</script>
<style scoped lang="less">
.container {
  margin-top: 6rem;
}
.subs {
  .flex();
  .line();
  font-size: 1.16rem;
  padding: 1rem 2rem;
  background-color: #fff;
  .sub {
    cursor: pointer;
    color: #909090;
    .delimiter("|", hsla(0, 0%, 59.2%, 0.2));
    padding: 0 1rem;
    &.active {
      color: @activeColor;
    }
  }
}
.home-box {
  .flex();
  background-color: @bgColor;
}
.home-lists {
  width: 700px;
}
</style>
