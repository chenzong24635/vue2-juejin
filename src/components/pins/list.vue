<template>
  <div class="">
    <article-nothing v-if="type === 'following' && !isLogin" title="你关注人的动态会出现在这里">
      <template>
        <c-button type="primary cutout">登录</c-button>
      </template>
    </article-nothing>
    <ul>
      <li class="list" v-for="item in lists" :key="item.id">
        <template v-if="type === 'recommended' || type === 'following'">
          <list-detail1  :list="item" v-bind="$attrs" />
          <article-actions 
            :likeCount="item.likeCount"
            :commentCount="item.commentCount"
            :id="item.id || item.objectId"
          /> 
        </template>
        <template  v-else>
          <list-detail2 :list="item" v-bind="$attrs" />
          <article-actions 
            :likeCount="item.likeCount"
            :commentCount="item.commentCount"
            :id="item.id || item.objectId"
          /> 
        </template>
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

.login{
  margin-top: 10px;
}
</style>
