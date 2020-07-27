<template>
  <header class="header" >
    <login-box></login-box>
    <div id="header-base">
      <div class="container">
        <router-link to="/timeline/recommended" class="logo">
          <svg-icon style="height:0.5em" name="logo" color="#007fff" :size="100" />
        </router-link>
        <nav class="navs">
          <ul class="navs-left">
            <li v-for="(item,index) in baseHeader" :key="index">
              <!-- :class="{routerLinkActive: }" -->
              <p :class="{'router-link-active': item.active}" @click="routeClick(item)">{{item.title}}</p>
            </li>
          </ul>
          <ul class="navs-right">
            <li class="navs-right-item" style="flex:1">
              <div :class="['search',iptFoucs?'active':'']" >
                <input 
                  @click="iptFoucs = true" 
                  @blur="iptFoucs = false" 
                  @keyup.enter="search" 
                  v-model="searchVal"
                  class="search-ipt" 
                  type="text" 
                  placeholder="搜索掘金"
                >
                <svg-icon @click="search" v-show="!iptFoucs" class="search-icon" name="search" color="#71777c" />
                <svg-icon @click="search" v-show="iptFoucs" class="search-icon" name="search-focus" color="#71777c" />
              </div>
            </li>
            <li v-if="isLogin" class="navs-right-item">
              <div  class="add-group">
                <button class="add-btn">写文章</button>
                <div class="more" @click="addBtnMore">
                  <svg-icon 
                    class="more-icon" 
                    name="arrowdown" 
                    color="#fff"
                  >
                  </svg-icon>
                </div>
                <ul v-show="moreListShow" class="more-list">
                  <li class="item">
                    <router-link to="">分享链接</router-link>
                  </li>
                  <li class="item">
                    <router-link to="">发布沸点</router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li v-if="isLogin" class="navs-right-item">
              <router-link to="">
                <svg-icon name="notifications" color="#71777c" :size="40" />
              </router-link>
            </li>
            <li v-if="isLogin" class="navs-right-item">
              <img class="avatar" src="../../assets/image/logo.png" alt="">
            </li>
            <li @click="showWriteBox" v-if="!isLogin" class="navs-right-item navs-right-line">
              <svg-icon class="aaa" name="writeletter" color="#007fff"  />
              <span>写文章</span>
              <div v-show="writeBoxShow" class="write-box">
                <div class="title">来掘金写文章，您将有机会</div>
                <ul class="write-list">
                  <li class="item">与超过 300 万开发者分享您的经验和观点</li>
                  <li class="item">被编辑推荐，获得更多曝光和关注</li>
                  <li class="item">加入专栏作者群，结识众多优秀开发者</li>
                </ul>
                <button >开始写文章</button>
              </div>
            </li>
            <li v-if="!isLogin" class="navs-right-item navs-right-login">
              <!-- <span @click="showHide1(true)">登录</span> -->
              <span @click="setLoginModel('login')">登录</span>
              <span>·</span>
              <span @click="setLoginModel('register')">注册</span>
              <!-- <span @click="showHide2(true)">注册</span> -->
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
interface baseHeaderType{
  path: string,
  title: string,
  active: boolean,
}

import LoginBox from '@/views/login/login'
// import RegisterBox from '@/views/login/register'

import { useStore} from 'vuex'
import { reactive, toRefs ,computed} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { objType } from '@/types/commons/index';

