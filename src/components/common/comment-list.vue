<template>
  <!-- 评论列表 -->
  <ul class="comments">
    <li
      class="comment"
      v-for="item in lists"
      :key="item.id"
    >
      <img :src="item.userInfo && item.userInfo.avatarLarge" alt="" class="avatar">
      <div class="comment-box">
        <div class="box-top">
          <p class="user">
            <span class="user-name">{{item.userInfo && item.userInfo.username}}</span>
            <span class="user-job">{{item.userInfo && item.userInfo.jobTitle}}</span>
          </p>
          <div class="box-content">
            <p class="cnt">{{item.content}}</p>
            <ul v-if="item.picList.length" class="pics">
              <li v-for="(pic, picIndex) in item.picList" :key="picIndex" class="pic">
                <img :src="pic" alt="">
              </li>
            </ul>
          </div>
        </div>
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
.comments{
  padding: 10px 10px 10px 80px;
}
.comment{
  .flex();
  .avatar{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

}
.box{
  &-top{
    .flex(@dir:column);
    .user{
      &-job{
            color: #8a9aa9;
      }
    }
  }
}
.pic{
  img{
    width: 80px;
    height: 80px;
  }
}
</style>
