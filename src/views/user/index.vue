<template>
  <main class="container">
    <div class="container-left">
      <div v-if="authorInfo" class="author">
        <div class="author-left">
          <img class="author-avatar" :src="authorInfo.avatarLarge || ''" alt="">
          <div class="author-info">
            <div class="username">
              <span>{{authorInfo.username}}</span>
              <user-level :level="authorInfo.level" />
            </div>
            <div class="intro">
              <svg-icon name="toolbox" color="#72777b"></svg-icon>
              <p class="intro-txt">
                <span>{{authorInfo.jobTitle}}</span>
                <span>|</span>
                <span>{{authorInfo.company}}</span>
              </p>
            </div>
            <div class="intro">
              <svg-icon name="mycard"  color="#72777b"></svg-icon>
              <p class="intro-txt">
                <span>{{authorInfo.selfDescription}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="author-right">
          <a target="_blank" v-if="authorInfo.community && authorInfo.community.github" :href="'https://github.com/'+authorInfo.community.github.username">
            <svg-icon name="github" :size="24"></svg-icon>
          </a>
          <a target="_blank" v-if="authorInfo.blogAddress " :href="authorInfo.blogAddress">
            <svg-icon name="zhihu" :size="24"></svg-icon>
          </a>
          <c-button type="success cutout" :size="20">关注</c-button>
        </div>
      </div>
      <ul class="tabs">
        <li 
          @click="changeTab(item, index)"
          :class="['tab', tabIndex === index ? 'active' : '']" 
          v-for="(item, index) in tabs" 
          :key="index"
        >
          <span class="tab-title">{{item.title}}</span>
          <!-- <span v-if="item.showCount" class="tab-count">{{item.count}}</span> -->
          <ul v-if="item.selects && item.showSelects && item.selects.length" class="selects">
            <li
              v-for="(item1, index1) in item.selects" 
              @click.stop="chooseSelect(item1, index1, item, index)"
              :class="['select', item.selectIndex === index1 ? 'active' : '']" 
              :key="index1"
            >
              {{item1.title}}
              <!-- <span v-if="item.showCount">{{item1.count}}</span> -->
            </li>
          </ul>
        </li>
      </ul>
      <activities-list
        v-if="tabIndex === 0"
        :lists="lists" 
        :username="authorInfo.username" 
      />
      <posts-list
        v-else-if="tabIndex === 1"
        :lists="lists" 
      />
      <pins-list
        v-else-if="tabIndex === 2"
        :lists="lists" 
      />
      <shares-list
        v-else-if="tabIndex === 3"
        :lists="lists" 
      />
    </div>
    <aside class="container-right">
      <section class="aside-box aside-box1">
        <p class="title">个人成就</p>
        <div class="item">
          <svg-icon name="praise" :size="25"></svg-icon>
          <span>获得点赞{{authorInfo.totalCollectionsCount}}</span>
        </div>
        <div class="item">
          <svg-icon name="eye" :size="25"></svg-icon>
          <span>文章被阅读{{authorInfo.totalViewsCount}}</span>
        </div>
        <div class="item">
          <svg-icon name="dig" :size="25"></svg-icon>
          <span>掘力值{{authorInfo.juejinPower}}</span>
        </div>
      </section>
      <section class="aside-box aside-box2">
        <div class="item">
          <p>关注了</p>
          <p class="item-count">{{authorInfo.followeesCount}}</p>
        </div>
        <div class="item">
          <p>关注者</p>
          <p class="item-count">{{authorInfo.followersCount}}</p>
        </div>
      </section>
      <section class="aside-box aside-box3">
        <div class="item">
          <p class="item-title">收藏集</p>
          <p class="item-count">{{authorInfo.purchasedBookletCount}}</p>
        </div>
        <div class="item">
          <p class="item-title">关注标签</p>
          <p class="item-count">{{authorInfo.subscribedTagsCount}}</p>
        </div>
        <div class="item">
          <p class="item-title">加入于</p>
          <p class="item-count">{{$_toLocaleDateString(authorInfo.createdAt)}}</p>
          <!-- <p class="item-count">{{authorInfo.createdAt | date}}</p> -->
        </div>
      </section>
    </aside>
  </main>
</template>
<script lang="ts">

interface propsType{
  id: string,
  title: string
}
interface tabsType{
  title: string,
  route: string,
  showCount: boolean,
  [name: string]: any
}
interface tabsSelectsType{
  title: string,
  route: string,
  type?: string,
  count?: number,
}


import activitiesList from '@/components/user/activitiesList.vue'
import postsList from '@/components/user/postsList.vue'
import pinsList from '@/components/user/pinsList.vue'
import sharesList from '@/components/user/sharesList.vue'
import userAPI from '@/api/user'
import scroll from '@/mixins/scroll'
import { reactive, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { $_toLocaleDateString } from '@/filters';

export default {
  name: '',
  components: {
    activitiesList,
    postsList,
    pinsList,
    sharesList,
  },
  props: ['id','title'],
  setup (props: propsType) {
    let state = reactive({
      authorInfo: {},
      after: '',
      isLoading: false,
      hasNextPage: true,
      tabIndex: 0,
      numbers: {
        postedPostsCount: 0, //专栏数
        pinCount: 0, //沸点数
        postedEntriesCount: 0, //分享数
        collectedEntriesCount: 0, //zan-文章数
        likedPinCount: 0, //zan-沸点数
        purchasedBookletCount: 0, //小册数
      },
      tabs: [
        {
          title: '动态',
          route: 'activities',
          showCount: false
        },
        {
          title: '专栏',
          route: 'posts',
          count: 0,
          type: 'postedPostsCount',
          showCount: true
        },
        {
          title: '沸点',
          route: 'pins',
          count: 0,
          type: 'pinCount',
          showCount: true
        },
        {
          title: '分享',
          route: 'shares',
          count: 0,
          type: 'postedEntriesCount',
          showCount: true
        },
        {
          title: '赞',
          route: 'shares',
          count: 0,
          showCount: true,
          showSelects: false,
          selectIndex: -1,
          selects: [
            {
              title: '文章',
              route: 'likes',
              type: 'collectedEntriesCount',
              count: 0,
              
            },
            {
              title: '沸点',
              route: 'praise',
              type: 'likedPinCount',
              count: 0,
            },
          ]
        },
        {
          title: '小册',
          route: 'books',
          count: 0,
          type: 'purchasedBookletCount',
          showCount: true
        },
        {
          title: '更多',
          showCount: false,
          showSelects: false,
          selectIndex: -1,
          selects: [
            {
              title: '收藏集',
              route: 'collections'
            },
            {
              title: '关注',
              route: 'tags'
            },
          ]
        },
      ],
      lists: [],
    })

    
    let router = useRouter()
    let routeTo = (route: string,):void => {
      router.push(`/user/${props.id}/${route}`)
    }
    /** 
     * @parmas {String} type:showSelects 有下拉框；type:selectIndex 其他
     */
    let hideSelects = (type:string):void => {
      console.log('hide');
      if(type === 'showSelects') {
        // 设置所有下拉框 未选中
        state.tabs.forEach(item => {
          (item.showSelects !== 'undefined') && (item[type] = false)
        })
      }else if(type === 'selectIndex'){
        state.tabs.forEach(item => {
          (item.selectIndex !== 'undefined') && (item[type] = -1)
        })
      }else{
        state.tabs.forEach(item => {
          if(item.showSelects !== 'undefined'){
            item['showSelects'] = false
          }
          if(item.selectIndex !== 'undefined'){
            item['selectIndex'] =  -1
          }
        })
      }
    }
    let reset = ():void => {
      state.lists = [];
      state.after = '';
      state.hasNextPage = true;
      state.isLoading = false;
      
    }
    let getLists = async():Promise<void> => {
      if(state.isLoading) return
      state.isLoading = true
      let listArr = [
        getActivities(),
        getPosts(),
        getPins(),
        getShares(),
        getLikes(),
        getPraise(),
        getBooks(),
        getCollections(),
        getTags(),
      ]
      console.log(state.tabIndex)
      listArr[state.tabIndex]
      
    }
    let getAuthor = async():Promise<void> => { // 用户信息
      if(!state.hasNextPage)return
      try{
        let {s, d} = await userAPI.author(props.id)
        if(s === 1){
          state.authorInfo = d[props.id]
        }
      }catch(e){
        console.log(e);
      }
      console.log(state.authorInfo);
    }
    let getActivities = async():Promise<void> => { //动态
      if(!state.hasNextPage)return
      try{
        let {data} = await userAPI.activities(props.id, state.after)
        let items = data.ownActivityFeed.items
        state.lists = state.lists.concat(items.edges)
        state.hasNextPage = items.pageInfo.hasNextPage
        state.after = items.pageInfo.endCursor
        state.isLoading = false
        
        console.log(items);
      }catch(e){
        console.log(e);
      }
    }
    let getPosts = async():Promise<void> => { //专栏
      try{
        let {s, d} = await userAPI.posts(props.id)
        if(s === 1) {
          state.lists = d.entrylist
          state.isLoading = false
        }
      }catch(e){
        console.log(e);
      }
    }
    let getPins = async():Promise<void> => { //沸点
      try{
        let {s, d} = await userAPI.pins(props.id, state.after)
        if(s === 1) {
          state.lists = d.list
          state.isLoading = false
        }
      }catch(e){
        console.log(e);
      }
    }
    let changeTab = (item: tabsType, index: number):void => {
      if(item.selects) {
        hideSelects('showSelects')
        item.showSelects = !item.showSelects
      } else {
        hideSelects('')
        state.tabIndex = index
        routeTo(item.route)
        reset()
        getLists()
      }
    }
    let chooseSelect = (item1:tabsSelectsType, index1:number, item:tabsType, index:number):void =>{
      // 设置当前下拉框 选中
      hideSelects('')
      item.selectIndex = index1
      state.tabIndex = index
      reset()
      routeTo(item1.route)
      getLists()
    }
    let getShares = async():Promise<void> => { //分享
    }
    let getLikes = async():Promise<void> => { //赞-文章
    }
    let getPraise = async():Promise<void> => { //赞-沸点
    }
    let getBooks = async():Promise<void> => { //小册
    }
    let getCollections = async():Promise<void> => { //收藏集
    }
    let getTags = async():Promise<void> => { //关注
    }
    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )
    onMounted(()=>{
      getAuthor()
      // 根据路由切换tab
      state.tabs.some((item: tabsType, index: number) => {
        if(item.selects) {
          return item.selects.some((item1:tabsSelectsType) => {
            if(item1.route === state.title){
              state.tabIndex = index
              return true
            }
          })
        }else{
          if(item.route === state.title){
            state.tabIndex = index
            return true
          }
        }
      })
      getLists()
    })
    return {
      $_toLocaleDateString,
      ...toRefs(state),
      getActivities,
      getPosts,
      getPins,
      changeTab,
      chooseSelect,
      getShares,
      getLikes,
      getPraise,
      getBooks,
      getCollections,
      getTags
    }
  },
}
</script>
<style scoped lang="less">
.container{
  .flex(space-between);
  margin-top: 20px;
  font-size: 15px;
}

.author{
  .flex(space-between,center);
  padding: 30px;
  background-color: #fff;
  &-avatar{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-right: 30px;
  }
  &-left{
    .flex();
    .intro{
      .flex();
      line-height: 1.5;
      color: #72777b;
      &-txt{
        &>span{
          padding-left: 6px;
        }
      }
    }
  }
  &-info{
    .username{
      .flex();
      font-size: 26px;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 16px;
      color: #000;
      span{
        line-height: 1;
        margin-right: 4px;
      }
    }
  }
  &-right{
    .flex(@dir:column,@ai:flex-end,@jc: flex-end);
    align-self: stretch;
    margin-left: 10px;
    button{
      margin-top: 25px;
    }
  }
  
}
.tabs{
  .flex();
  .line(bottom);
  margin-top: 10px;
  background-color: #fff;
  .tab{
    position: relative;
    flex: 0 0 auto;
    width: 75px;
    height: 50px;
    line-height: 50px;
    // padding: 15px 0;
    text-align: center;
    cursor: pointer;
    &.active{
      .line(@dir:bottom,@width:2px,@c: @mainColor)
    }
  }
}
.selects{
  .border();
  position: absolute;
  top: 100%;
  width: 100%;
  padding: 2px 0;
  background-color: #fff;
  line-height: 1.5;
  .select{
    padding: 5px 10px;
    color: #000;
    &.active{
      color: @mainColor;
    }
  }
}

.aside-box{
  margin-bottom: 10px;
  background-color: #fff;
  .title{
    padding: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #31445b;
    .line(bottom);
  }
}
.aside-box1 .item{
  .flex(@ai:center);
  padding: 8px 15px;
  font-size: 15px;
  color: #000;
  span{
    padding-left: 12px;
  }
}
.aside-box2{
  .flex();
  padding: 15px 0;
  .item + .item{
    .line(left);
  }
  .item{
    flex: 1 1 auto;
    text-align: center;
    color: #31445b;
    &-count{
      font-weight: bold;
    }
  }
}
.aside-box3 {
  background-color: inherit;
  .item{
    .flex(space-between);
    .line(bottom);
    
    padding: 10px 5px;
  }
}
</style>