export default {
  components: {
    LoginBox,
    // RegisterBox
  },
  setup () {
    // setLoginModel
    const store = useStore()
    let isLogin = computed(()=>store.state.isLogin)
    let loginModel = computed(()=>store.state.loginModel)
    let setLoginModel = (val: boolean) => {
      store.commit('setLoginModel',val)
    }
    let state = reactive({
      baseHeader: [
        {
          path: '/timeline/recommended',
          title: '首页',
          active: false,
        },
        {
          path: '/pins/recommended',
          title: '沸点',
          active: false,
        },
        {
          path: '/topics',
          title: '话题',
          active: false,
        },
        {
          path: '/books/all',
          title: '小册',
          active: false,
        },
        {
          path: '/events/all',
          title: '活动',
          active: false,
        },
      ],
      iptFoucs: false,
      moreListShow: false,
      registerFormShow: false,
      loginFormShow: false,
      writeBoxShow: false,
      searchVal: ''
    })
    let router:objType = useRouter()
    let route:objType = useRoute()
    function routeClick(item:baseHeaderType):void {
      router.push({
        path: item.path
      })
      state.baseHeader.forEach((item:baseHeaderType) => {
        item.active = false
      })
      item.active = true
    }
    function search() {
      let type:string = 'all'
      // let query = ''
      if(!state.searchVal.trim().length)return
      if(route.name.value==='search') {
        type = route.params.value.type
      }
      router.push(`/search/${type}/${state.searchVal}`)
    }
    function showWriteBox():void { //未登录 点击写文章显示 box
      // state.writeBoxShow = !state.writeBoxShow;
    }
    function addBtnMore():void {
      state.moreListShow = !state.moreListShow;
    }
    function showHide1(bool:boolean = false):void {
      state.loginFormShow = bool;
      state.writeBoxShow = false;
    }
    function showHide2(bool:boolean = false):void {
      state.registerFormShow = bool;
      state.writeBoxShow = false;
    }

    return {
      isLogin,
      loginModel,
      setLoginModel,
      ...toRefs(state),
      routeClick,
      search,
      showWriteBox,
      addBtnMore,
      showHide1,
      showHide2,
    }
  },
}
</script>
<style lang="less" scoped>
.header{
  height: 5rem;
}
#header-base{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5.1rem;
  z-index: 101;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  .container{
    .flex(@ai:center);
  }
}
.navs{
  .flex(space-between, center);
  flex: 1;
  &-left,&-right{
    .flex(center, center);
    &>li{
      .flex(center, center);
      position: relative;
      height: 100%;
    }
  }
  &-left > li{
    font-size: 1.33rem;
    padding: 0 20px;
    height: 5rem;
    color: @color;
    &.active,
    &:hover{
      color: @activeColor;
    }
  }
  &-right{
    color: @mainColor;
    &-item{
      padding: 0 1rem;
      font-size: 1.33rem;
    }
    &-line{
      position: relative;
      padding-right: 1.3rem;
      cursor: pointer;
      &:after{
        content: '|';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: 76%;
        overflow: hidden;
        margin: auto 0;
        color: hsla(0,0%,59.2%,.4)
      }
    }
    &-login{
      cursor: pointer;
      &>span{
        padding: 0 .4rem;
      }
    }
  }
}

.search{
  .flex(center, center);
  flex: 1;
  .border();
  border-radius: 2px;
  background-color: rgba(227,231,236,.2);
  &.active{
    border-color: @activeColor;
  }
  &-icon{
    cursor: pointer;
  }
  &-ipt{
    border: none;
    width: 10rem;
    padding: .6rem 1rem;
    box-shadow: none;
    outline: none;
    font-size: 1.1rem;
    color: #666;
    background-color: transparent;
    
  }
}
.add-group{
  position: relative;
  height: 2.667rem;
  border-radius: 2px;
  cursor: pointer;
  background: @mainColor;
  .flex(center,center);
  .add-btn{
    height: 100%;
    padding: .5rem .9rem;
    background-color: @mainColor;
    font-size: 1.167rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &:hover{
      background-color: @mainColor1;
    }
  }
  .more{
    position: relative;
    .flex(center,center);
    flex: 0 0 auto;
    width: 1.25rem;
    height: 100%;
    // .line(left,hsla(0,0%,100%,.1);
    border-left: 1px solid hsla(0,0%,100%,.1);
    &:hover{
      background-color: @mainColor1;
    }
    &-icon{
      color: #fff;
      
    }
    &-list{
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      padding: .6rem 0;
      font-size: 1.167rem;
      color: #3b76c5;
      background-color: #fff;
      border: 1px solid #ebebeb;
      border-radius: 2px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      z-index: 1;
      .item+.item{
        padding-top: .8rem;
      }
      .item{
        // padding: 0.6rem 0;
        text-align: center;
        &:hover{
          background-color: #f4f5f5;
        }
        
      }
    }
  }
}

.avatar{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: relative;
}

.write{
  &-box{
    position: absolute;
    top: 200%;
    width: 326px;
    box-sizing: border-box;
    padding: 2.5rem 2rem;
    border-radius: 2px;
    color: #909090;
    font-size: 1.1rem;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    border: 1px solid rgba(178,181,187,.5);
    cursor: default;
    z-index: 11;
    &:before{
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 1rem;
      height: 1rem;
      border-top: 1px solid rgba(178,181,187,.5);
      border-left: 1px solid rgba(178,181,187,.5);
      background-color: #fff;
      transform: rotate(45deg) translate(-50%,-50%);
      transform-origin: 0 0;
    }
    .title{
      font-size: 1.4rem;
      line-height: 1;
      font-weight: 700;
      color: #000;
      text-align: center;
      margin-bottom: 2rem;
    }
    button{
      display: block;
      margin: 2rem auto 0;
      background-color: #83c73a;
      font-size: 1.2rem;
      padding: 1rem 4rem;
    }
  }
  &-list{
    padding-left: 2rem;
    .item{
      list-style: initial;
      margin-bottom: 1rem;
    }
  }
  
}
</style>
