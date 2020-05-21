<template>
  <div class="">
    <!-- home -->
    <header-sub
      :headerSubs="homeHeaderParams"
      mainRoute="home"
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
      </common-list1>
      <home-right-content />
    </div>
  </div>
</template>
<script>

import headerSub from '@/components/header/header-sub'
import homeRightContent from '@/components/home/home-right/index'
import commonList1 from '@/components/common/common-list1'
import homeHeaderParams from '@/components/home/homeHeaderParams'
import scroll from '@/mixins/scroll'

import homeAPI from '@/api/home'
import {mapState} from 'vuex'

/**
 *@param {Array} sorts 首页文章列表的分类
*/

export default {
  components: {
    headerSub,
    homeRightContent,
    commonList1
  },
  props: ['id'],
  mixins: [scroll],
  data() {
    return {
      homeHeaderParams,
      hasNextPage: true,
      endCursor: '',
      lists: [],
      order: 'POPULAR',
      subIndex: 0,
      subNavs: [
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
      ],
      apiParmas: {},
    }
  },
    watch: {
    '$route': function(to ,from){
      console.log(to ,from);
      if(to.name === from.name && to.params.id!==from.params.id){
        this.reset(2)
        this.getApiData()
        this.getLists()
      }
    }
  },
  created() {
    console.log(this.id);
    this.getApiData()
    this.getLists()
  },
  computed: {
    ...mapState([
      'isLogin',
    ])
  },
  methods: {
    getApiData() {
      try{
        this.apiParmas = homeHeaderParams.filter(item => {
          return item.name === this.id
        })[0].apiData
      }catch(e){
        this.apiParmas = homeHeaderParams[0].apiData
      }
      console.log('this.apiParmas',this.apiParmas);
    },
    subChange(item, index) {
      this.subIndex = index;
      this.order = this.subNavs.filter(item1 => item1.title === item.title)[0].order;
      console.log(this.order);
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
      console.log(this.apiParmas,'下拉');
      // if(this.endCursor) {
        this.apiParmas.variables.after = this.endCursor;
      // }
      this.apiParmas.variables.order = this.order;
      homeAPI.lists(this.apiParmas).then(res => {
        if(this.hasNextPage && res.data){
          let result = res.data.articleFeed.items;
          this.lists = this.lists.concat(result.edges);
          this.hasNextPage = result.pageInfo.hasNextPage;
          this.endCursor = result.pageInfo.endCursor;
        }
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
