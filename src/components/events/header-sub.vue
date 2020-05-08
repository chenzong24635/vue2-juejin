<template>
  <div class="container">
    <!--二级导航 -->
    <nav id="header-sub">
      <div class="header-box">
        <ul class="navs">
          <li class="nav" v-for="(item, index) in headerSubs" :key="index">
            <router-link :to="'/' + mainRoute + '/'+item[subRoute]" >
              {{item[routeTitle]}}
            </router-link>
          </li>
          <li v-if="mainRoute === 'events'" class="nav others-events">
            <div class="txt">其他</div>
            <div name="" id="selectCity">
              <div 
                class="other"
                v-for="(item, index) in headerSubs1" 
                :key="index"
              >
                <router-link  :to="'/' + mainRoute + '/'+item[subRoute]" >
                  {{item[routeTitle]}}
                </router-link>
              </div>
            </div>
          </li>
        </ul>
        <slot name="events"></slot>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    headerSubs: {
      type: Array,
      required: true,
    },
    headerSubs1: {
      type: Array,
    },
    mainRoute: { //页面路径
      type: String,
      required: true,
    },
    subRoute: { //子路径
      type: String,
      default: '',
      required: true,
    },
    routeTitle: { //显示的标题
      type: String,
      required: true,
    },
  },
  data () {
    return {
    }
  },
  created () {
    console.log(this.headerSubs);
    console.log(this.mainRoute,
      this.subRoute,
      this.routeTitle);
  },
  methods: {
    changeRoute(item) {
      //存储当前参数，刷新时用
      console.log(item);
      // this.$emit('getLists');
    },
  }
}
</script>
<style scoped lang="less">
#header-sub{
  position: fixed;
  left: 0;
  top: 5rem;
  width: 100%;
  // height: 4rem;
  // padding: 1.2rem 0;
  z-index: 100;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  transition: all .2s;
  transform: translateZ(0);
  background-color: #fff;
}
.header-box{
  margin: auto;
  max-width: 960px;
  .flex(space-between,center);
}
.navs{
  .flex();
    height: 100%;
    display: flex;
    align-items: center;
    line-height: 1;
  .nav{
    font-size: 1.16rem;
    padding: 1.2rem 0;
    color: #71777c;
    cursor: pointer;
    &:hover > a{
      color: @mainColor;
    }
    &>a{
      .flex(center,center);
      flex-shrink: 0;
      height: 100%;
      padding: 0 1rem;
    }
  }
}

.others-events{
  position: relative;
  &:hover #selectCity{
    display: block;
  }
  .txt{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-shrink: 0;
    height: 100%;
    padding: 0 1rem;
    font-size: 1.16rem;
    cursor: pointer;
  }
  .other{
    display: block;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    &:hover{
      color: @activeColor;
      background-color: #f9f9f9;
      
    }
    
  }
}
#selectCity{
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
}
</style>
