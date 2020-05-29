<template>
  <div class="container">
    <!-- pin
    {{id}} -->
    <comment-list :lists="comments" />
  </div>
</template>
<script>
import pinAPI from '@/api/pins.js'
export default {
  name: '',
  components: {},
  props: ['id'],
  data () {
    return {
      comments: [],
      count: 0,
      pageNum: 1
    }
  },
  async created () {
    console.log();
    await this.getLists()
    // await this.getActions()
    // if(this.comments.length){
    //   this.comments.forEach(async (item, index)  => {
    //     console.log(item,index);
    //     await this.getReply(item.id)
    //   })
    // }
  },
  methods: {
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
    async getActions() {
      try {
        let res = await pinAPI.pinActions(this.id)
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
    //评论的回复
    async getReply(id) {
      console.log(id);
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
  max-width: 640px;
  background-color: #fff;
}
</style>
