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
<script lang="ts">
import {  onMounted, ref } from 'vue';
import { objType } from '../../types/commons';
export default {
  name: '',
  setup () {
    let showTopBtn = ref(false)
    let backTop =():void => {
      window.scrollTo({ 
        top: 0, 
        // behavior: "smooth"
      });
    }
    let handleScroll =():void => {
      let rect:objType = document.body.getBoundingClientRect();
      let scrollTop:number = - rect.top;
      let bodyHeight:number = rect.height;
      // console.log(scrollTop)
      //滚动 超过1/10时显示
      if (scrollTop > bodyHeight / 10 ) {
        showTopBtn.value = true;
      } else {
        showTopBtn.value  = false;
      }
    }
    onMounted(():void=>{
      window.addEventListener("scroll", handleScroll);
    })

    return {
      showTopBtn,
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
