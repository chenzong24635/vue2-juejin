<template>
  <div class="container">
    <!--二级导航 -->
    <nav id="header-sub">
      <ul class="navs">
        <li class="nav" v-for="item in headerSubs" :key="item.id">
          <router-link @click.native="changeRoute(item)" :to="'/books/'+item.alias" >{{item.name}}</router-link>
        </li>
      </ul>
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
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    changeRoute(item) {
      //存储当前参数，刷新时用
      console.log(item);
      this.$emit('getLists', item.alias);
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
