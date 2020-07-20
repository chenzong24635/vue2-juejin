<template>
  <div @click.stop="close">
    <div v-show="loginModel === 'login'" class="auth">
      <div class="auth-modal" >
        <div class="auth-form" >
          <div class="auth-imgs">
            <img v-show="focusType===0" src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" class="auth-img normal">
            <img v-show="focusType===1" src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="auth-img greeting">
            <img v-show="focusType===2" src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="auth-img blindfold">
          </div>
          <svg-icon @click.stop="setLoginModel('')" class="close" name="close" color="#333"></svg-icon>
          <h1 class="title">登录</h1>
          <div class="form-list">
            <input type="text" 
              @click="focusType=1" 
              @blur="focusType=0" 
              v-model="phoneNumber" 
              placeholder="请输入手机号或邮箱"
            >
          </div>
          <div class="form-list">
            <input type="password" 
              @click="focusType=2" 
              @blur="focusType=0" 
              v-model="password" 
              placeholder="请输入密码"
            >
          </div>
          <div class="form-list">
            <c-button @click="login" type="primary" :size="20">登录</c-button>
          </div>
          <div class="form-list form-prompt">
            <p>
              <span>没有账号？</span>
              <span @click.stop="setLoginModel('register')" class="cp main-color">注册</span>
            </p>
            <router-link class="main-color"  to="/resetPwd" @click.stop="setLoginModel('')">忘记密码</router-link>
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
    <div  v-show="loginModel === 'register'" class="auth">
      <div class="auth-modal">
        <div class="auth-form form">
          <svg-icon @click.stop="setLoginModel('')" name="close" class="close" color="#333"></svg-icon>
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
            <p @click.stop="setLoginModel('login')" style="text-align:center;" class="cp main-color" >已有账号登录</p>
          </div>
          <div class="form-list">
            <span>注册登录即表示同意</span>
            <a class="main-color" target="_blank" href="https://juejin.im/terms">用户协议</a>
            <span>、</span>
            <a class="main-color" target="_blank" href="https://juejin.im/privacy">隐私政策</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import authAPI from '@/api/auth'
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'login-register',
  components: {},
  data () {
    return {
      focusType: 0,
      thirdAuthShow: false,
      phoneNumber: '1',
      password: '123'
    }
  },
  computed: {
    ...mapState([
      'loginModel'
    ])
  },
  created () {
    
  },
  methods: {
    close(e){
      //点击模态框 隐藏
      console.log(e);
      // if(e.target.parentNode &&(e.target.parentNode.className ==="auth")) {
      //   this.setLoginModel('')
      // }
    },
    ...mapMutations([
      'setLoginModel'
    ]),
    thirdAuth() {
      this.thirdAuthShow = true;
    },
    async login() {
      let res = await authAPI.login(this.phoneNumber, this.password)
      console.log(res);
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
    display: none;
  }
  &-imgs{
    position: relative;
    .auth-img{
      position: absolute;
      top: 0;
      left: 50%;
      width: 10rem;
      z-index: 1;
      &.normal{
        transform: translate(-50%,-83%);
      }
      &.greeting{
        transform: translate(-50%,-75.8%);
      }
      &.blindfold{
        transform: translate(-50%,-75%);
      }
    }
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
