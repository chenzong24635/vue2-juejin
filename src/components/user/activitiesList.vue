<template>
  <!-- 动态列表-->
  <!-- action: "LIKE_ARTICLE" -->
  <ul class="activities" v-if="listsNew.length">
    <li 
      class="activitie"
      v-for="item in listsNew"
      :key="item.id"
    >
      <p class="zan">
        <span class="zan-username">{{username}}</span>
        <span>赞了这篇文章</span>
      </p>
      <router-link to="" >
        <div class="user">
          <img class="user-avatar" :src="item.targets[0].user ? item.targets[0].user.avatarLarge : ''" alt="" />
          <div class="user-msg">
            <p class="user-username">{{item.targets[0].user ? item.targets[0].user.username : ''}}</p>
            <p>
              <span>{{item.targets[0].user ? item.targets[0].user.jobTitle : ''}}</span>
              <span> {{item.didAt | dateDis}}</span>
            </p>
          </div>
          <c-button type="success cutout">关注</c-button>
        </div>
        <div class="article">
          <div class="article-title">
            <span>专栏</span>
            <h3>{{item.targets[0].title}}</h3>
          </div>
          <div class="article-content">
            <p>{{item.targets[0].content}}</p>
            <img v-if="item.targets[0].screenshot" :src="item.targets[0].screenshot" alt="">
          </div>
        </div>
      </router-link>
      <article-actions :likeCount="item.targets[0].likeCount" :commentCount="item.targets[0].commentsCount" />
    </li>
  </ul>
</template>
<script>
export default {
  name: '',
  props: {
    username: {
      type: String,
      required: true
    },
    lists: {
      type: Array,
      required: true
    }
  },
  computed: {
    listsNew(){
      // console.log(this.lists);
      //点赞文章
      let lists = this.lists.map(item => item.node).filter(item=>item.action === 'LIKE_ARTICLE')
      return lists
    }
  },
  updated() {
  }
}
</script>
<style scoped lang="less">
.zan{
  .line(bottom);
  padding: 10px 20px;
  font-size: 13px;
  color: #8a9aa9;
  &-username{
    
    margin-right: 4px;
    font-weight: 500;
    color: #17181a;
  }
}
.activities{
}
.activitie{
  // padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
}
.user{
  .flex();
  font-size: 13px;
  color: #8a9aa9;
  cursor: default;
  padding: 16px 20px 0;
  &-username{
    font-weight: 600;
    font-size: 15px;
    color: #17181a;
  }
  &-avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &-msg{
    flex: 1;
    margin-left: 10px;
  }
}
.article{
  margin-left: 56px;
  padding: 6px 20px 10px;
  &-title{
    span{
      margin-right: 10px;
      padding: 3px 6px;
      display: inline-block;
      font-size: 13px;
      font-weight: 500;
      color: #007fff;
      background-color: #e5f2ff;
      border-radius: 2px;
    }
    h3{
      display: inline;
      font-size: 17px;
      color: #17181a;
      line-height: 1.5;
    }
  }
  &-content{
    .flex();
    p{
      .ov(3);
      margin: 5px 16px 5px 0;
      font-size: 15px;
      color: #5c6066;
      line-height: 1.53;
      flex: 1 1 auto;
    }
    img{
      width: 65px;
      height: 65px;
      background-color: #eee;
      border-radius: 2px;
      flex: 0 0 auto;
    }
  }
}
</style>
