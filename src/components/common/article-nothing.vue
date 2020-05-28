<template>
  <div class="nothing " >
    <svg-icon name="order" :size="60" color="#e6e6e6"></svg-icon>
    <p>{{title}}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="less">
.nothing{
  padding: 80px 20px;
  background-color: #fff;
  text-align: center;
  p{
    font-size: 15px;
    font-weight: 400;
    color: #b2bac2;
  }
}
</style>
