<template>
<!-- 推荐，关注 -->
  <div class="box">
    <!-- {{$attrs}} -->
    <div class="box-top">
      <div class="user">
        <img :src="userData.actors[0].avatarLarge" :alt="userData.actors[0].username" class="user-avatar">
        <div class="user-message">
          <p class="user-name">{{userData.actors[0].username}}</p>
          <p class="user-meta">
            <span >{{userData.actors[0].jobTitle}}</span>
            <span>@</span>
            <span >{{userData.actors[0].company}}</span>
            <span>{{userData.targets[0].createdAt}}</span>
          </p>
        </div>
      </div>
      <div class="box-focus">关注</div>
    </div>
    <div class="box-content">
      {{userData.targets[0].content}}
    </div>
    <div class="pics">
            <!-- pictures -->
    </div>
    <div v-if="userData.targets[0].topic" class="topic">
      {{userData.targets[0].topic.title}}
    </div>
    <div class="box-actions">
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    user: {
      type: Object,
    },
    id: {
      type: String,
    }
  },
  data () {
    return {
      userData: {}
    }
  },
  created () {
    console.log(this.user);
    this.userData = this.user
  },
  methods: {}
}
</script>
<style scoped lang="less">
@import '../../assets/css/pindetail.less';
</style>
