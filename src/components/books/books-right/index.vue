<template>
  <div class="books-right">
    <section  class="box">
      <div class="box-top">
        <h3 class="title">掘金小册是什么？</h3>
        <p class="desc">一个小篇幅、高浓度、成体系、有收益的技术学习平台</p>
      </div>
      <div class="box-bottom">
        <p class="title">关注公众号 领取优惠码</p>
        <img class="img" src="../../../assets/image/wechat-qr.f1926e7.png" alt="">
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
.books-right{
  max-width: 240px;
  width: 100%;
  margin-left: 20px;
  .box{
    background-color: #fff;
    &-top{
      padding: 1rem;
      .line();
      .desc{
        margin-top: 8px;
        line-height: 1.4;
        font-size: 14px;
      }
    }
    &-bottom{
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
  }
  .box + .box{
    margin-top: 1.5rem ;
  }
}
</style>
