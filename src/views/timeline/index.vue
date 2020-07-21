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
<script >

import headerSub from '@/components/header/header-sub.vue'
import homeRight from '@/components/timeline/right.vue'
import homeHeaderParams from '@/components/timeline/homeHeaderParams.js'

import timelineAPI from '@/api/timeline.js'
import scroll from '@/mixins/scroll.js'
import {mapState} from 'vuex'
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
      state.order = subNavs.filter(item1 => item1.title === item.title)[0].order;
      reset()
      getLists()
    }
    let reset = () => {
      state.lists = [];
      state.hasNextPage= true;
      state.endCursor= '';
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

    // computed()
    // const count = computed(
    //   [
    //     ()=>state.subIndex,
    //     ()=>state.order,
    //   ],
    //   (
    //     [subIndex, order],
    //     [presubIndex, preorder],
    //   )=> {
    //     console.log([subIndex, order],
    //     [presubIndex, preorder],);
    //   }
    // )
    // console.log(count);    

    (() =>{
      getApiData()
      getLists()
    })()

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
}
.home-box {
  .flex();
  background-color: @bgColor;
}
.home-lists {
  width: 700px;
}
</style>
