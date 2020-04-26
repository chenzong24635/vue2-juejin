<template>
  <div class="suspension">
    <!-- 右下角 悬挂组件 -->
    <button @click="backTop" v-show="showTopBtn" class="suspension-btn suspension-top">
      <svg-icon name="arrowup" :size="30"></svg-icon>
    </button>
    <button class="suspension-btn suspension-msg">
      <svg-icon name="message" color="#007fff" :size="16"></svg-icon>
    </button>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      showTopBtn: false
    }
  },
  mounted () {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    backTop() {
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth"
      });
    },
    handleScroll() {
      let rect = document.body.getBoundingClientRect();
      let scrollTop = - rect.top;
      let bodyHeight = rect.height;
      // console.log(scrollTop)
      //滚动 超过1/10时显示
      if (scrollTop > bodyHeight / 10 ) {
        this.showTopBtn = true;
      } else {
        this.showTopBtn = false;
      }
    },
  }
}
</script>
<style scoped lang="less">
.suspension{
  .flex(@dir: column);
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1000;
  &-btn{
    // padding: 1rem;
    width: 3.33rem;
    height: 3.33rem;
    border-radius: 50%;
    background-color: #fff;
    margin-bottom: 1rem;
  }
}
</style>
