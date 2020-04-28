<template>
  <div  class="home-right">
    <!-- 首页-未登录-右侧内容 -->
    <div class="box">
      <home-right-register />
    </div>
    <div class="box">
      <home-right-hottags />
    </div>
  </div>
</template>
<script>
import homeRightRegister from './register'
import homeRightHottags from './hottags'

export default {
  name: '',
  components: {
    homeRightRegister,
    homeRightHottags
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.home-right{
  max-width: 240px;
  width: 100%;
  margin-left: 20px;
  // background-color: #fff;
  .box{
    background-color: #fff;
  }
  .box + .box{
    margin-top: 1.5rem ;
  }
}
</style>
