<template>
  <div v-show="show" class="auth resgister">
    <div class="auth-modal">
      <div class="auth-form">
        <svg-icon @click="close" class="close" name="close" color="#333"></svg-icon>
        <h1 class="title">登录</h1>
        <div class="form-list">
          <input type="text" v-model="phoneNumber" placeholder="请输入手机号或邮箱">
        </div>
        <div class="form-list">
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="form-list">
          <c-button @click.native="login" type="primary" :size="20">登录</c-button>
        </div>
        <div class="form-list form-prompt">
          <p>
            <span>没有账号？</span>
            <span @click="toReg" class="cp main-color">注册</span>
          </p>
          <router-link class="main-color" target="_blank" to="/resetPwd" @click="close">忘记密码</router-link>
        </div>
        <div class="form-list">
          <span>注册登录即表示同意</span>
          <a class="main-color" target="_blank" href="https://juejin.im/terms">用户协议</a>
          <span>、</span>
          <a class="main-color" target="_blank" href="https://juejin.im/privacy">隐私政策</a>
        </div>
        <div class="form-list thirdauth">
          <p @click="thirdAuth" v-if="!thirdAuthShow">第三方登录</p>
          <ul v-else class="thirdauth-lists">
            <li class="thirdauth-list">
              <svg-icon name="weibo"></svg-icon>
            </li>
            <li class="thirdauth-list">
              <svg-icon name="weixin"></svg-icon>
            </li>
            <li class="thirdauth-list">
              <svg-icon name="github"></svg-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import authAPI from '@/api/auth'
export default {
  name: 'login',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      thirdAuthShow: false,
      phoneNumber: '1',
      password: '123'
    }
  },
  created () {
    
  },
  methods: {
    close() {
      console.log(1);
      this.$emit('closeModal');
    },
    toReg() {
      this.$emit('closeModal'); //关闭登录组件
      this.$emit('toReg', true); //显示注册组件
    },
    thirdAuth() {
      this.thirdAuthShow = true;
    },
    async login() {
      let res = await authAPI.loginAuth(this.phoneNumber, this.password)
      console.log(res);
      /* authAPI.loginAuth(this.phoneNumber, this.password).then(res => {
        console.log(res);
      }) */
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
  &-list{
    .flex(center,center);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #f4f8fb;
  }
}

</style>
