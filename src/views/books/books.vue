<template>
  <div class="">
    <header-sub 
      :headerSubs="navLists" 
      mainRoute="books"
      subRoute="alias"
      routeTitle="name"
    />
    <div class="container books">
      <books-list :lists="lists" />
      <books-right />
    </div>
    <copy-right />
  </div>
</template>
<script>
import copyRight from '@/components/common/copy-right'
import headerSub from '@/components/events/header-sub'
import booksList from '@/components/books/books-list'
import booksRight from '@/components/books/books-right'
import booksAPI from '@/api/books'
import scroll from '@/mixins/scroll'
export default {
  name: '',
  components: {
    headerSub,
    booksList,
    booksRight,
    copyRight
  },
  props: ["id"],
  mixins: [scroll],
  data () {
    return {
      navLists: [],
      lists: [],
      pageNum: 1
    }
  },
  watch: {
    '$route': function(to ,from){
      console.log(to ,from);
      if(to.name === from.name && to.params.id!==from.params.id){
        console.log(to.params.id,this.id);
        // this.id = to.params.id
        this.reset()
        this.getLists()
      }
    }
  },
  created () {
    this.getNavLists();
    this.getLists(this.id);
  },
  methods: {
    reset() {
      this.pageNum = 1;
      this.lists = [];
    },
    async getNavLists() {
      let {s, d} = await booksAPI.navList();
      if(s === 1){
        this.navLists = [
          {
            id: "0",
            name: "全部",
            score: "0",
            createdAt: "2018-08-21T15:11:46.000Z",
            alias: "all",
          },
          ...d
        ];
      }
    },
    async getLists() {
      let id = this.id ==='all' ? '' : this.id
      let {s, d} = await booksAPI.lists(id, this.pageNum++);
      if(s === 1){
        this.lists = this.lists.concat(d);
      }
      console.log(s,d);
      /* console.log(type);
      
      if(type){
        this.reset();
        this.alias = type;
      }else{
        this.alias = ""
      }
      let {s, d} = await booksAPI.lists(this.alias, ++this.pageNum);
      if(s === 1){
        this.lists = this.lists.concat(d);
      }*/
    } 
  }
}
</script>
<style scoped lang="less">
.container{
  background-color: inherit;
}
.books{
  margin-top: 6rem;
  .flex();
}
</style>
