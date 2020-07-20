<template>
  <div class="books-right">
    <section  class="box">
      <div class="slogan">
        <h3 class="title">掘金小册是什么？</h3>
        <p class="desc">一个小篇幅、高浓度、成体系、有收益的技术学习平台</p>
      </div>
      <div class="qr">
        <p class="title">关注公众号 领取优惠码</p>
        <img class="img" src="../../assets/image/wechat-qr.f1926e7.png" alt="">
      </div>
    </section>
    <section class="box help">
      <router-link class="help-line" to="/book/59e414a5518825541b03ce66">
        <img class="img" src="../../assets/image/author.c5d975e.png" alt="">
        <p class="title">成为作者</p>
      </router-link>
      <!-- <p class="help-line"></p> -->
      <router-link to="/feedback">
        <img class="img" src="../../assets/image/feedback.1230fb5.png" alt="">
        <p class="title">建议反馈</p>
      </router-link>
    </section>
    <section class="box award">
      <svg-icon name="icon.b99ea03" :size="40"></svg-icon>
      <div class="award-cnt">
        <p class="award-title">送你 45 元买小册</p>
        <p class="award-btn cp" @click="showAward(true)">立即领取</p>
      </div>
    </section>
    <c-award :awardModalShow ="awardModalShow" @close-modal="showAward">
    </c-award>
  </div>
</template>
<script>
import cAward from '@/components/common/award'
export default {
  name: '',
  components: {
    cAward
  },
  data () {
    return {
      awardModalShow: false
    }
  },
  methods: {
    showAward(bool) {
      this.awardModalShow = bool;
    }
  }
}
</script>
<style scoped lang="less">
.books-right{
  max-width: 240px;
  width: 100%;
  margin-left: 20px;
  .box{
    background-color: #fff;
  }
  .box + .box{
    margin-top: 1.5rem ;
  }
}
.slogan{
  padding: 1rem;
  .line();
  .title{
    font-size: 15px;
  }
  .desc{
    margin-top: 8px;
    line-height: 1.4;
    font-size: 14px;
    color: #646464;
  }
}
.qr{
  padding: 1rem;
  font-size: 15px;
  .title{
    margin-bottom: 1rem;
  }
  .img{
    width: 100%;
    height: 100%;
  }
}
.help{
  .flex();
  padding:1.2rem 2rem;
  &-line{
    border-right: 1px solid #efefef;
  }
  &>a{
    width: 50%;
    .flex(center,center,@dir:column);
    .img{
      width: auto;
      height: 28px;
      margin-bottom: 1rem;
    }
    .title{
      font-size: 14px;
      color: #71777b;
    }
  }
}
.box.award{
  background: #fd4243;
  background: -webkit-linear-gradient(342deg,#f87554,#f0232f);
  background: linear-gradient(108deg,#f87554,#f0232f);
  background: -webkit-linear-gradient(-12deg,#f87554,#f0232f);
  box-shadow: 0 1px 3px 0 rgba(4,5,13,.23);
}
.award{
  .flex();
  font-size: 14px;
  padding: 20px 10px;
  border-radius: 2px;

  color: #fff;
  &-cnt{
    margin-left: 1rem;
  }
  &-btn{
    width: 60px;
    padding: 4px;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #fff;
    margin-top: 6px;
  }
}
</style>
