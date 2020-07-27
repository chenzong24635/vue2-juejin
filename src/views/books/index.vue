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
<script lang="ts">
import{objType}from '@/types/commons'
import{booksStateType}from '@/types/books'

import copyRight from '@/components/common/copy-right'
import headerSub from '@/components/header/header-sub'
import booksList from '@/components/books/list'
import booksAside from '@/components/books/books-aside'
import booksAPI from '@/api/books'
import scroll from '@/mixins/scroll'

import {reactive, toRefs, onMounted, watch} from 'vue'

export default {
  components: {
    headerSub,
    booksList,
    booksAside,
    copyRight
  },
  props: ["id"],
  setup(props: objType) {
    let listsState: booksStateType = reactive({
      navLists: [],
      lists: [],
      pageNum: 1
    })

    let getNavLists = async ():Promise<void> => {
      let {s, d} = await booksAPI.navList();
      if(s === 1){
        listsState.navLists = [
          {
            id: "0",
            name: "全部",
            score: "0",
            createdAt: "2018-08-21T15:12:19.000Z",
            alias: "all",
          },
          ...d
        ]
      }
    }
    let getLists = async ():Promise<void> => {
      let id:string = props.id ==='all' ? '' : props.id
      let {s, d} = await booksAPI.lists(id, listsState.pageNum++);
      if(s === 1){
        listsState.lists = listsState.lists.concat(d);
      }
    console.log(listsState.navLists);        

      
    }

    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )
    onMounted(()=>{
      getNavLists()

      getLists()
    })

    return {
      ...toRefs(listsState),
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
