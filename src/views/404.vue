<template>
  <div class="container ">
    <div class="where-is-panfish">
      <img
        src="https://b-gold-cdn.xitu.io/v3/static/img/bg.1f516b3.png"
        class="elem bg"
      />
      <img
        src="https://b-gold-cdn.xitu.io/v3/static/img/panfish.9be67f5.png"
        class="elem panfish"
      />
      <img
        src="https://b-gold-cdn.xitu.io/v3/static/img/sea.892cf5d.png"
        class="elem sea"
      />
      <img
        src="https://b-gold-cdn.xitu.io/v3/static/img/spray.bc638d2.png"
        class="elem spray"
      />
    </div>
    <c-button type="primary" :size="22">
      <router-link to="/timeline">回到首页</router-link>
    </c-button>
    
  </div>
</template>
<style scoped lang="less">
.container{
  .flex(@dir:column,@jc:flex-start,@ai:center);
}
.where-is-panfish{
  position: relative;
  width: 70%;
  padding-top: 48%;
  text-align: center;
  margin: 40px 0;
}
.where-is-panfish .elem {
  position: absolute;
  top: 35%;
  left: 50%
}

.where-is-panfish .bg {
    width: 77.724%;
    transform: translate(-50%,-50%)
}

.where-is-panfish .panfish {
    width: 20.994%;
    transform: translate(-55%,32%);
    animation: panfish 2s ease-in-out infinite alternate
}

.where-is-panfish .sea {
    width: 99.199%;
    transform: translate(-50%,75.3%);
    opacity: .7
}

.where-is-panfish .spray {
    width: 40.545%;
    transform: translate(-55%,162%);
    opacity: .4
}
@keyframes panfish {
    0% {
        transform: translate(-55%,30%)
    }

    to {
        transform: translate(-55%,36%)
    }
}

</style>
