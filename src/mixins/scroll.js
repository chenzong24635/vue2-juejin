/**
 * 公用触底事件
 */

export default {
  data() {
    return {
      scrollTop: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollBottom)
    this.$once('hook:beforeDestroy',() => {
      window.removeEventListener('scroll', this.scrollBottom)
    })
  },

  methods: {
    scrollBottom() {
      let rect = document.body.getBoundingClientRect();
      let scrollTop = -rect.top; // 滚动条距离顶部的高度
      let bodyHeight = rect.height; // 当前页面的总高度
      let clientHeight = document.documentElement.clientHeight; // 当前可视的页面高度
      if (this.scrollTop > scrollTop) { // 判断是否上滚
        this.scrollTop = scrollTop;
        return
      }
      this.scrollTop = scrollTop;
      if (scrollTop + clientHeight > (bodyHeight - clientHeight / 2)) { // 距离顶部+当前高度 >=文档总高度 即代表滑动到底部
        this.getLists();
      }
    }
  },
}
