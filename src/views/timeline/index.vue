<template>
  <div class="">
    <!-- home -->
    <header-sub
      :headerSubs="homeHeaderParams"
      mainRoute="timeline"
      subRoute="name"
      routeTitle="title"
    />
    <div class="container home-box">
      <common-list1 
        class="home-lists" 
        :lists="lists" 
        :hasNextPage="hasNextPage"
      >
        <nav class="">
          <ul class="subs">
            <li 
              @click="subChange(item, index)" 
              :class="['sub', index === subIndex ? 'active' : '']" 
              v-for="(item, index) in subNavs" :key="item.order"
            >{{item.title}}</li>
          </ul>
        </nav>
        <activity-skeleton v-if="isLoading && hasNextPage" />
      </common-list1>
      <home-right />
    </div>
  </div>
</template>
<script>

import headerSub from '@/components/header/header-sub'
import homeRight from '@/components/timeline/right'
import homeHeaderParams from '@/components/timeline/homeHeaderParams'
import scroll from '@/mixins/scroll'

import timelineAPI from '@/api/timeline'
import {mapState} from 'vuex'

/**
 *@param {Array} sorts 首页文章列表的分类
*/

export default {
  components: {
    headerSub,
    homeRight,
  },
  props: ['id'],
  mixins: [scroll],
  data() {
    return {
      homeHeaderParams,
      isLoading: false,
      hasNextPage: true,
      endCursor: '',
      lists: [],
      order: 'POPULAR',
      subIndex: 0,
      subNavs: Object.freeze([
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
      ]),
      apiParmas: {},
    }
  },
    watch: {
    '$route': function(to ,from){
      if(to.name === from.name && to.params.id!==from.params.id){
        this.reset(2)
        this.getApiData()
        this.getLists()
      }
    }
  },
  created() {
    this.getApiData()
    this.getLists()
  },
  computed: {
    ...mapState([
      'isLogin',
    ]),
  },
  methods: {
    getApiData() {
      let params = null
      try{
        params = homeHeaderParams.filter(item => {
          return item.name === this.id
        })[0].apiData
      }catch(e){
        params = homeHeaderParams[0].apiData
      }
      this.apiParmas = params
    },
    subChange(item, index) {
      this.subIndex = index;
      this.order = this.subNavs.filter(item1 => item1.title === item.title)[0].order;
      this.reset(1)
      this.getLists()
    },
    reset(type) {
      this.lists = [];
      this.hasNextPage= true;
      this.endCursor= '';
      if(type === 2) {
        this.subIndex = 0;
        this.order = 'POPULAR'
      }
    },
    getLists(){
      this.apiParmas.variables.after = this.endCursor;
      this.apiParmas.variables.order = this.order;
      if(this.isLoading || !this.hasNextPage) return
      this.isLoading = true
      timelineAPI.lists(this.apiParmas)
        .then(res => {
          if(this.hasNextPage && res.data){
            let result = res.data.articleFeed.items;
            this.lists = this.lists.concat(result.edges);
            this.hasNextPage = result.pageInfo.hasNextPage;
            this.endCursor = result.pageInfo.endCursor;
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          console.log(e);
        })
    },
  }
}
</script>
<style scoped lang="less">
.container{
  margin-top: 6rem;
}
.subs{
  .flex();
  .line();
  font-size: 1.16rem;
  padding: 1rem 2rem;
  background-color: #fff;
  .sub{
    cursor: pointer;
    color: #909090;
    .delimiter('|', hsla(0,0%,59.2%,.2));
    padding: 0 1rem;
    &.active{
      color: @activeColor;
    }
  }
  // .sub+
}
.home-box{
  .flex();
  background-color: @bgColor;
}
.home-lists{
  width: 700px;
}
</style>
