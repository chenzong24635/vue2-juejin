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
<script>
import rightSide from '@/components/pins/aside'
import scroll from '@/mixins/scroll'

import pinAPI from '@/api/pins.js'
import { reactive, toRefs } from 'vue'
export default {
  components: {rightSide},
  props: ['id'],
  mixins: [scroll],
  setup(props) {
    let state = reactive({
      comments: [],
      count: 0,
      pageNum: 1,
      isLoading: false,
    })

    // 内容
    let getPinDetail = async() => {
      try {
        let res = await pinAPI.pinDetail(props.id)
        console.log(res);
        // let {s ,d} = await pinAPI.pinActions
        // if(s === 1) {
        //   state.comments = d.comments
        //   state.count = d.count
        // }
      } catch (e) {
        console.log(e)
      }
    }
    //评论
    let getLists = async() => {
      if(state.count && (state.comments >=state.count))return
      if(state.isLoading)return
      try {
        state.isLoading = true
        let {s ,d} = await pinAPI.pinComments(props.id, state.pageNum)
        if(s === 1) {
          state.comments = state.comments.concat(d.comments)
          state.count = d.count
          state.pageNum++
          state.isLoading = false
        }
      } catch (e) {
        console.log(e)
      }
    }
    //评论的回复
    let getReply = async(id) => {
      try {
        let {s ,d} = await pinAPI.pinReply(id)
        console.log(s,d);
      } catch (e) {
        console.log(e)
      }
    }
    (async ()=>{
      await getPinDetail()
      await getLists()
    })()

    return {
      ...toRefs(state)
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
