<template>
  <div  class="comment" >
    <router-link target="_blank" :to="'/user/' + list.userInfo.objectId">
      <img :src="list.userInfo && list.userInfo.avatarLarge || 'https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg'" alt="" class="avatar">
    </router-link>
    <div class="comment-box">
      <p class="user">
        <router-link 
          target="_blank"
          :to="'/user/' +list.userInfo.objectId" 
          class="user-name">{{list.userInfo && list.userInfo.username}}</router-link >
        <user-level :level="list.userInfo&&list.userInfo.level" />
        <span class="user-job">{{list.userInfo && list.userInfo.jobTitle}}</span>
      </p>
      <div class="content">
        <div class="cnt">
          <div v-if="list.respUserInfo" class="response">
            <span>回复</span>
            <router-link 
              target="_blank"
              :to="'/user/' +list.respUserInfo.objectId" 
              class="user-name">{{list.respUserInfo && list.respUserInfo.username}}: </router-link >
          </div>
          <span>{{list.content}}</span>
        </div>
        <ul v-if="list.picList.length" class="pics">
          <li v-for="(pic, picIndex) in list.picList" :key="picIndex" class="pic">
            <img :src="pic" alt="">
          </li>
        </ul>
      </div>
      <article-actions1 :date="list.createdAt" />

    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
}
</script>
<style scoped lang="less">
.comment{
  .flex();
  font-size: 13px;
  padding: 5px 10px;
  .avatar{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }

  &-box{
    flex: 1;
    .flex(@dir:column);
    .user{
      &-name{
        display: inline-block;
        margin-right: 5px;
      }
      &-job{
        margin-left: 5px;
        color: #8a9aa9;
      }
    }
    .content{
      margin: 10px 0;
      .response{display: inline-block;}
      .cnt{
        font-size: 13px;
        word-wrap: break-word;
        white-space: pre-wrap;
        color: #505050;
        overflow: hidden;
        text-align: left;
        a{
          color: #406599;
          margin-left: 4px;
        }
      }
    }
  }
}
.pic{
  img{
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
}
</style>
