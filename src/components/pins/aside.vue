<template>
  <aside class="aside">
    <h3 class="aside-title">推荐沸点</h3>
    <ul class="aside-lists">
      <li class="aside-list" v-for="item in newLists" :key="item.objectId">
        <router-link :to="'/pin/' + item.objectId" target="_blank">
          <div class="list-top">
            <p class="list-title">{{item.content}}</p>
            <img v-if="item.pictures.length" class="list-img" :src="item.pictures[0]" alt="">
          </div>
          <div class="list-bottom">
            <span>{{item.likedCount}}</span>
            <span>赞</span>
            <span>·</span>
            <span>{{item.commentCount}}</span>
            <span>评论</span>
          </div>
        </router-link>
      </li>
    </ul>
  </aside>
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
  computed: {
    newLists() { //只显示前三个
      return this.lists.slice(0, 3)
    }
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.aside{
  background-color: #fff;
  &-title{
    color: #2e3135;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.07;
    padding: 13px 16px;
    &:not(:last-child){
      border-bottom: 1px solid hsla(0,0%,59.2%,.1);
    }
  }
  &-lists{
    padding: 0 1.5rem;
  }
  &-list{
    .line(bottom);
    padding: 1rem 0;
  }
  .list{
    &-top{
      .flex();
    }
    &-title{
      flex: 1;
      padding-right: 1rem;
      .ov();
    }
    &-img{
      width: 35%;
      max-width: 80px;
      height: 80px;
      border-radius: 0.5rem;
      object-fit: cover;
    }
    &-bottom{
      .flex();
      &>span{
        color: @color;
        padding: 0 2px;
      }
    }
  }
}
</style>
