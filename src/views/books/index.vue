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
      <books-aside />
    </div>
    <copy-right />
  </div>
</template>
<script>
import copyRight from '@/components/common/copy-right'
import headerSub from '@/components/header/header-sub'
import booksList from '@/components/books/list'
import booksAside from '@/components/books/books-aside'
import booksAPI from '@/api/books'
import scroll from '@/mixins/scroll'

import {reactive, toRefs} from 'vue'

export default {
  name: '',
  components: {
    headerSub,
    booksList,
    booksAside,
    copyRight
  },
  props: ["id"],
  mixins: [scroll],
  setup(props) {
    let state = reactive({
      navLists: [],
      lists: [],
      pageNum: 1
    })

    // let reset = () => {
    //   state.pageNum = 1;
    //   state.lists = [];
    // }
    let getNavLists = async () => {
      let {s, d} = await booksAPI.navList();
      if(s === 1){
        state.navLists = [
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
    }
    let getLists = async () => {
      let id = props.id ==='all' ? '' : props.id
      let {s, d} = await booksAPI.lists(id, state.pageNum++);
      if(s === 1){
        state.lists = state.lists.concat(d);
      }
      
    } 
    (() =>{
      getNavLists()
      getLists(props.id)
    })()

    return {
      ...toRefs(state),
      getLists
    }
  },
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
