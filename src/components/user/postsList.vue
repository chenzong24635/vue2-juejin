<template>
  <ul class="posts">
    <!-- 专栏列表 -->
    <li class="posts-top">
      <p>专栏</p>
      <ul class="types" >
        <li
          v-for="(type, index) in types" :key="index"
          :class="['type', typeIndex === index ? 'active' : '']"
          @click="typeChange(item,index)"
        >
        {{type.title}}
        </li>
      </ul>
    </li>
    <li 
      class="post"
      v-for="item in lists"
      :key="item.objectId"
    >
      <div class="post-top">
        <img :src="item.user && item.user.avatarLarge" alt="" class="post-avatar">
        <p class="post-user">
          <span>{{item.user&&item.user.username}}</span>
          <span style="padding: 0 6px">·</span>
          <span>{{$_dateDis(item.createdAt)}}</span>
        </p>
      </div>
      <router-link target="_blank" :to="replaceUrl(item.originalUrl)">
        <div v-if="item.screenshot" class="post-img" >
        <div class="post-img-bg" :style="{backgroundImage: `url(${item.screenshot})`}"></div>
        </div>
        <div class="post-title" :to="replaceUrl(item.originalUrl)">{{item.title}}</div>
        <div :class="['post-content', item.screenshot?'ov1':'ov3']" :to="replaceUrl(item.originalUrl)">{{item.content}}</div>
      </router-link>
    </li>
  </ul>
</template>
<script>
import {$_dateDis}from '@/filters'
import { ref } from 'vue'
export default {
  name: '',
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  setup () {
    let types = Object.freeze([
      {
        title: '热门',
        order: 'rankIndex'
      },
      {
        title: '最新',
        order: 'createdAt'
      },
    ])
    let typeIndex = ref(0)
    function typeChange(item, index) {
      typeIndex.value = index
    }
    function replaceUrl(val) {
      return val && val.replace(/https:\/\/juejin.im/,'')
    }
    return {
      $_dateDis,
      typeIndex,
      types,
      typeChange,
      replaceUrl,
    }
  },
}
</script>
<style scoped lang="less">
.posts{
  background-color: #fff;
  &-top{
    .flex(space-between);
    padding: 10px 20px;
    background-color: #fff;
  }
}
.types{
  .flex();
  .type + .type{
    .line(left);
  }
  .type{
    padding: 0 5px;
    cursor: pointer;
    &.active{
      color: #72777b;
    }
  }
}
.post{
  .line(bottom);
  padding: 30px;
  &-top{
    .flex();
    margin: 10px 0;
  }
  &-avatar{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &-user{
    font-size: 12px;
    padding: .3rem 0 1.3rem;
    color: #8b8b8b;
  }
  &-img{
    position: relative;
    max-width: 100%;
    display: block;
    padding-top: 33.4%;
    &-bg{
          position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
      background: 50%/cover;
      background-color: #f8f9fa;
      cursor: pointer;
      border-radius: 3px;
    }
  }
  &-title{
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 2px;
    color: #000;
    line-height: 2;
  }
  &-content{
    color: #8b8b8b;

  }
}
</style>
