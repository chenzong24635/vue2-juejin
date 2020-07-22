<template>
  <div class="container">
    <!-- search -->
    <nav class="subs">
      <ul class="subs-box">
        <li 
          v-for="(item, index) in subNavs" :key="item.order"
          @click="subChange(item, index)" 
          :class="['sub', item.type === type ? 'active' : '']" 
        >{{item.title}}</li>
      </ul>
    </nav>
    <div class="container home-box">
      <tag-list
        v-if="type==='tag'"
        class="home-lists" 
        :lists="lists" 
        :hasNextPage="hasNextPage"
      >
      </tag-list>
      <user-list
        v-else-if="type==='user'"
        class="home-lists" 
        :lists="lists" 
        :hasNextPage="hasNextPage"
      >
      </user-list>
      <common-list2 
        v-else
        class="home-lists" 
        :lists="lists" 
        :hasNextPage="hasNextPage"
      >
      </common-list2>
        <activity-skeleton width="700px" v-show="isLoading && hasNextPage" />

      <div class="nodata" v-if="!lists.length">
        列表为空
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import tagList from '@/components/search/tag-list'
import userList from '@/components/search/user-list'
import scroll from '@/mixins/scroll'

import timelineAPI from '@/api/timeline'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';

export default {
  components: {
    tagList,
    userList
  },
  mixins: [scroll],
  props: ['query','type'],
  setup(props) {
    let subNavs = Object.freeze([
      {
        title: "综合",
        type: "all"
      },
      {
        title: "文章",
        type: "article"
      },
      {
        title: "标签",
        type: "tag"
      },
      {
        title: "用户",
        type: "user"
      },
    ])
    let state = reactive({
      isLoading: false,
      hasNextPage: true,
      endCursor: '',
      lists: [],
      apiParmas: {
        operationName: "",
        query: "",
        variables: {
          type: "ALL", 
          query: "",
          after: "",//上一次接口数据的endCursor
          period: "ALL",
          first: 20,
        },
        extensions: {
          query: {
            id: "a53db5867466eddc50d16a38cfeb0890"
          }
        }
      },
    })

    let router = useRouter()
    let subChange = (item) => {
      router.replace({ name: 'search', params: { query: props.query, type: item.type}})
    }
    let getLists = () => {
      state.apiParmas.variables.after = state.endCursor;
      state.apiParmas.variables.type = props.type.toUpperCase();
      state.apiParmas.variables.query = props.query;
      if(state.isLoading || !state.hasNextPage) return
      state.isLoading = true
      timelineAPI.lists(state.apiParmas)
        .then(res => {
          if(state.hasNextPage && res.data){
            let result = res.data.search;
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

    getLists()

    return {
      subNavs,
      ...toRefs(state),
      subChange,
      getLists,
    }
  },
}
</script>
<style scoped lang="less">
.nodata{
  flex: 1;
  padding: 30px;
  margin: 0;
  text-align: center;
  background-color: #fff;
}
.nodata,.home-lists{
  width: 700px;
}
.container{
  margin-top: 6rem;
  margin-bottom: 3rem;
}
.subs{
  position: fixed;
  left: 0;
  top: 5rem;
  width: 100%;
  z-index: 100;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  transform: translateZ(0);
  background-color: #fff;
  font-size: 1.16rem;
  padding: 1rem 2rem;
  background-color: #fff;
  &-box{
    .flex();
    max-width: 960px;
    margin: 0 auto;
  }
  .sub{
    cursor: pointer;
    color: #909090;
    padding: 0 1rem;
    &.active{
      color: @activeColor;
    }
  }
  // .sub+
}
.home-box{
  // .flex();
  background-color: @bgColor;
}

</style>
