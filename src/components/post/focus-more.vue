<template >
  <div class="focus">
    <p class="title">关注下面的标签，发现更多相似文章</p>
    <ul class="focus-tags">
      <li v-for="tag in tags" :key="tag.id">
        <router-link target="_blank" class="tag" :to="'/tag/' + tag.title">
          <img class="tag-icon" :src="tag.icon" :alt="tag.title">
          <span class="tag-title">{{tag.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    tags: {
      type: Array,
      default: ()=>[]
    }
  },
}
</script>
<style scoped lang="less">
.focus{
  margin-bottom: 20px;
  &-tags{
    .flex(@wrap: wrap);
    li{
      margin-right: 10px;
      a{display: inline;}
    }
  }
  .title{
    margin-bottom: 2rem;
    padding: 0 0 0 2rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #000;
    border-left: 6px solid #ddd;
  }
  .tag{
    .flex(space-between,center);
    .border();
    float: left;
    padding: 4px;
    &-icon{
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
    &-title{
      padding: 0 10px;
      color: #919191;
    }
  }
}

</style>
