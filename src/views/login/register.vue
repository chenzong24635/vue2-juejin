<template>
  <div v-show="show" class="auth resgister">
    <div class="auth-modal">
      <form class="auth-form form">
        <svg-icon @click="close" name="close" class="close" color="#333"></svg-icon>
        <h1 class="title">注册</h1>
        <div class="form-list">
          <input type="text" placeholder="请输入用户名">
        </div>
        <div class="form-list">
          <input type="text" placeholder="请输入手机号">
        </div>
        <div class="form-list">
          <input type="password" placeholder="请输入密码（不少于6位）">
        </div>
        <div class="form-list">
          <c-button type="primary" :size="20">注册</c-button>
        </div>
        <div class="form-list ">
          <p @click="toLogin" style="text-align:center;" class="cp main-color" >已有账号登录</p>
        </div>
        <div class="form-list">
          <span>注册登录即表示同意</span>
          <a class="main-color" target="_blank" href="https://juejin.im/terms">用户协议</a>
          <span>、</span>
          <a class="main-color" target="_blank" href="https://juejin.im/privacy">隐私政策</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      thirdAuthShow: true,
    }
  },
  created () {},
  methods: {
    close() {
      this.$emit('closeModal');
    },
    toLogin() {
      this.$emit('closeModal'); //关闭注册组件
      this.$emit('toLogin', true); //显示登录组件
    }
  }
}
</script>
<style scoped lang="less">
a{display: inline-block;}

.auth{
  &-modal{
    .flex();
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 500;
  }
  &-form{
    position: relative;
    padding: 2rem;
    width: 26.5rem;
    max-width: 100%;
    font-size: 1.167rem;
    margin: auto;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    .close{
      position: absolute;
      top: 2rem;
      right: 2rem;
      cursor: pointer;
    }
    .title{
      font-size: 1.5rem;
      margin: 0 0 2rem
    }
  }
}
.form{
  &-list{
    margin: 1.2rem 0;
    color: #767676;
    input{
      color: #333
    }
    button{
      width: 100%;
    }
  }

  &-prompt{
    .flex(space-between,center)
  }
}
.thirdauth{
  cursor: pointer;
  color: #909090;
  &-lists{
    .flex(space-around, center);
  }
}

</style>
