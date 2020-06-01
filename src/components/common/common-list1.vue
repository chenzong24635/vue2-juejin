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
            <p class="flag dot">{{list.createdAt}}</p>
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
          <router-link
            target="_blank"
            :to="'/post'+list.originalUrl.replace(/https:\/\/juejin.im\/post/i,'')" 
            class="list-title">{{list.title}}</router-link>
          <ul class="list-icons" >
            <li class="list-icon">
              <div class="icon-box">
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" alt="">
                <span class="icon-num">{{list.likeCount}}</span>
              </div>
              <router-link :to="'/post'+list.originalUrl.replace(/https:\/\/juejin.im\/post/i,'')+'#comment'"  class="icon-box">
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt="">
                <span class="icon-num">{{list.commentsCount}}</span>
              </router-link>
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

export default {
  name: 'homeList',
  components: {},
  props: {
    lists: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'home'
    },
    hasNextPage: { //是否有下一页
      type: Boolean,
      default: true
    },
  },
  computed: {
    listsNew: {
      get (){
        let arr = this.lists.map(item => {
          if(item.node){
            item.node.createdAt = this.$utils.dateDis(item.node.createdAt)
            return item.node
          }else {
            item.createdAt = this.$utils.dateDis(item.createdAt)
            return item
          }  
        })
        return arr
      }
    }
  },
  data () {
    return {
      scrollTop: 0, //当前滚动位置，判断上下滚动
      defaultScreenshot: "https://b-gold-cdn.xitu.io/images/weibo-share.png"
    }
  },
  created(){
  },
  methods: {
    changeShow (obj, type) { //鼠标移入移出时，分享图标显示隐藏
      if(type / 1 === 1){
        this.$set(obj, 'uploadIconShow', true)
      }else{
        !obj.uploadBoxShow && this.$set(obj, 'uploadIconShow', false)
      }
    },
    share(obj) { //显示分享框
      this.$set(obj, 'uploadBoxShow', !obj.uploadBoxShow)
    },
    shareWb(obj) { // 点击分享到微薄
      let title = obj.title + '-' + obj.user.username + '- 掘金专栏';
      let href = `
        http://service.weibo.com/share/share.php?url=
        ${obj.originalUrl}&sharesource=weibo&title=${title}
        &pic=${obj.screenshot ? encodeURIComponent(obj.screenshot) : encodeURIComponent(this.defaultScreenshot)}
        &sudaref=juejin.im&display=0&retcode=6102#_loginLayer_1587971734906
      `;
      window.open(href)
    },
  }
}
</script>
<style scoped lang="less">
.list{
  /* max-width: 700px;
  width: 100%; */
  // width: 700px;
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: #fff;
  color: #b2bac2;
  cursor: pointer;
  .flex(@jc: space-between,@ai: center);
  .line(bottom);
  &-cnt{width: 100%;.ov();}
  &-img{
        flex: 0 0 auto;
    width: 5rem;
    height: 5rem;
    margin-left: 2rem;
    background-color: #fff;
    border-radius: 2px;
  }
  .zl{
    font-weight: 500;
    color: #b71ed7;
  }
  &-title{
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
    margin: .5rem 0 1rem;
    .ov();
  }
  &-flags{
    .flex();
  }
  .dot{
    .delimiter('·');
    .flex();
  }
  .slash{
    .delimiter()
  }
  &-icons{
    .list-icon{
      .flex(@ai: center);
      .icon-box{
        .flex(@ai: center);
        .border(@bcolor:#edeeef);
        position: relative;
        padding: 0 .6rem;
        height: 2rem;
        cursor: pointer;
        &:hover{
          color: inherit;
          background-color: #f7f8fa;
          // opacity: .8;
        }
        // margin-right: 2rem;
      }
      .icon-box+.icon-box{
        border-left: none;
      }
    }
  }
}
.icon-upload{
  .share{
    position: absolute;
    top: 100%;
    left: -1px;
    margin-top: 1rem;
    width: 11rem;
    padding: .5rem 1.2rem;
    font-size: 1.167rem;
    color: #8f969c;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 #e0e4e9;
    z-index: 10;
    .border();
  }
  .share+.share{
    border-bottom: 1px solid #eee;
  }
}
</style>
