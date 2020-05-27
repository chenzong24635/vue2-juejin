<template>
  <div class="tags">
    <!-- 首页-未登录-热门标签 -->
    <p class="top">
      <span>热门标签</span>
      <router-link to="/subscribe/all">查看全部</router-link>
    </p>
    <nav>
      <ul class="tags-lists">
        <li class="tags-list" v-for="tag in tags" :key="tag.tagid">
          <router-link target="_blank" :to="'/tag/' + tag.title" >{{tag.title}}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      tags: [
        {
          tagid: '55cdb52740ac79db3570607f',
          title: '架构'
        },
        {
          tagid: '5597a3cae4b08a686ce5d0fb',
          title: '开源'
        },
        {
          tagid: '55cd843d60b203b0519307a9',
          title: '算法'
        },
        {
          tagid: '555e9abee4b00c57d9956152',
          title: 'GuitHub'
        },
        {
          tagid: '55979fe6e4b08a686ce562fe',
          title: '面试'
        },
        {
          tagid: '559c814be4b0d4d1b1e9521e',
          title: '代码规范'
        },
        {
          tagid: '56e65334da2f60004c50910f',
          title: '产品'
        },
        {
          tagid: '56b5a7f3df0eea00544e1993',
          title: '掘金翻译计划'
        },
      ],
    }
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.top{
  .flex(space-between,center);
  .line(@dir:bottom);
  padding: 1.2rem .8rem;
  font-size: 14px;
}
.tags-lists{
  .flex();
  flex-wrap: wrap;
  padding: 1.2rem;
}
.tags-list{
  a{
    margin-right: 12px;
    margin-bottom: 12px;
    background-color: #f3f6f3;
    cursor: pointer;
    height: 30px;
    color: inherit;
    line-height: 30px;
    padding-left: 22px;
    padding-right: 22px;
    border-radius: 30px;
    &:hover{
      color: #fff;
      background-color: #0c0;
    }
  }
}
</style>
