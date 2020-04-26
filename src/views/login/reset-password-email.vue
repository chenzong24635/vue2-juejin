<template>
  <div class="email">
    <form  class="form email-form">
      <div class="form-list">
        <input class="form-ipt" autofocus type="text" placeholder="请输入邮箱">
      </div>
      <div class="form-list">
        <button class="btn-primary" >发送邮件</button>
      </div>
      <div class="form-list tac">
        <router-link to="/">返回首页</router-link>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'email',
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
}
</style>
