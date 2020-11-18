<template>
  <transition name="custom-loading-fade">
    <!--loading遮罩-->
    <div v-show="visible" class="custom-loading-mask">
      <!--loading内容-->
      <div class="custom-loading-box">
        <div class="loading"><svg-icon name="loading" :size="30" color="#fff"></svg-icon></div>
        <p class="custom-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      visible: false
    }
  }
}

</script>
<style lang="less">
.custom-loading{
  &-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &-box{
    text-align: center;
    color: #fff;
    p{margin-top: 10px;}
    .loading{
      animation: loading-rotate 0.6s linear infinite;
    }
  }
}
@keyframes loading-rotate {
  0% {
    transform:  rotate(0);
  }
  100% {
    transform:  rotate(1turn);
  }
}
</style>