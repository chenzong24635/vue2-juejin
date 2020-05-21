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
      <pin-list :lists="lists" :type="routeName" />
    </div>
    <div class="right-side">
      <right-side :lists="hotLists" />
      <router-link  class="guide" to="">
        <svg-icon name="guide-icon.6c1b9a0" :size="30"></svg-icon>
        <span>如何玩转沸点</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import leftRouteParams from '@/components/pins/leftRouteParams.js'
import headerSub from '@/components/header/header-sub'
import rightSide from '@/components/pins/aside'
import pinList from '@/components/pins/list'

import pinsAPI from '@/api/pins'
import scroll from '@/mixins/scroll'
import {mapState} from 'vuex'

export default {
  components: {
    headerSub,
    rightSide,
    pinList
  },
  data() {
    return {
      routeName: '',
      apiParmas: null,
      leftRouteParams,
      hasNextPage: true,
      endCursor: '',
      lists: [],
      hotLists: [],
    }
  },
  props: ['id'],
  mixins: [scroll],
  computed: {
    ...mapState([
      'isLogin',
    ])
  },
  watch:{
    "$route":function(to,from){
      if (to.name === from.name && to.params.id !== from.params.id) {
        console.log(to.params.id , from.params.id);
        this.reset()
        this.getApiParmas()
        this.getLists()
      }
    }
  },
  created() {
    this.reset()
    this.getApiParmas()
    this.getHotLists()
    this.getLists()
    console.log(this.apiParmas)
  },
  methods: {
    reset() {
      this.lists = [];
      this.hasNextPage= true;
      this.endCursor= '';
    },
    getApiParmas() {
      try{
        let route = this.leftRouteParams.filter(item => {
          return item.name === this.id
        })[0]
        //推荐 返回的数据格式不同于其他，传给list-detail
        this.isRecommended = route.name === 'recommended' ? true : false
        this.routeName =  route.name

        if(route.apiData) { // 推荐 热门 关注
          
          // this.type = 1 
          this.apiParmas =  route.apiData
        }else{ // 其他
          // this.type = 2
          this.apiParmas =  route.name
        }
        
      }catch(e){
        this.apiParmas = this.leftRouteParams[0].apiData
      }
      console.log('this.apiParmas',this.apiParmas);
    },
    async getLists() {
      this.apiParmas.variables.after = this.endCursor;
      switch(this.routeName) {
        case 'recommended':
          this.getListsRecommended()
          break
        case 'hot':
          this.getListsHot()
          break
        case 'following':
          this.getListsFollowing()
          break
        default:
          this.getListsRecommended()
      }
    },
    async getListsRecommended() { // 推荐
      let apiParmas = this.apiParmas;
      let { data } = await pinsAPI.lists1(apiParmas);
      console.log(data);
      let res = data.recommendedActivityFeed.items;
      if(this.hasNextPage && res.edges){
        this.lists = this.lists.concat(res.edges);
        this.hasNextPage = res.pageInfo.hasNextPage;
        this.endCursor = res.pageInfo.endCursor;
      }
    },
    async getListsHot() { // 热门
      let apiParmas = this.apiParmas;
      let { data } = await pinsAPI.lists1(apiParmas);
      console.log(data);
      let res = data.popularPinList.items;
      if(this.hasNextPage && res.edges){
        this.lists = this.lists.concat(res.edges);
        this.hasNextPage = res.pageInfo.hasNextPage;
        this.endCursor = res.pageInfo.endCursor;
      }
    },
    async getListsFollowing() { // 关注
      if(!this.isLogin){
        return
      }
      let apiParmas = this.apiParmas
      apiParmas.variables.since = new Date().toISOString();
      let { data } = await pinsAPI.lists1(apiParmas);
      console.log(data);
      let res = data.followingActivityFeed.items;
      if(this.hasNextPage && res.edges){
        this.lists = this.lists.concat(res.edges);
        this.hasNextPage = res.pageInfo.hasNextPage;
        this.endCursor = res.pageInfo.endCursor;
      }
    },
    async getHotLists() {
      let {s, d} = await pinsAPI.hotLists()
      if (s === 1) {
        this.hotLists = d.list
      }
    }
  }
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
.right-side{
  position: sticky;
  top: 0;
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
