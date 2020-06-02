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

import pinAPI from '@/api/pins.js'
export default {
  name: '',
  components: {rightSide},
  props: ['id'],
  data () {
    return {
      comments: [],
      count: 0,
      pageNum: 1
    }
  },
  async created () {
    await this.getPinDetail()
    await this.getLists()
  },
  methods: {
    // 内容
    async getPinDetail() {
      try {
        let res = await pinAPI.pinDetail(this.id)
        console.log(res);
        // let {s ,d} = await pinAPI.pinActions
        // if(s === 1) {
        //   this.comments = d.comments
        //   this.count = d.count
        // }
      } catch (e) {
        console.log(e)
      }
    },
    //评论
    async getLists() {
      try {
        let {s ,d} = await pinAPI.pinComments(this.id, this.pageNum)
        if(s === 1) {
          this.comments = d.comments
          this.count = d.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    //评论的回复
    async getReply(id) {
      try {
        let {s ,d} = await pinAPI.pinReply(id)
        console.log(s,d);
      } catch (e) {
        console.log(e)
      }
    },
  }
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
