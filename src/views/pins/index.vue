<template>
  <div class="container">
    <div class="left-nav">
      <header-sub
        :headerSubs="leftRouteParams"
        mainRoute="pins"
        subRoute="name"
        routeTitle="title"
      />
    </div>
    <div class="middle-box">
      <activity-skeleton v-if="isLoading && hasNextPage && routeName!=='following'" />
      <pin-list :lists="lists" :type="routeName" />
    </div>
    <div class="right-side">
      <right-side :lists="hotLists" title="推荐沸点" />
      <router-link  class="guide" to="">
        <svg-icon name="guide-icon.6c1b9a0" :size="30"></svg-icon>
        <span>如何玩转沸点</span>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
interface objType{
  [propertyName: string]: any
}

interface propsType{
  id: string | number
}

interface leftRouteParamsType {
  name: string,
  title: string,
  apiData?: objType
}

interface stateType{
  routeName: string,
  apiParmas: objType | string,
  hasNextPage: boolean,
  isLoading: boolean,
  endCursor: string,
  lists: any[],
  hotLists: any[],
  [propertyName: string]: any
}


import leftRouteParams from '@/components/pins/leftRouteParams'
import headerSub from '@/components/header/header-sub'
import rightSide from '@/components/pins/aside'
import pinList from '@/components/pins/list'

import pinsAPI from '@/api/pins'
import scroll from '@/mixins/scroll'
import { reactive, toRefs } from 'vue'

export default {
  components: {
    headerSub,
    rightSide,
    pinList
  },
  props: ['id'],
  mixins: [scroll],
  setup(props: propsType){
    let state: stateType = reactive({
      routeName: '',
      apiParmas: null,
      hasNextPage: true,
      isLoading: false,
      endCursor: '',
      lists: [],
      hotLists: [],
    })

    // methods 
    let reset = (): void => {
      state.lists = [];
      state.hasNextPage= true;
      state.isLoading = false;
      state.endCursor= '';
    }

    let getApiParmas = (): void => {
      try{
        let route: leftRouteParamsType = leftRouteParams.filter((item: leftRouteParamsType) => {
          return item.name === props.id
        })[0]
        //推荐 返回的数据格式不同于其他，传给list-detail
        state.isRecommended = route.name === 'recommended' ? true : false
        state.routeName =  route.name

        if(route.apiData) { // 推荐 热门 关注
          // state.type = 1 
          state.apiParmas =  route.apiData
        }else{ // 其他
          // state.type = 2
          state.apiParmas =  route.name
        }
      }catch(e){
        state.apiParmas = leftRouteParams[0].apiData
      }
    }

    let getLists = async(): void => {
      if(state.isLoading) return
      state.isLoading = true
      switch(state.routeName) {
        case 'recommended':
          state.apiParmas.variables.after = state.endCursor;
          getListsRecommended()
          break
        case 'hot':
          state.apiParmas.variables.after = state.endCursor;
          getListsHot()
          break
        case 'following':
          state.apiParmas.variables.after = state.endCursor;
          getListsFollowing()
          break
        default:
          getLists2()
      }
    }

    let getListsRecommended = async (): void => { // 推荐
      let apiParmas: objType | string = state.apiParmas;
      try {
        let { data } = await pinsAPI.lists1(apiParmas);
        let res = data.recommendedActivityFeed.items;
        if(state.hasNextPage && res.edges){
          let lists = res.edges.map(item=>item.node)
          state.lists = state.lists.concat(lists);
          state.hasNextPage = res.pageInfo.hasNextPage;
          state.endCursor = res.pageInfo.endCursor;
        }
        state.isLoading = false
      } catch (e) {
        state.isLoading = false
      }
    }
    let getListsHot = async (): void => { // 热门
      let apiParmas: objType | string = state.apiParmas;
      try{
        let { data } = await pinsAPI.lists1(apiParmas);
        let res = data.popularPinList.items;
        if(state.hasNextPage && res.edges){
          let lists = res.edges.map(item=>item.node)
          state.lists = state.lists.concat(lists);
          state.hasNextPage = res.pageInfo.hasNextPage;
          state.endCursor = res.pageInfo.endCursor;
        }
        state.isLoading = false
      } catch (e) {
        state.isLoading = false
      }
    }
    let getListsFollowing = async (): void => { // 关注
      if(!state.isLogin)return
      let apiParmas: objType | string = state.apiParmas
      try{
        apiParmas.variables.since = new Date().toISOString();
        let { data } = await pinsAPI.lists1(apiParmas);
        let res = data.followingActivityFeed.items;
        if(state.hasNextPage && res.edges){
          state.lists = state.lists.concat(res.edges);
          state.hasNextPage = res.pageInfo.hasNextPage;
          state.endCursor = res.pageInfo.endCursor;
        }
        state.isLoading = false
      } catch (e) {
        state.isLoading = false
      }
    }
    let getLists2 = async (): void => { // 开源推荐等
      let apiParmas: objType | string = state.apiParmas;
      try{
        let {s, d} = await pinsAPI.lists2(apiParmas)
        if (s === 1) {
          if(d.total <= state.lists.length){
            state.lists = state.lists.concat(d.list)
          }else{
            state.lists = d.list
          }
        }
        state.isLoading = false
      } catch (e) {
        state.isLoading = false
      }
    }
    let getHotLists = async ():void => { // 推荐沸点
      try {
        let {s, d} = await pinsAPI.hotLists()
        if (s === 1) {
          state.hotLists = d.list
        }
      } catch (e) {
        console.log(e);
      }
    }

    (()=>{
      reset()
      getApiParmas()
      getHotLists()
      getLists()
    })()

    return {
      leftRouteParams,
      ...toRefs(state),
      reset,
      getApiParmas,
      getLists,
    }
  },
}
</script>
<style scoped lang="less">
.container {
  .flex(@jc: space-between);
  margin-top: 1rem;
  background-color: inherit;
  /deep/ #header-sub {
    position: sticky;
    top: 0;
    left: 0;
    border-radius: .2rem;
    background-color: #fff;
    width: 9.33rem;
    max-width: 9.33rem;
    padding: 1rem 0;
    transition: all .2s linear;
    .navs{
      .flex(@dir: column);
      margin: auto;
      .nav{
        width: 100%;
        margin: 0.4rem 0;
        &:nth-child(3){
          border-bottom: 1px solid @bgColor;
        }
        &>a{
          padding: 0.8rem 1rem;
          border-radius: .25rem;
          &.router-link-active{
            background-color: @mainColor;
            color: #fff
          }
        }
      }
    }
  }
}
.left-nav{
  position: sticky;
  top: 6rem;
}
.right-side{
  position: sticky;
  top: 6rem;
  right: 0;
  width: 248px;
  .guide{
    .flex(@ai:center);
    padding: 1.5rem;
    margin-top: 10px;
    background-color: #fff;
    span{
      margin-left: 10px;
      font-size: 14px;
      color: #000;
    }
  }
}
.middle-box{
  flex: 1;
  margin: 0 1rem;
}
</style>
