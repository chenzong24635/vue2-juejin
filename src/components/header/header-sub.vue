<template>
  <div class="container">
    <!--部分页面的头部（首页，小册）二级导航 -->
    <nav id="header-sub">
      <ul class="navs">
        <li class="nav" v-for="item in homeHeader" :key="item.name">
          <router-link @click.native="changeRoute(item)" :to="item.path" >{{item.meta.title}}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import homeHeader from '@/router/homeHeader'
import {mapState, mapMutations} from 'vuex'
export default {
  name: '',
  components: {},
  data () {
    return {
      homeHeader,
      apiData: {},
    }
  },
  computed: {
    ...mapState([
      'homeApiData',
      'path'
    ])
  },
  created () {
    let path = this.$route.path;
    //刷新时根据当前页面路径判断加载
    //如果当前 path 与刷新前存储的 path 相同且存在接口所需的参数
    if (this.path === path && Object.keys(this.homeApiData).length) {
      this.apiData = this.homeApiData;
    }else{ //否则加载默认（推荐）
      this.apiData = homeHeader[0].meta.apiData;
    }
    // this.$emit('getLists1', this.apiData);
  },
  methods: {
    ...mapMutations([
      'setHomeApiData'
    ]),
    changeRoute(item) {
      //存储当前参数，刷新时用
      this.setHomeApiData({path: item.path, homeApiData: item.meta.apiData});
      this.$emit('getLists1', item.meta.apiData);
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
    height: 4rem;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    transition: all .2s;
    transform: translateZ(0);
    background-color: #fff;
}
.navs{
  .flex();
    max-width: 960px;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    line-height: 1;
  .nav{
    height: 100%;
    font-size: 1.16rem;
    color: #71777c;
    cursor: pointer;
    &:hover{
      color: @mainColor;
    }
    a{
      .flex(center,center);
      flex-shrink: 0;
      height: 100%;
      padding: 0 1rem;
    }
  }
}
</style>
