<template>
  <div class="container">
    <main class="main">
      <comment-list :lists="comments" />
    </main>
    <aside class="aside">
      <right-side :lists="[]" title="相关推荐" />
    </aside>
  </div>
</template>
<script lang="ts">
import{objType}from '@/types/commons'
import {pinDetailType,pinListType} from '@/types/pins'


import rightSide from '@/components/pins/aside'
import scroll from '@/mixins/scroll'

import pinAPI from '@/api/pins'
import { reactive, toRefs, watch, onMounted } from 'vue'
export default {
  components: {rightSide},
  props: ['id'],
  setup(props: objType) {
    let pinDetailState: pinDetailType = reactive({
      comments: [],
      count: 0,
    })

    // 内容
    let getPinDetail = async():Promise<void> => {
      try {
        let {s ,d} =  await pinAPI.pinDetail(props.id)
        if(s === 1) {
          pinDetailState.comments = d.comments
          pinDetailState.count = d.count
        }
      } catch (e) {
        console.log(e)
      }
    }

    let pinListState: pinListType = reactive({
      pageNum: 1,
      isLoading: false,
    })
    //评论
    let getLists = async():Promise<void> => {
      if(pinDetailState.count && (pinDetailState.comments.length >=pinDetailState.count))return
      if(pinListState.isLoading)return
      try {
        pinListState.isLoading = true
        let {s ,d} = await pinAPI.pinComments(props.id, pinListState.pageNum)
        if(s === 1) {
          pinDetailState.comments = pinDetailState.comments.concat(d.comments)
          pinDetailState.count = d.count
          pinListState.pageNum++
          pinListState.isLoading = false
        }
      } catch (e) {
        console.log(e)
      }
    }
    //评论的回复
    // let getReply = async(id):Promise<void> => {
    //   try {
    //     let {s ,d} = await pinAPI.pinReply(id)
    //     console.log(s,d);
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )
    onMounted(async ():Promise<void>=>{
      await getPinDetail()
      await getLists()
    })

    return {
      ...toRefs(pinDetailState),
      ...toRefs(pinListState)
    }
  },
}
</script>
<style scoped lang="less">
.container{
  .flex(space-between);
  margin: 1rem auto 2rem;
}
.main{
  width: 640px;
  background-color: #fff;
}
.aside{
  position: sticky;
  top: 6rem;
  width: 300px;
}
</style>
