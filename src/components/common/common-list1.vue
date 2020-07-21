<template>
  <div class="">
    <!-- 首页-文章列表 -->
    <slot></slot>
    <ul class="lists" >
      <li class="list" v-for="list in listsNew" :key="list.id"
        @mouseenter="changeShow(list,1)" 
        @mouseleave="changeShow(list,2)"
      >
        <div class="list-cnt">
          <div class="list-flags">
            <p class="flag dot zl">专栏</p>
            <p class="flag dot">{{list.user.username}}</p>
            <!-- <p class="flag dot">{{list.createdAt }}</p> -->
            <p class="flag dot">{{$_dateDis(list.createdAt)}}</p>
            <p class="dot">
              <router-link 
                :to="'/tag/'+ encodeURIComponent(tag.title)" 
                class="slash" 
                v-for="tag in list.tags" 
                :key="tag.id"
                target="_blank"
              >
                {{tag.title}}
              </router-link>
            </p>
          </div>
          <div @click="toPost(list.originalUrl)" class="list-title">{{list.title}}</div>
          <ul class="list-icons" >
            <li class="list-icon">
              <div class="icon-box" @click="showLoginModel">
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" alt="">
                <span class="icon-num">{{list.likeCount}}</span>
              </div>
              <div @click="toPost(list.originalUrl,'#comments')" class="icon-box">
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt="">
                <span class="icon-num">{{list.commentsCount}}</span>
              </div>
              <div @click="share(list)" v-show="list.uploadIconShow" class="icon-box icon-upload" title="分享">
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/share.1d55e69.svg" alt="">
                <div @click="shareWb(list)" v-show="list.uploadBoxShow" class="share">
                  <svg-icon name="weibo" :size="20"></svg-icon>
                  <span>微博</span>
                </div>
              </div>
              <div v-show="list.uploadIconShow&&type==='tag'" class="icon-box" title="收藏">
                <svg-icon name="collect" :size="14"></svg-icon>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="list.screenshot" class="list-img">
          <img :src="list.screenshot" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {$_dateDis} from '@/filters'

import commonList from '@/mixins/commonList.js'
export default {
  mixins: [commonList],
  setup() {
    return {
      $_dateDis
    }
  }
}
</script>
<style scoped lang="less">
@import '../../assets/css/commonList.less';

</style>