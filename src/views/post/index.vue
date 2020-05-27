<template>
  <div class="container ">
    <div class="detail" >
      <div class="detail-box">
        <div class="info">
          <img class="info-avatar" :src="articleInfo.user.avatarLarge" alt="">
          <div class="info-box">
            <div class="info-box-top">
              <p class="username">{{articleInfo.user.username}}</p>
              <user-level :level="3" />
            </div>
            <div class="info-box-bottom">
              <span>{{articleInfo.createdAt | dateFilter}}</span>
              <span>阅读 {{articleInfo.viewsCount}}</span>
            </div>
          </div>
            <div class="info-box-btn">关注</div>
        </div>
        <h1 class="title" >{{articleInfo.title}}</h1>
        <div class="content" v-if="articleContent" v-html="articleContent.content"></div>
        <focus-more :tags="articleInfo.tags" />
      </div>
      <div class="recommend-entry-lists">
        <p class="title">相关推荐</p>
        <common-list1 :lists="recommendEntryLists" />
      </div>
    </div>
    <aside class="aside">
      <about-author :articleInfo="articleInfo" />
      <!-- <aside-book /> -->
      <related-article :lists="relatedEntryLists" />
      <com-catalog />
    </aside>
    <left-actions 
      ref="panel" 
      :like-count="articleInfo.collectionCount" 
      :comment-count="articleInfo.commentsCount" 
      :is-like="isLike" @setgood-handler="setGood"
    />
  </div>
</template>
<script>
import aboutAuthor from '@/components/post/about-author.vue'
// import asideBook from '@/components/post/aside-book.vue'
import relatedArticle from '@/components/post/related-article.vue'
import focusMore from '@/components/post/focus-more.vue'
import comCatalog from '@/components/post/catalog.vue'
import leftActions from '@/components/post/left-actions.vue'
import commonList1 from '@/components/common/common-list1'

import postAPI from '@/api/post'
import scroll from '@/mixins/scroll'

export default {
  name: '',
  components: {
    aboutAuthor,
    // asideBook,
    relatedArticle,
    focusMore,
    comCatalog,
    leftActions,
    commonList1
  },
  mixins: [scroll],
  props: ['id'],
  filters: {
    dateFilter(val){
      return new Date(val).toLocaleDateString()
    }
  },
  data () {
    return {
      articleContent: {},
      articleInfo: {},
      relatedEntryLists: [], // 侧边相关文章
      recommendEntryLists: [], // 底部相关文章推荐
      isLike: false
    }
  },
  async created () {
    console.log(this.$utils);
    await this.getArticleContent()
    await this.getArticleInfo()
    await this.getRelatedEntry()
    await this.getRecommendEntry()
  },
  methods: {
    setGood() {
      console.log('点赞');
    },
    async getArticleContent() { // 文章主要内容
      let {s, d} = await postAPI.article({
        uid: '',
        device_id:'',
        token: '',
        src: 'web',
        type: 'entryView',
        postId: this.id
      })
      if(s === 1) {
        this.articleContent = d
      }
    },
    async getArticleInfo() { // 文章头部内容（作者，标题等）
      let {s, d} = await postAPI.article({
        uid: '',
        device_id:'',
        token: '',
        src: 'web',
        type: 'entry',
        postId: this.id
      })
      if(s === 1) {
        this.articleInfo = d
      }
    },
    async getRelatedEntry() { // 相关文章
      let {s, d} = await postAPI.relatedEntry( {
      uid: '',
      device_id: '',
      token: '',
      src: 'web',
      limit: 5,
      entryId: this.articleInfo.objectId
    })
      if(s === 1) {
        this.relatedEntryLists = d.entrylist
      }
    },
    getLists(){
      this.getRecommendEntry()
    },
    async getRecommendEntry() { // 相关推荐
      let tagIds = ''
      try{
        tagIds = this.articleInfo.tags.map(item => item.id).join('|')
      }catch{
        tagIds = ''
      }
      let last = this.recommendEntryLists.slice(-1)[0] //获取列表最后一个的 rankIndex
      let before = last ? last.rankIndex : ''
      console.log(tagIds);
      // return 
      let {s, d} = await postAPI.recommendEntry({
        uid: '',
        device_id:'', 
        token: '',
        src: 'web',
        tagIds,
        before
      })
      if(s === 1) {
        this.recommendEntryLists = this.recommendEntryLists.concat(d.entrylist)
      }
    },
  }
}
</script>
<style scoped lang="less">

.container{
  .flex(space-between);
}
/deep/ .aside{
  position: relative;
  flex: 0;
  &-box{
    width: 240px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  &-title{
    font-size: 14px;
    padding: 10px;
    .line(bottom);
  }
}
.detail{
  max-width: 700px;
  background-color: #fff;
  &-box{
    padding: 2rem;
  }
}
.title{
  margin: 30px 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.5;
}
.info{
  .flex(@ai:center);

  &-avatar{
    margin-right: 1rem;
    width: 3.333rem;
    height: 3.333rem;
    border-radius: 50%;
  }
  &-box{
    flex: 1;
    min-width: 0;
    &-top{
      .flex(@ai:center);
      .username{
        font-size: 16px;
        font-weight: bold;
        margin: 0 0.2rem 0.2rem 0;
        color: #333;
      }
    }
    &-bottom{
      font-size: 1.1rem;
      color: #909090;
      span{
        margin-right: 10px;
      }
    }
    &-btn{
      .btn-primary(#6cbd45);
    }
  }
}
/deep/ img{
  max-width: 100%;
}
/deep/ .content{
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 30px;
  a{
    color: #0269c8;
    border-bottom: 1px solid #d1e9ff;
  }
  .heading{
    padding: 12px 0;
    font-size: 24px;
    border-bottom: 1px solid #ececec;
  }
  pre{
    position: relative;
    line-height: 1.75;
    padding: 18px 15px 12px;
    overflow-x: auto;
    color: #333;
    background: #f8f8f8;
    code{
      font-family: Menlo,Monaco,Consolas,Courier New,monospace;
      font-size: 12px;
      
      .hljs{
        &-keyword{
          font-weight: 700;
        }
        &-title{
          color: #458;
        }
        &-comment{
          color: #998;
        }
        &-string{
          color: #d14
        }
      }
    }
  }
}
.recommend-entry-lists{
  .line(@dir:top,@width: 30px);
  .title{
    font-size: 16px;
    padding: 1rem 2rem;
    margin: 0;
        color: #909090;
    border-bottom: 1px solid rgba(178,186,194,.15);
  }
}

</style>
