<template>
  <div class="actions">
    <div  @click="praise" class="action">
      <svg-icon name="praise1"></svg-icon>
      <span>{{ likeCount || '赞'}}</span>
    </div>
    <router-link target="_blank" :to="'/pin/'+ id" class="action">
      <svg-icon name="message2"></svg-icon>
      <span>{{  commentCount || '评论'}}</span>
    </router-link>
    <div class="action">
      <svg-icon name="upload"></svg-icon>
      <span>分享</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['likeCount','id','commentCount'],
  setup() {
    let praise = ()=>{
      
    }
    return {
      praise
    }
  }
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
