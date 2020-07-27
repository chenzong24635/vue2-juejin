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
import{ProxyType}from '@/types/commons'
import{navListsType,}from './types'

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
  setup(props) {
    let navListsState: ProxyType<navListsType> = reactive({
      navLists:[
        {
          id: "0",
          name: "全部",
          score: "0",
          createdAt: "2018-08-21T15:12:19.000Z",
          alias: "all",
        }
      ]
    })

    let getNavLists = async ():Promise<void> => {
      let {s, d} = await booksAPI.navList();
      if(s === 1){
        navListsState.navLists = [
          ...navListsState.navLists,
          ...d
        ];
        console.log(3,navListsState.navLists);
      }
    }
    let listsState = reactive({
      lists: [],
      pageNum: 1
    })
    let getLists = async ():Promise<void> => {
      let id:string = props.id ==='all' ? '' : props.id
      let {s, d} = await booksAPI.lists(id, listsState.pageNum++);
      if(s === 1){
        listsState.lists = listsState.lists.concat(d);
      }
      
    }

    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )
    getNavLists()
    onMounted(()=>{
      getLists()
    })

    return {
      ...toRefs(navListsState),
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
