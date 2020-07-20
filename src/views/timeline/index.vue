<template>
  <div class>
    <!-- home -->
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
              @click="subChange(item, index)"
              :class="['sub', index === subIndex ? 'active' : '']"
              v-for="(item, index) in subNavs"
              :key="item.order"
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

import timelineAPI from '@/api/timeline'
import {mapState} from 'vuex'

import scroll from '@/mixins/scroll'
import {reactive, toRefs} from 'vue'
// import { useRouter } from 'vue-router'

export default {
  components: {
    headerSub,
    homeRight,
  },
  props: ['id'],
  mixins: [scroll],
  setup(props) {
    console.log(props);
    let state = reactive({
      isLoading: false,
      hasNextPage: true,
      endCursor: '',
      lists: [],
      order: 'POPULAR',
      subIndex: 0,
      apiParmas: {},
    })

    let subNavs = [
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
    ]

    
    // 方法
    let getApiData = () => {
      let params = null
      try{
        params = homeHeaderParams.filter(item => {
          return item.name === props.id
        })[0].apiData
      }catch(e){
        params = homeHeaderParams[0].apiData
      }
      state.apiParmas = params
    }

    let subChange = (item, index) => {
      state.subIndex = index;
      state.order = state.subNavs.filter(item1 => item1.title === item.title)[0].order;
      reset(1)
      getLists()
    }
    let reset = (type) => {
      state.lists = [];
      state.hasNextPage= true;
      state.endCursor= '';
      if(type === 2) {
        state.subIndex = 0;
        state.order = 'POPULAR'
      }
    }

    let getLists = () => {
      state.apiParmas.variables.after = state.endCursor;
      state.apiParmas.variables.order = state.order;
      if(state.isLoading || !state.hasNextPage) return
      state.isLoading = true
      timelineAPI.lists(state.apiParmas)
        .then(res => {
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

    (() =>{
      getApiData()
      getLists()
    })


    //路由
    // let {ctx} = getCurrentInstance()
    // const currentRoute = ctx.$router.currentRoute.value
    // console.log(currentRoute);
    // // // const router = useRouter()
    // // // console.log(useRouter,router);
    // watch(
    //   currentRoute,
    //   (to, from) => {
    //     console.log(1111);
    //     if(to.name === from.name && to.params.id!==from.params.id){
    //       reset(2)
    //       getApiData()
    //       getLists()
    //     }
    //   }
    // )

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
  watch: {
    '$route': function(to ,from){
      if(to.name === from.name && to.params.id!==from.params.id){
        this.reset(2)
        this.getApiData()
        this.getLists()
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin',
    ]),
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
  // .sub+
}
.home-box {
  .flex();
  background-color: @bgColor;
}
.home-lists {
  width: 700px;
}
</style>
