<template>
  <div class="">
    <form class="reset-form">
      <h1 class="title">重置密码</h1>
      <div class="nav">
        <router-link class="nav-item" to="/resetPwd/email">邮箱重置</router-link>
        <router-link class="nav-item" to="/resetPwd/phone">手机重置</router-link>
      </div>
      <router-view></router-view>
    </form>
  </div>
</template>
<script>
export default {
  name: 'resetpassword',
  components: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.reset-form{
  margin: 6rem auto;
  width: 40rem;
  max-width: 100%;
  padding: 4rem 3rem;
  font-size: 1.16rem;
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  .title{
    text-align: center;
  }
  .nav{
    .flex();
    margin-top: 3rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #f1f1f1;
    user-select: none;
    &-item{
      flex: 1 1 auto;
      padding: .8rem 1rem;
      text-align: center;
      cursor: pointer;
      &.router-link-active{
        border-bottom: 2px solid;
      }
    }
  }
}
</style>
