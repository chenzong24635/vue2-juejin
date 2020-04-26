<template>
  <div class="phone">
    <form  class="form phone-form">
      <div class="form-list">
        <input class="form-ipt" autofocus type="text" placeholder="请输入手机号">
      </div>
      <div class="form-list form-code">
        <input class="form-ipt" type="text" placeholder="请输入验证码">
        <button class="form-btn btn-primary" >获取验证码</button>
      </div>
      <div class="form-list form-code">
        <input class="form-ipt" type="password" placeholder="请输入新密码">
      </div>
      <div class="form-list">
        <button class="btn-primary" >确定</button>
      </div>
      <div class="form-list tac">
        <router-link to="/">返回首页</router-link>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'phone',
  components: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.form-list{
  margin-top: 3rem;
}
.form{
  &-ipt{
    border: none;
    border-bottom: 1px solid #eee;
  }
  &-code{
    .flex(center,center);
    .form-ipt{
      flex:3;
    }
    .form-btn{
      flex: 1;
    }
  }
}
</style>
