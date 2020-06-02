<template>
  <div  class="home-right">
    <!-- 首页-未登录-右侧内容 -->
    <section class="box">
      <home-right-register />
    </section>
    <section class="box">
      <home-right-hottags />
    </section>
    <section class="box">
      <a href="https://juejin.im/app" target="_blank" class="qr">
        <img class="qr-img" src="../../assets/image/juejin-welcome.png" alt="">
        <div class="qr-txt">
          <p class="title">下载掘金客户端</p>
          <p class="desc">一个帮助开发者成长的社区</p>
        </div>
      </a>
    </section>
    <section class="box">
      <div class="others">
        <div class="others-list">
          <img src="../../assets/image/collections.945b9ae.png" alt="收藏集" title="收藏集">
          <router-link class="title" to="">收藏集</router-link>
        </div>
        <div class="others-list">
          <img src="../../assets/image/book.75582b2.png" alt="掘金社区漫游指南" title="掘金社区漫游指南">
          <router-link class="title" to="">掘金社区漫游指南</router-link>
        </div>
        <div class="others-list">
          <img src="../../assets/image/juejin-extension-icon.4b79fb4.png" alt="下载掘金浏览器插件" title="下载掘金浏览器插件">
          <a class="title" href="https://juejin.im/extension" rel="nofollow noopener noreferrer" target="_blank">下载掘金浏览器插件</a>
        </div>
        <div class="others-list">
          <img src="../../assets/image/juejin-miner.b78347c.png" alt="前往掘金翻译计划" title="前往掘金翻译计划">
          <a class="title" href="https://github.com/xitu/gold-miner" rel="nofollow noopener noreferrer" target="_blank">前往掘金翻译计划</a>
        </div>
        <div class="others-list">
          <img src="../../assets/image/juejin-partner.4dd2d8c.png" alt="商务合作" title="商务合作">
          <a class="title" href="https://bd.juejin.im/" rel="nofollow noopener noreferrer" target="_blank">商务合作</a>
        </div>
      </div>
    </section>
    <section class="box about">
      <p>关于我们</p>
      <div class="links about-1">
        <a class="link" href="https://weibo.com/xitucircle?display=0&retcode=6102&is_all=1" target="_blank"><svg-icon name="weibo" ></svg-icon></a>
        <p class="link" href="" ><svg-icon name="weixin" ></svg-icon></p>
        <a class="link" href="https://zhuanlan.zhihu.com/xitucircle" target="_blank"><svg-icon name="zhihu" ></svg-icon></a>
        <a class="link" href="https://www.jianshu.com/u/5fc9b6410f4f" target="_blank"><svg-icon name="jianshu" ></svg-icon></a>
      </div>
      <div class="links about-2">
        <a class="link">关于</a>
        <a class="link">招聘</a>
        <a class="link">商务合作</a>
        <a class="link">友情链接</a>
      </div>
      <div class="links about-3">
        <a class="link" href="https://juejin.im/terms">用户协议</a>
        <a class="link" href="https://juejin.im/privacy">隐私政策</a>
      </div>
      <div class="links about-4">
        <p>©2020 掘金</p>
        <a class="link" href="https://www.qingcloud.com/?source=juejin-logo" target="_blank">Powered by QingCloud</a>
        <a class="link" href="http://www.miibeian.gov.cn/" target="_blank">津ICP备15003202号-2</a>
        <a class="link" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802026719" target="_blank">京公网安备11010802026719号</a>
      </div>
    </section>
    
  </div>
</template>
<script>
import homeRightRegister from './register'
import homeRightHottags from './hottags'

export default {
  name: '',
  components: {
    homeRightRegister,
    homeRightHottags
  },
}
</script>
<style scoped lang="less">
.home-right{
  max-width: 240px;
  width: 100%;
  margin-left: 20px;
  // background-color: #fff;
  .box{
    background-color: #fff;
  }
  .box + .box{
    margin-top: 1.5rem ;
  }
}
.qr{
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
.others{
  .flex(@dir: column);

  &-list{
  .flex(@ai: center);
  padding: 1rem;
    img{
      width: 3rem;
      margin-right: .8rem;
    }
    .title{
      font-size: 1.16rem;
      line-height: 1;
    }
  }
}
.box.about{
  font-size: 1.1rem;
  text-align: center;
  background-color: @bgColor;
  color: #909090;
  padding-bottom: 2rem;
  .links{
    .flex(center,center);
    margin: .5rem 0;
  }
  .link{
    &:hover{
      color: @activeColor;
    }
  }
  .about{
    &-1{
      .link{margin: .5rem;}
    }
    &-2,&-3{
      .link{
        .delimiter('·');
      }
    }
    &-4{
      flex-direction: column;
      .link{margin: .4rem 0 ;}
    }
  }

  
}

</style>
