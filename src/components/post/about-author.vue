<template>
  <section v-if="articleInfo" class="aside-box">
    <p class="aside-title">关于作者</p>
    <div class="info" >
      <img class="info-avatar" :src="articleInfo.user.avatarLarge" alt="">
      <div class="info-box">
        <div class="info-box-top">
          <p class="username">{{articleInfo.user.username}}</p>
          <user-level :level="3" />
        </div>
        <div class="info-box-bottom ov1">
          {{articleInfo.user.jobTitle}}
        </div>
      </div>
    </div>
    <div class="counts">
      <div class="count">
        <svg-icon name="praise" :size="25"></svg-icon>
        <span>获得点赞 {{articleInfo.user.totalCollectionsCount}}</span>
      </div>
      <div class="count">
        <svg-icon name="eye" :size="25"></svg-icon>
        <span>文章被阅读 {{articleInfo.user.totalCollectionsCount}}</span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: '',
  props: {
    articleInfo: {
      type: Object,
      required: true
    },
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">

.info{
  .flex(@ai:center,@wrap:nowrap);
    padding: 10px;

  &-avatar{
    margin-right: 1rem;
    width: 3.333rem;
    height: 3.333rem;
    border-radius: 50%;
  }
  &-box{
    min-width: 0;
    &-top{
      .flex(@ai:center);
      .username{
        font-size: 16px;
        font-weight: bold;
        margin: 0 0.2rem 0.2rem 0;
        color: #333;
      }
    }
    &-bottom{
      font-size: 1.25rem;
      color: #909090;
      span{
        margin-right: 10px;
      }
    }
    &-btn{
      .btn-primary(#6cbd45);
    }
  }
}
.count{
  .flex();

  padding: 0 10px 10px;
  &>span{
    font-size: 1.25rem;
    color: #000;
    margin-left: 16px;
  }
}
</style>
