<template>
  <div class="actions">
    <div class="action">
      <svg-icon name="praise1"></svg-icon>
      <span>{{ likeCount || '赞'}}</span>
    </div>
    <picture>
      <source media="(min-width: )" srcset="">
      <img src="" alt="">
    </picture>
    <router-link target="_blank" :to="'/pin/'+id" class="action">
      <svg-icon name="message2"></svg-icon>
      <span>{{ commentCount || '评论'}}</span>
    </router-link>
    <div class="action">
      <svg-icon name="upload"></svg-icon>
      <span>分享</span>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['likeCount', 'commentCount', 'id'],
  /* props: {
    likeCount: {
      type: Number,
      required: true
    },
    commentCount: {
      type: Number,
      required: true
    },
  }, */
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.actions{
  .flex(space-between,center);
}
.action{
  .flex(center,center);
  .line(top);
  flex: 1 1 33.333%;
  padding: 6px;
  text-align: center;
  cursor: pointer;
  span{
    color: #8a93a0;
    padding-left: 4px;
  }
}
</style>
