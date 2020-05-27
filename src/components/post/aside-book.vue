<template>
  <section class="aside-box">
    <a href="https://juejin.im/app" target="_blank" class="qr">
      <img class="qr-img" src="../../assets/image/juejin-welcome.png" alt="">
      <div class="qr-txt">
        <p class="title">下载掘金客户端</p>
        <p class="desc">一个帮助开发者成长的社区</p>
      </div>
    </a>
  </section>
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
.qr{
  background-color: #fff;
  padding: 1.3rem;
  .flex(@ai:center);
  &-img{
    margin-right: .5rem;
    width: 4.167rem;
    height: 4.167rem;
  }
  &-txt{
    .flex(@jc:center,@dir: column);
    .title{
      font-size: 1.167rem;
      font-weight: 600;
      color: #333;
    }
    .desc{
      margin-top: .5rem;
      font-size: 1rem;
      color: #909090;
    }
  }
}
</style>
