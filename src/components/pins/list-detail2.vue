<template>
<!-- 热门 -->
  <div class="box">
    222
    <!-- {{$attrs}} -->
    <div class="box-top">
      <div class="user">
        <!-- <img :src="userData.user.avatarLarge" :alt="userData.user.username" class="user-avatar">
        <div class="user-message">
          <p class="user-name">{{userData.user.username}}</p>
          <p class="user-job_time">
            <span class="user-job">{{userData.user.username}}</span>
            <span class="user-time">{{userData.user.createdAt}}</span>
          </p>
        </div> -->
      </div>
      <div class="box-focus">关注</div>
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
.box{
  &-top{
    .flex(space-between,center);
  }
}
</style>
