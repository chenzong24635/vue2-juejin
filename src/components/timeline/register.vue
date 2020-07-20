<template >
  <section class="">
    <!-- 未登录首页-右侧的注册组件 -->
    <form class="auth-form form">
      <h3 class="title">掘金 - juejin.im</h3>
      <p>一个帮助开发者成长的社区</p>
      <div class="form-list">
        <input type="text" placeholder="请输入用户名">
      </div>
      <div class="form-list">
        <input type="text" placeholder="请输入手机号">
      </div>
      <div class="form-list">
        <input type="password" placeholder="请输入密码（不少于6位）">
      </div>
      <div class="form-list">
        <c-button type="primary">立即注册</c-button>
      </div>
      <div class="form-list form-txt">
        <span>注册登录即表示同意</span><br/>
        <a class="main-color" target="_blank" href="https://juejin.im/terms">用户协议</a>
        <span>、</span>
        <a class="main-color" target="_blank" href="https://juejin.im/privacy">隐私政策</a>
      </div>
    </form>
  </section>
</template>

<style scoped lang="less">

.form{
  position: relative;
  padding: 1.3333rem;
  width: 26.5rem;
  max-width: 100%;
  font-size: 1.167rem;
  a{display: inline-block;}
  .title{margin-bottom: 10px;}
  &-txt{line-height: 1.5;}
  &-list{
    margin: 1.2rem 0;
    color: #767676;
    button{
      width: 100%;
    }
    input{
      color: #333
    }
  }

  &-prompt{
    .flex(space-between,center)
  }
}
</style>
