<template>
  <div class="container ">
    <div class="detail container-left" >
      <div class="detail-box">
        <div class="info">
          <router-link target="_blank" :to="'/user/' + (articleInfo.user && articleInfo.user.objectId)">
            <img class="info-avatar" :src="articleInfo.user && articleInfo.user.avatarLarge" alt="">
          </router-link>
          <div class="info-box">
            <router-link target="_blank" class="info-box-top" :to="'/user/' + (articleInfo.user && articleInfo.user.objectId)">
              <p class="username">{{articleInfo.user && articleInfo.user.username}}</p>
              <user-level :level="3" />
            </router-link>
            <div class="info-box-bottom">
              <span>{{$_toLocaleDateString(articleInfo.createdAt) }}</span>
              <span>阅读 {{articleInfo.viewsCount}}</span>
            </div>
          </div>
          <c-button type="success cutout" >关注</c-button>
        </div>
        <h1 class="title" >{{articleInfo.title}}</h1>
        <div class="html-content" v-if="articleContent" v-html="articleContent.content"></div>
        <focus-more :tags="articleInfo.tags || []" />
      </div>
      <div  id="comments">
        <h3 class="">评论</h3>
        <comment-list :lists="comments" :id="articleContent.entryId" />
        <div @click="getComments" class="more">查看更多&nbsp;&gt;</div>
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
      <com-catalog :pid="id" />
    </aside>
    <left-actions 
      ref="panel" 
      :like-count="articleInfo.collectionCount" 
      :comment-count="articleInfo.commentsCount" 
      :is-like="isLike" @setgood-handler="setGood"
    />
  </div>
</template>
<script lang="ts">
import{objType}from '@/types/commons'
import {stateType} from '@/types/post'


import aboutAuthor from '@/components/post/about-author.vue'
// import asideBook from '@/components/post/aside-book.vue'
import relatedArticle from '@/components/post/related-article.vue'
import focusMore from '@/components/post/focus-more.vue'
import comCatalog from '@/components/post/catalog.vue'
import leftActions from '@/components/post/left-actions.vue'
import commonList1 from '@/components/common/common-list1.vue'

import postAPI from '@/api/post'
import scroll from '@/mixins/scroll'
import {$_toLocaleDateString} from '@/filters'
import { reactive, toRefs,ref, onMounted, watch } from 'vue'

export default {
  components: {
    aboutAuthor,
    // asideBook,
    relatedArticle,
    focusMore,
    comCatalog,
    leftActions,
    commonList1
  },
  props: ['id'],
  setup(props: objType) {
    let state: stateType = reactive({
      articleContent: {},
      articleInfo: {},
      relatedEntryLists: [], // 侧边相关文章
      recommendEntryLists: [], // 底部相关文章推荐
      isLike: false,
      isLoading: false,
      comments: []
    })

    let setGood = () => {
      console.log('点赞');
    }

    let getArticleContent = async():Promise<void> => { // 文章主要内容
      try {
        let {s, d} = await postAPI.article({
          uid: '',
          device_id:'',
          token: '',
          src: 'web',
          type: 'entryView',
          postId: props.id
        })
        if(s === 1) {
          state.articleContent = d
        }
      } catch (e) {
        console.log(e)
      }
    }
    let getArticleInfo = async():Promise<void> => { // 文章头部内容（作者，标题等）
      try {
        let {s, d} = await postAPI.article({
          uid: '',
          device_id:'',
          token: '',
          src: 'web',
          type: 'entry',
          postId: props.id
        })
        if(s === 1) {
          state.articleInfo = d
        }
      } catch (e) {
        console.log(e)
      }
    }
    let getComments = async():Promise<void> => { //评价
      let createdAt: string = ''
      let len: number = state.comments.length
      try {
        createdAt = state.comments[len-1].createdAt
      } catch (e) {
        createdAt = ''
      }
      if(len >= state.count) return
      try {
        let {s ,d} = await postAPI.comments({
          entryId: state.articleContent.entryId, 
          createdAt,
          pageSize: 10,
          rankType: 'new'
        })
        if(s === 1) {
          state.comments = state.comments.concat(d.comments)
          state.count = d.count
        }
      } catch (e) {
        console.log(e)
      }
    }
    let getRelatedEntry = async():Promise<void> => { // 相关文章
      try {
        let {s, d} = await postAPI.relatedEntry({
          uid: '',
          device_id: '',
          token: '',
          src: 'web',
          limit: 5,
          entryId: state.articleInfo.objectId
        })
        if(s === 1) {
          state.relatedEntryLists = d.entrylist
        }
      }catch(e) {
        console.log(e);
      }
    }
    let getLists = (): void => {
      getRecommendEntry()
    }
    let getRecommendEntry = async():Promise<void> => { // 相关推荐
      if(state.isLoading) return
      state.isLoading = true
      let tagIds: string = ''
      try{
        tagIds = state.articleInfo.tags.map(item => item.id).join('|')
      }catch{
        tagIds = ''
      }
      let last = state.recommendEntryLists.slice(-1)[0] //获取列表最后一个的 rankIndex
      console.log(last);
      let before: string = last ? last.rankIndex : ''
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
          state.recommendEntryLists = state.recommendEntryLists.concat(d.entrylist)
        }
        state.isLoading = false
      } catch (e) {
        state.isLoading = false
      }
    }
    const panel = ref(null) // 获取模板元素 panel
    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getRecommendEntry()
      }
    )
    onMounted(async():Promise<void>=>{
      await getArticleContent()
      await getComments()
      await getArticleInfo()
      await getRelatedEntry()
      await getRecommendEntry()
      if (location.hash.includes('#comment')) {
        panel.value.scrollIntoComment()
      }
    })

    return {
      $_toLocaleDateString,
      ...toRefs(state),
      setGood,
      getComments,
      getLists,
      panel
    }
  },
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
#comments{
  color: #8a9aa9;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  padding: 0 0 5px ;
  h3{
    padding: 10px 0 ;
  }
  .more{
    padding: 10px 0;
    font-size: 13px;
    text-align: center;
    color: #406599;
    cursor: pointer;
    user-select: none;
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
