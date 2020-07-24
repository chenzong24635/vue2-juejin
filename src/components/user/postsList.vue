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
        <img :src="item.user.avatarLarge" alt="" class="post-avatar">
        <p class="post-user">
          <span>{{item.user.username}}</span>
          <span>{{item.createdAt}}</span>
          <!-- <span>{{item.createdAt | dateDis}}</span> -->
        </p>
      </div>
      <router-link target="_blank" class="post-img" :to="item.originalUrl.replace(/https:\/\/juejin.im/,'')">
        <div class="post-img-bg" :style="{backgroundImage: `url(${item.screenshot})`}"></div>
      </router-link>
      <router-link target="_blank" class="post-title" :to="item.originalUrl.replace(/https:\/\/juejin.im/,'')">{{item.title}}</router-link>
      <router-link target="_blank" class="post-content ov1" :to="item.originalUrl.replace(/https:\/\/juejin.im/,'')">{{item.content}}</router-link>
    </li>
  </ul>
</template>
<script>
import { reactive, toRefs } from 'vue'
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
    let state = reactive({
      typeIndex: 0,
    })
    function typeChange(item, index) {
      state.typeIndex = index
    }
    return {
      ...toRefs(state),
      types,
      typeChange
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
    line-height: 1.3;
  }
  &-content{
    color: #8b8b8b;

  }
}
</style>
