<template>
  <div class="container ">
    <div class="detail container-left" >
      <div class="detail-box">
        <div class="info">
          <img class="info-avatar" :src="articleInfo.user ? articleInfo.user.avatarLarge : ''" alt="">
          <div class="info-box">
            <div class="info-box-top">
              <p class="username">{{articleInfo.user ? articleInfo.user.username : ''}}</p>
              <user-level :level="3" />
            </div>
            <div class="info-box-bottom">
              <span>{{articleInfo.createdAt | dateFilter}}</span>
              <span>阅读 {{articleInfo.viewsCount}}</span>
            </div>
          </div>
          <c-button type="success cutout" >关注</c-button>
        </div>
        <h1 class="title" >{{articleInfo.title}}</h1>
        <div class="html-content" v-if="articleContent" v-html="articleContent.content"></div>
        <focus-more :tags="articleInfo.tags || []" />
      </div>
      <div class="recommend-entry-lists">
        <p class="title">相关推荐</p>
        <common-list1 :lists="recommendEntryLists" />
      </div>
    </div>
    <aside class="aside container-right">
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
      isLike: false,
      isLoading: false,
    }
  },
  async created () {
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
      if(this.isLoading) return
      this.isLoading = true
      let tagIds = ''
      try{
        tagIds = this.articleInfo.tags.map(item => item.id).join('|')
      }catch{
        tagIds = ''
      }
      let last = this.recommendEntryLists.slice(-1)[0] //获取列表最后一个的 rankIndex
      let before = last ? last.rankIndex : ''
      try {
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
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },
  }
}
</script>
<style scoped lang="less">

.container{
  .flex(space-between);
  padding-top: 30px;
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
