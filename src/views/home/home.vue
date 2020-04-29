<template>
  <div class="">
    <!-- home -->
    <header-sub  @getLists1="getLists1" :headerSubs="homeHeader" />
    <div class="container home-box">
      <common-list1 class="home-lists" :lists="lists" @getLists2="getLists2" :hasNextPage="hasNextPage" >
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
import homeHeader from '@/router/homeHeader'

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
  data() {
    return {
      homeHeader,
      hasNextPage: true,
      endCursor: '',
      lists: [{
        node:{
          id: "5ea232e751882573bb7911b2",
          commentsCount: 16,
          hot: false,
          hotIndex: 154.7459,
          original: true,
          originalUrl: "https://juejin.im/post/5ea04efb51882573b7538dc8",
          rankIndex: 0.16634309071639,
          screenshot: "https://user-gold-cdn.xitu.io/2020/4/24/171a996c48ee884c?w=1419&h=856&f=png&s=963660",
          summaryInfo: null,
          tags: [{id: "5597838ee4b08a686ce2319d", title: "Android"},],
          title: "【Flutter Unit 重大更新 1 】超好用的组件收藏夹上线",
          type: "post",
          user: {id: "5b42c0656fb9a04fe727eb37", role: "editor", username: "张风捷特烈"},
          lastCommentTime: "2020-04-26T09:31:53.853Z",
          likeCount: 30,
          eventInfo: null,
          viewerHasLiked: false,
          createdAt: "2020-04-24T00:29:27.374Z",
          updatedAt: "2020-04-28T02:59:29.260Z",
        }
      }],
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
    }
  },
  created() {
    // this.getLists2(this.homeApiData);
  },
  computed: {
    ...mapState([
      'isLogin',
      'homeApiData'
    ])
  },
  methods: {
    subChange(item, index) {
      this.subIndex = index;
      this.order = this.subNavs.filter(item1 => item1.title === item.title)[0].order;
      console.log(this.order);
      this.reset(1);
      this.getLists2(this.homeApiData);
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
    getLists1(params){
      //切换路由时，重置参数
      this.reset(2);
      this.getLists2(params);
      console.log(params,'切换路由');
    },
    getLists2(params){
      console.log(params,'下拉');
      // if(this.endCursor) {
        params.variables.after = this.endCursor;
      // }
      console.log(this.order);
      params.variables.order = this.order;
      console.log(params);
      homeAPI.lists(params).then(res => {
        console.log(res);
        if(this.hasNextPage && res.data){
          this.lists = this.lists.concat(res.data.articleFeed.items.edges);
          this.hasNextPage = res.data.articleFeed.items.pageInfo.hasNextPage;
          let endCursor = res.data.articleFeed.items.pageInfo.endCursor;
          this.endCursor = endCursor;
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
