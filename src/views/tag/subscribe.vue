<template>
<!-- 所有标签 -->
  <div class="container">
    <div class="subs">
      <ul class="subs-navs">
        <li 
          @click="subChange(item, index)" 
          :class="['sub', index === subIndex ? 'active' : '']" 
          v-for="(item, index) in subNavs" :key="item.sort"
        >{{item.title}}</li>
      </ul>
      <input 
        class="subs-search"
        type="text" 
        placeholder="搜索标签"
        v-model="searchVal"
        @keyup.enter="search"
      />
    </div>
    <subscribe-item :lists="lists" />
    <div class="root-view-bg"></div>
  </div>
</template>
<script>
import subscribeItem from  '@/components/tag/subscribe-item.vue'
import tagAPI from '@/api/tag'
import scroll from '@/mixins/scroll'

export default {
  name: '',
  components: {subscribeItem},
  props: ['id'],
  mixins: [scroll],
  data () {
    return {
      subNavs: Object.freeze([
        {
          sort: 'hot',
          title: '最热'
        },
        {
          sort: 'new',
          title: '最新'
        },
      ]),
      sort: 'hot',
      subIndex: 0,
      lists: [],
      page: 1,
      pageSize: 40,
      isLoading: false,
      searchVal: '4'
    }
  },
  created () {
    this.getLists();
  },
  methods: {
    subChange(item, index) {
      this.subIndex = index;
      try{
        this.sort = this.subNavs.filter(item1 => item1.title === item.title)[0].sort;
      }catch{
        this.sort = 'hot'
      }
      this.reset();
      this.getLists();
    },
    async search() {
      this.reset()
      console.log(this.searchVal.trim().length);
      if(!this.searchVal.trim().length){
        //搜索内容为空时
        this.getLists();
        return
      }
      try{
        let {s, d} = await tagAPI.subscribeSearch(this.sort, this.searchVal, this.page, this.pageSize);
        if(s === 1) {
          this.lists = d.tags
          this.hasNextPage = this.lists.length >= d.total
        }
      }catch(e){
        console.log(e);
      }
    },
    async getLists() {
      if(this.isLoading) return
      this.isLoading = true
      try{
        let {s, d} = await tagAPI.subscribe(this.sort, this.page, this.pageSize);
        if(s === 1) {
          this.lists = this.lists.concat(d.tags)
          this.page++
          this.isLoading = false
        }
      }catch(e){
        console.log(e);
      }
    },
    reset() {
      this.lists = []
      this.page = 1
      this.isLoading = false
      this.hasNextPage = true
    }
  }
}
</script>
<style scoped lang="less">
.subs{
  .flex(@ai: center);
  padding: 1rem 0;
  &-navs{
    .flex();
  }
  .sub{
    padding: 1rem .6rem;
    margin-left: .8rem;
    font-size: 1.3rem;
    white-space: nowrap;
    color: #909090;
    cursor: pointer;
    &.active{
      color: @mainColor;
    }
  }
  &-search{
    width: 200px;
    margin-left: 1rem;
    padding: .5rem;
    font-size: 1.2rem;
    border: 1px solid hsla(0,0%,59.2%,.2);
    outline: none;
  }
}

</style>
