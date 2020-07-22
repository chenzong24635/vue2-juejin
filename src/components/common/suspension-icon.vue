<template>
  <div class="suspension">
    <!-- 右下角 悬挂组件 -->
    <button @click="backTop" v-show="showTopBtn" class="suspension-btn suspension-top" title="回到顶部">
      <svg-icon name="arrowup" :size="30" color="#909090"></svg-icon>
    </button>
    <button class="suspension-btn suspension-msg" title="建议反馈">
      <svg-icon name="message" color="#007fff" :size="16"></svg-icon>
    </button>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue';
export default {
  name: '',
  setup () {
    let state = reactive({
      showTopBtn: false
    })
    let backTop =() => {
      window.scrollTo({ 
        top: 0, 
        // behavior: "smooth"
      });
    }
    let handleScroll =() => {
      let rect = document.body.getBoundingClientRect();
      let scrollTop = - rect.top;
      let bodyHeight = rect.height;
      // console.log(scrollTop)
      //滚动 超过1/10时显示
      if (scrollTop > bodyHeight / 10 ) {
        state.showTopBtn = true;
      } else {
        state.showTopBtn = false;
      }
    }
    onMounted(()=>{
      window.addEventListener("scroll", handleScroll);
    })

    return {
      ...toRefs(state),
      backTop
    }
  },
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
    &:hover{
      box-shadow: 0 0 5px #ddd;
    }
  }
}
</style>
