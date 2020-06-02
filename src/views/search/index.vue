<template>
  <div class="container">
    <!-- search -->
    <nav class="subs">
      <ul class="subs-box">
        <li 
          @click="subChange(item, index)" 
          :class="['sub', index === subIndex ? 'active' : '']" 
          v-for="(item, index) in subNavs" :key="item.order"
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
    </div>
  </div>
</template>
<script>
import tagList from '@/components/search/tag-list'
import userList from '@/components/search/user-list'
import scroll from '@/mixins/scroll'

import timelineAPI from '@/api/timeline'
import {mapState} from 'vuex'

export default {
  components: {
    tagList,
    userList
  },
  mixins: [scroll],
  data() {
    return {
      isLoading: false,
      hasNextPage: true,
      endCursor: '',
      lists: [],
      subIndex: 0,
      subNavs: [
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
      ],
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
    }
  },
  props: ['query','type'],
  computed: {
    ...mapState([
      'isLogin',
    ]),
  },
  watch: {
    '$route': function(to ,from){
      console.log(to,from);
      if(to.name === from.name && to.fullPath!==from.fullPath){
        console.log('cahnge');
        this.reset()
        this.getLists()
      }
    }
  },
  mounted() {
    console.log(this.query,this.type);
    this.getLists()
  },
  methods: {
    subChange(item, index) {
      this.subIndex = index;
      // this.typeNew = item.type;
      console.log(this.typeNew, item.type);
      console.log(item,index,{ query: this.query, type: item.type});
      this.$router.replace({ name: 'search', params: { query: this.query, type: item.type}})
      this.reset()
      // this.getLists()
    },
    reset() {
      this.lists = [];
      this.hasNextPage= true;
      this.endCursor= '';
    },
    getLists(){
      this.apiParmas.variables.after = this.endCursor;
      this.apiParmas.variables.type = this.type.toUpperCase();
      this.apiParmas.variables.query = this.query;
      console.table(this.apiParmas);
      // return
      if(this.isLoading || !this.hasNextPage) return
      this.isLoading = true
      timelineAPI.lists(this.apiParmas)
        .then(res => {
          if(this.hasNextPage && res.data){
            let result = res.data.search;
            this.lists = this.lists.concat(result.edges);
            this.hasNextPage = result.pageInfo.hasNextPage;
            this.endCursor = result.pageInfo.endCursor;
          }
          console.log(this.lists);
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
  .flex();
  background-color: @bgColor;
}
.home-lists{
  width: 700px;
}
</style>
