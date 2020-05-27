<template>
  <div class="">
    <div class="following " v-if="type === 'following' && !isLogin">
      <svg-icon name="order" size=60 color="#e6e6e6"></svg-icon>
      <p>你关注人的动态会出现在这里</p>
      <button class="login btn">登录</button>
    </div>
    <ul>
      <li class="list" v-for="item in lists" :key="item.id">
        <list-detail1 v-if="type === 'recommended' || type === 'following'" :list="item" v-bind="$attrs" />
        <list-detail2 v-else :list="item" v-bind="$attrs" />
      </li>
    </ul>
  </div>
</template>
<script>
import listDetail1 from './list-detail1.vue'
import listDetail2 from './list-detail2.vue'
import {mapState} from 'vuex'

export default {
  name: '',
  components: {
    listDetail1,
    listDetail2
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: true
    },
    lists: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  data () {
    return {}
  },
  created () {
    console.log(this.$attrs);
  },
  methods: {}
}
</script>
<style scoped lang="less">
.list{
  margin-bottom: 6px;
  background-color: #fff;
}
.following{
  padding: 80px 20px;
  background-color: #fff;
  text-align: center;
  p{
    font-size: 15px;
    font-weight: 400;
    color: #b2bac2;
  }
}
.login{
  margin-top: 10px;
}
</style>
