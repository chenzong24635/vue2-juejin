<template>
  <ul class="subscribes">
    <li class="subscribe" v-for="item in lists" :key="item.id">
      <div class="subscribe-box">
        <router-link target="_blank" :to="'/tag/' + encodeURIComponent(item.title)">
          <img class="subscribe-img" :src="item.icon" alt="">
        </router-link>
        <router-link target="_blank" class="subscribe-title" :to="'/tag/' + encodeURIComponent(item.title)">
          {{item.title}}
        </router-link>
        <p class="subscribe-counts">
          {{item.subscribersCount}} 关注  
          {{item.entryCount}} 文章
        </p>
        <c-button type="success cutout">关注</c-button>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: '',
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.subscribes{
  .flex(@wrap: wrap);
}
.subscribe{
  display: inline-block;
  width: 25%;
  text-align: center;
  padding: 0 .7rem;
  margin: 0.7rem 0;
  &-box{
    a{display: block;}
    width: 100%;
    padding: 1.5rem 0;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    transition: border-color .3s;
  }
  &-img{
    height: 32px;
  }
  &-title{
    font-size: 18px;
    line-height: 2;
  }
  &-counts{
    font-size: 13px;
    color: #909090;
    margin-bottom: 10px;
  }
}
</style>
