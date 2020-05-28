<template>
<!-- 推荐，关注 -->
  <div class="box">
    <div class="box-top">
      <div class="user">
        <img :src="list.actors[0].avatarLarge" :alt="list.actors[0].username" class="user-avatar">
        <div class="user-message">
          <p class="user-name">{{list.actors[0].username}}</p>
          <p class="user-meta">
            <span >{{list.actors[0].jobTitle}}</span>
            <span>@</span>
            <span >{{list.actors[0].company}}</span>
            <span>{{list.targets[0].createdAt}}</span>
          </p>
        </div>
      </div>
      <c-button type="success cutout">关注</c-button>
    </div>
    <div class="box-content">
      <div v-html="list.targets[0].content"></div>
      <div :class="['pics', list.targets[0].pictures.length>1? 'pics1' : '']">
        <div v-for="(img, imgIndex) in list.targets[0].pictures" :key="imgIndex" class="pic" :style="{backgroundImage: `url(${img})`}">
          <div style="padding-top:100%"></div>
        </div>
        <!-- <img :src="img" alt="" v-for="(img, imgIndex) in list.targets[0].pictures" :key="imgIndex"> -->
      </div>
      <div v-if="list.targets[0].topic" class="topic">
        
        <router-link :to="'/topic/' +list.targets[0].topic.id" target="_blank">{{list.targets[0].topic.title}}</router-link>
      </div>
    </div>
    <!-- <article-actions 
      :likeCount="list.likeCount"
      :commentCount="list.commentCount"
    /> -->
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    list: {
      type: Object,
    },
  },
  filters: {
    linkIcon(val){
      // <svg-icon name="pin-url-link.3f843e8"></svg-icon>
      let reg = /^http[s]:\/\//gi
      console.log(reg.test(val));
      return val
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {}
}
</script>
<style scoped lang="less">
@import '../../assets/css/pindetail.less';
</style>
