<template>
  <div class="article-suspended-panel">
    <ul class="btn-list">
      <li class="panel-btn panel-btn-count" :class="[isLike ? 'panel-like-btn--active' : 'panel-like-btn']" @click="prasie" :data-count="likeCount">
      </li>
      <li class="panel-btn panel-comment-btn panel-btn-count" @click="scrollIntoComment" :data-count="commentCount">
        <router-link style="height:100%" :to=" '#comment'"></router-link>
      </li>
      <li class="panel-btn panel-collect-btn" @click="collect">
      </li>
      <li class="panel-share-title">分享</li>
      <li class="panel-btn panel-weibo-btn" @click="weiboShare">
      </li>
      <li class="panel-btn panel-qq-btn" @click="qqShare">
      </li>
      <li class="panel-btn panel-wx-btn" >
      </li>
    </ul>
  </div>
</template>

<script>
import {  mapActions } from 'vuex'
export default {
  props: {
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  // computed: {
  //   ...mapState([
  //     'isTopbarBlock'
  //   ])
  // },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    ...mapActions([
      'showLoginModel'
    ]),
    prasie() {
      this.showLoginModel().then(res=>{
        res && this.$emit('setgood-handler')
      })
    },
    collect() {
      this.showLoginModel()/* .then(res=>{
        res && this.$emit('setgood-handler')
      }) */
    },
    // 跳转到评论区
    scrollIntoComment() {
      let offsetTop = document.querySelector('#comments').offsetTop
      window.scrollTo({
        top: offsetTop
      })
    },
    // qq分享
    qqShare() {
      let info = this.$parent.articInfo
      if (info && info.originalUrl) {
        let title = `${info.title} - ${info.user.username} - 掘金专栏`
        let url = info.originalUrl
        let summary = info.content
        let pic = encodeURIComponent(info.screenshot || 'https://user-gold-cdn.xitu.io/2019/11/29/16eb707805061e9e?w=1000&h=675&f=jpeg&s=99661')
        window.open(`https://connect.qq.com/widget/shareqq/index.html?title=${title}&url=${url}&summary=${summary}&pics=${pic}&site=掘金`, '_blank', 'noopener noreferrer')
      }
    },
    // 微博分享
    weiboShare() {
      let info = this.$parent.articInfo
      if (info && info.originalUrl) {
        let title = `${info.title} - ${info.user.username} - 掘金专栏`
        let url = info.originalUrl
        let pic = encodeURIComponent(info.screenshot || 'https://user-gold-cdn.xitu.io/2019/11/29/16eb707805061e9e?w=1000&h=675&f=jpeg&s=99661')
        window.open(`https://service.weibo.com/share/share.php?title=${title}&url=${url}&pic=${pic}`, '_blank', 'noopener noreferrer')
      }
    }
  },
}
</script>

<style lang='less' scoped>
.article-suspended-panel{
  position: fixed;
  top: 200px;
  margin-left: -70px;

  .btn-list{
    font-size: 12px;
    text-align: center;
  }

  .panel-share-title{
    margin: 30px 0 12px;
    color: #c6c6c6;
  }

  .panel-btn{
    position: relative;
    width: 36px;
    height: 36px;
    margin-bottom: 12px;
    border-radius: 50%;
    background-color: #fff;
    background-repeat: no-repeat;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
    cursor: pointer;

    &.panel-like-btn{
      
      background-position: 53% 46%;
      background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/zan.b4bb964.svg);
      &:hover{
        background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/zan-hover.91657d6.svg);
      }
    }

    &.panel-comment-btn{
      background-position: 50% 55%;
      background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/comment.7fc22c2.svg);

      &:hover{
        background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/comment-hover.1074e67.svg);
      }
    }

    &.panel-collect-btn{
      background-position: 50%;
      background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/collect.1db122b.svg);

      &:hover{
        background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/collect-hover.5d446a7.svg);
      }
    }

    &.panel-weibo-btn{
      background-position: 50%;
      background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/weibo.2076a57.svg);

      &:hover{
        background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/weibo-hover.9abf502.svg);
      }
    }

    &.panel-qq-btn{
      background-position: 50%;
      background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/qq.0834411.svg);

      &:hover{
        background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/qq-hover.d11dd84.svg);
      }
    }

    &.panel-wx-btn{
      background-position: 50%;
      background-image:url(https://b-gold-cdn.xitu.io/v3/static/img/wechat.63e1ce0.svg);
      &:hover{
        background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/wechat-hover.c8ce019.svg)
      }
    }

    &.panel-btn-count:after{
      content: attr(data-count);
      position: absolute;
      top: 0;
      left: 75%;
      padding: 1px 4px;
      font-size: 12px;
      text-align: center;
      line-height: 1;
      white-space: nowrap;
      color: #fff;
      background-color: #b2bac2;
      border-radius: 8px;
      transform-origin: left top;
      transform: scale(.75);
    }

    &.panel-like-btn--active{
      background-position: 53% 46%;
      background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/zan-active.337b9a0.svg);

      &:after{
        color: #fff;
        // background-color: $success-2;
      }
    }
  }
}
</style>