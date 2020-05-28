<template>
  <div class="">
    book-{{id}}
    <!-- https://juejin.im/book/59e414a5518825541b03ce66 -->
    <!-- https://juejin.im/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022 -->
  </div>
</template>
<script>
import bookAPI from '@/api/books.js'
export default {
  name: '',
  components: {},
  props: ['id'],
  data () {
    return {
      bookDesc: {},
      bookSection: [],
    }
  },
  created () {
    this.getBookDesc()
    // this.getBookSection()
  },
  methods: {
    async getBookDesc() {
      try {
        let {s,d} = await bookAPI.bookDesc(this.id)
        if(s === 1) {
          this.bookDesc = d
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getBookSection() {
      try {
        let {s,d} = await bookAPI.bookSection(this.id)
        if(s === 1) {
          this.bookSection = d
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>
