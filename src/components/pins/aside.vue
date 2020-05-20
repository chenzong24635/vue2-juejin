<template>
  <aside class="aside">
    <h3 class="aside-title">推荐沸点</h3>
    <ul class="aside-lists">
      <li class="aside-list" v-for="item in lists" :key="item.objectId">
        <div class="list-left">
          <p class="list-title">{{item.content}}</p>
        </div>
        <img v-if="item.pictures.length" class="list-img" :src="item.pictures[0]" alt="">
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
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.aside{
  &-title{
    color: #2e3135;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.07;
    padding: 13px 16px;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
  }
  &-lists{
    padding: 0 1.5rem;
  }
  &-list{
    .flex();
    .line(bottom);
    padding: 1rem 0;
  }
  .list{
    &-left{
      flex: 1;
      padding-right: 1rem;
    }
    &-img{
      width: 35%;
      border-radius: 0.5rem;
    }
  }
}
</style>
