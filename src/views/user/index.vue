<template>
  <main class="container">
    <div class="container-left">
      <div v-if="authorInfo" class="author">
        <div class="author-left">
          <img class="author-avatar" :src="authorInfo.avatarLarge" alt="">
          <div class="author-info">
            <div class="username">
              <span>{{authorInfo.username}}</span>
              <user-level :level="authorInfo.level" />
            </div>
            <div class="intro">
              <svg-icon name="toolbox"></svg-icon>
              <p class="intro-txt">
                <span>{{authorInfo.jobTitle}}</span>
                <span>|</span>
                <span>{{authorInfo.company}}</span>
              </p>
            </div>
            <div class="intro">
              <svg-icon name="mycard"></svg-icon>
              <p class="intro-txt">
                <span>{{authorInfo.selfDescription}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="author-right">
          <svg-icon name="github" :size="24"></svg-icon>
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
          <span v-if="item.showCount" class="tab-count">{{item.count}}</span>
          <ul v-if="item.selects && item.showSelects && item.selects.length" class="selects">
            <li
              @click.stop="chooseSelect(item1, index1, item, index)"
              :class="['select', item.selectIndex === index1 ? 'active' : '']" 
              v-for="(item1, index1) in item.selects" 
              :key="index1"
            >
              {{item1.title}}
            </li>
          </ul>
        </li>
      </ul>
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
          <p class="item-count">{{authorInfo.createdAt | date}}</p>
        </div>
      </section>
    </aside>
  </main>
</template>
<script>
import userAPI from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: ['id'],
  filters: {
    date(val) {
      return new Date(val).toLocaleDateString()
    }
  },
  data () {
    return {
      authorInfo: {},
      after: '',
      hasNextPage: true,
      tabIndex: 0,
      
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
          showCount: true
        },
        {
          title: '沸点',
          route: 'pins',
          count: 0,
          showCount: true
        },
        {
          title: '分享',
          route: 'shares',
          count: 0,
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
              count: 0,
              
            },
            {
              title: '沸点',
              route: 'praise',
              count: 0,
            },
          ]
        },
        {
          title: '小册',
          route: 'books',
          count: 0,
          showCount: true
        },
        {
          title: '更多',
          count: 0,
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
      ]
    }
  },
  created () {
    this.getAuthor()
    // this.getAuthorSection()
  },
  methods: {
    changeTab(item, index) {
      console.log(item);
      this.hideSelects()
      if(item.selects) {
        item.showSelects = !item.showSelects
      } else {
        this.tabIndex = index
        this.hideSelects('selectIndex')

        // this.selectIndex = -1
      }
    },
    chooseSelect(item1, index1, item, index){
      console.log(item1);
      item.selectIndex = index1
      this.tabIndex = index
      this.hideSelects('showSelects')
    },
    hideSelects(type) {
      console.log('hide');
      this.tabs = this.tabs.map(item => {
        if(type == 'showSelects'){
          item[type] = false
        }else{
          item[type] = -1
        }
        
        return item
      })
    },
    async getAuthor() {
      if(!this.hasNextPage)return
      try{
        let {s, d} = await userAPI.author(this.id)
        if(s === 1){
          this.authorInfo = d[this.id]
        }
      }catch(e){
        console.log(e);
      }
      console.log(this.authorInfo);
    },
    async getAuthorSection() {
      try{
        let {data} = await userAPI.authorSection(this.id, this.after)
        let items = data.ownActivityFeed.items
        this.authorInfo = items.edges
        this.hasNextPage = items.pageInfo.hasNextPage
        this.after = items.pageInfo.endCursor
      }catch(e){
        console.log(e);
      }
    },
  }
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
      font-size: 26px;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 16px;
      color: #000;
    }
  }
  &-right{
    .flex(@dir:column,@ai: flex-end);
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
    padding: 15px 0;
    text-align: center;
    cursor: pointer;
  }
}
.selects{
  position: absolute;
  top: 100%;
  width: 100%;
  padding: 2px 0;
  background-color: #fff;
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
