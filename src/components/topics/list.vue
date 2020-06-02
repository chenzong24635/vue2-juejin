<template>
  <ul class="lists">
    <li class="list" v-for="item in lists" :key="item.objectId">
      <div class="list-img" >
        <img :src="item.icon" :title="item.description">
        <span class="list-img-num" v-if="type === 1">{{item.msgsCount}}</span>
      </div>
      <div class="list-content">
        <router-link  class="list-title" to="" :title="item.description">
          {{item.title}}
        </router-link>
        <p class="list-txt">
          <span>{{item.followersCount}}&nbsp;关注</span>
          <span>·</span>
          <span>{{item.msgsCount}}&nbsp;沸点</span>
        </p>
        <div class="list-floowed">
          <span class="list-floowed-y" v-show="item.followed">已关注</span>
          <span @click="foucs" class="list-floowed-n" v-show="!item.followed">+ 关注</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  name: '',
  components: {},
  props: {
    lists: {
      type: Array,
      required: true
    },
    type: {
      type: Number,
      default: 2
    }
  },
  methods: {
    ...mapActions([
      'showLoginModel'
    ]),
    foucs() {
      this.showLoginModel()
    },
  }
}
</script>
<style scoped lang="less">

.lists{
  .flex();
  flex-wrap: wrap;
}
.list{
  .flex(center);
  padding: 1.5rem 1.2rem;
  &-content{
    width: 12rem;
    max-width: 12rem;
    color: #8a9aa9;
    margin-left: 1.2rem;
  }
  &-img{
    position: relative;
    width: 6rem;
    height: 6rem;
    margin-right: 2%;
    cursor: pointer;
    &>img{
      border-radius: 1rem;
    }
    &-num{
      position: absolute;
      top: -1rem;
      right: -1rem;
      margin: 0;
      padding: .4rem .67rem;
      font-size: 1rem;
      line-height: 1;
      text-align: center;
      color: #f1f1f1;
      background-color: @mainColor;
      border-radius: 3rem;
      border: 2px solid #fff;
      word-break: normal;
    }
  }
  &-title{
    font-weight: 600;
    color: #2e3135;
    font-size: 1.4rem;
  }
  &-txt{
    font-size: 1.1rem;
    margin-top: 0.5rem;
    &>span{
      margin-right: .4rem;
    }
  }
  &-floowed{
    margin-top: 0.5rem;
    cursor: pointer;
    &-n{
      color: #37c701;
    }
  }
}
</style>
