<template>
  <main class="container book">
    <div class="book-card">
      <div class="info" v-if="bookDesc">
        <img :src="bookDesc.img" alt="" class="info-img">
        <div class="info-box">
          <h2 class="info-title">{{bookDesc.title}}</h2>
          <div class="info-desc">{{bookDesc.desc}}</div>
          <div class="info-author ov1">
            <router-link target="_blank" :to="'/user/'+bookDesc.userData && bookDesc.userData.uid">
              <img :src="bookDesc.userData && bookDesc.userData.avatarLarge" alt="" class="avatar">
              <span class="info-author-username">{{bookDesc.userData && bookDesc.userData.username}}</span>
            </router-link>
            <user-level :level="bookDesc.userData && bookDesc.userData.level" />
            <span class="info-author-profile ov1">{{bookDesc.profile}}</span>
          </div>
          <div class="btns">
            <c-button type="primary" :size="20">购买 ￥{{bookDesc.price}}</c-button>
            <c-button  :size="20">试读</c-button>
          </div>
        </div>
      </div>
      <div class="buyers-box">
        <div class="label">
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/buy-icon.1323aad.svg" alt="√" >
          <p>{{bookDesc.buyCount}}人已购买</p>
        </div>
        <ul class="buyers ov1">
          <li v-for="buyer in buyers" :key="buyer.id">
            <router-link target="_blank" :to="'/user/'+buyer.id">
              <img :src="buyer.avatarLarge || 'https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg'" alt="">
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="book-card">
      <c-tabs 
        :tabs="tabs"
        @changed="tabChange"
      />
      <div class="book-content">
        <h3 class="book-content-title">小册内容</h3>
        <ul class="sections">
          <li 
            class="section"
            v-for="(item, index) in bookSections"
            :key="item._id"
          >
            <router-link to="">
              <div class="step">
                <div class="step-btn">{{index + 1}}</div>
              </div>
              <div class="section-cnt">
                <div class="section-title">{{item.title}}</div>
                <div class="section-read">
                  <span class="time">时长：{{item.contentSize | read}}</span>
                  <span v-if="item.pv" class="pv">{{item.pv}}次学习</span>
                  <span v-if="item.commentCount" class="comment">{{item.commentCount}}条评论</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="book-introduce html-content" v-html="bookDesc.summaryHtml">

      </div>
    </div>
    <!-- <div class="book-card">
      <h3 class="book-card-title">推荐更多小册</h3>
    </div> -->

    <!-- https://juejin.im/book/59e414a5518825541b03ce66 -->
    <!-- https://juejin.im/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022 -->
  </main>
</template>
<script>
import bookAPI from '@/api/books.js'
export default {
  name: '',
  components: {},
  props: ['id'],
  data () {
    return {
      tabs: Object.freeze(['目录','介绍']),
      bookDesc: {},
      bookBuyers: [],
      bookSections: [],
    }
  },
  computed: {
    buyers(){
      return this.bookBuyers.slice(0,16)
    }
  },
  created () {
    this.getBookDesc()
    this.getBookBuyers()
    this.getBookSection()
  },
  filters: {
    read(val) {
      let size = 10 //每秒10字
      let time = val / size
      let m = ~~(time / 60)
      let s = ~~(time % 60)
      let str = ''
      if(m) {
        str += m + '分'
      }
      if(s){
        str += s + '秒'
      }
      return str 
    }
  },
  methods: {
    tabChange(index) {
      console.log(index);
    },
    async getBookDesc() {
      try {
        let {s,d} = await bookAPI.bookDesc(this.id)
        if(s === 1) {
          this.bookDesc = d
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getBookBuyers() {
      try {
        let {s,d} = await bookAPI.bookBuyers(this.id)
        if(s === 1) {
          this.bookBuyers = d
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getBookSection() {
      try {
        let {s,d} = await bookAPI.bookSection(this.id)
        if(s === 1) {
          this.bookSections = d
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
<style scoped lang="less">
.book{
  font-size: 14px;
  width: 720px;
  margin: 20px auto;
  &-card{
    margin-bottom: 20px;
    background-color: #fff;
    &-title{
      .line(bottom);
      padding-bottom: 12px;
      font-size: 24px;
    }
  }
}
.info{
  .flex();
  padding: 20px;
  color: #71777c;
  &-img{
    width: 130px;
    height: 182px;
    border-radius: 2px;
    margin-right: 20px;
  }
  &-box{
    min-width: 0;
  }
  &-title{
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
  &-desc{
    margin: 10px 0;
    min-height: 40px;
    line-height: 20px;
    overflow: hidden;
  }
  &-author{
    .flex(@ai:center);
    &>a{
      .flex(@ai:center);
    }
    .avatar{
      width: 26px;
      height: 26px;
      border-radius: 50%;
      margin-right: 8px;
    }
    &-username{
      font-weight: 400;
      color: #333;
      margin-right: 8px;
    }
    &-profile{
      margin-left: 8px;
    }
  }
}
.btns{
  margin-top: 20px;
  button{
    margin-right: 10px;
  }
}
.buyers-box{
  .flex(@ai:center);
  .line(top);
  padding: 10px;
  .label{
    .flex(@display: inline-flex,@ai:center);
    flex: 1 0 auto;
    color: #666;
  }
}
.buyers{
  .flex();
  margin-left: 20px;
  img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: 0 5px;
  }
}
.book-content{
  .line(top);
  padding: 30px;
  
}
.sections{
  .section{
    padding: 0 20px;
    min-height: 70px;
    &>a{
      .flex();
    }
    &-cnt{
      padding: 15px 0;
    }
    &-title{
      font-size: 16px;
      color: #000;
    }
    &-read{
      .flex(@ai:center);
      color: #b2bac2;
      &>span{
        margin: 0 5px;
      }
    }
    &:first-child .step:before,
    &:last-child .step:after{
      display: none
    }
  }
  .step{
    .flex(@ai:center);
    position: relative;
    align-self: stretch;
    margin-right: 15px;
    &:before,
    &:after{
      z-index: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      background-color: #b5b7ba;
      height: 50%;
      content: "";
    }
    
    &:before{
      top: 0;
    }
    &:after{
      top: 50%;
    }
    &-btn{
      .border(3px,#b5b7ba);
      .flex(center,center);
      position: relative;
      font-size: 18px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      text-align: center;
      color: #b5b7ba;
      z-index: 1;
      background-color: #fff;
    }
  }
}
.book-introduce{
  padding: 0 30px;
}
</style>
