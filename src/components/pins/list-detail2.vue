<template>
<!-- 热门,开源推荐等 -->
  <div class="box">
    <div class="box-top">
      <div class="user">
        <router-link target="_blank" :to="'/user/'+( list.user.id || list.user.objectId)">
          <img :src="list.user.avatarLarge"  class="user-avatar">
        </router-link>
        <div class="user-message">
          <p class="user-name">{{list.user.username}}</p>
          <p class="user-meta">
            <span >{{list.user.jobTitle}}</span>
            <span v-if="list.user.company">@ {{list.user.company}}</span>
            <span>· {{list.user.createdAt | dateDis}}</span>
          </p>
        </div>
      </div>
      <div class="box-focus">关注</div>
    </div>
    <div class="box-content">
      <div v-html="list.content"></div>
      <div :class="['pics', list.pictures.length>1? 'pics1' : '']">
        <div v-for="(img, imgIndex) in list.pictures" :key="imgIndex" class="pic" :style="{backgroundImage: `url(${img})`}">
          <div style="padding-top:100%"></div>
        </div>
      </div>
      <div v-if="list.topic" class="topic">
        <router-link :to="'/topic/' +list.topic.objectId" target="_blank">{{list.topic.title}}</router-link>
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
