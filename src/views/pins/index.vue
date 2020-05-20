<template>
  <div class="container">
    <div class="left-nav">
      <header-sub
        :headerSubs="leftRouteParams"
        mainRoute="pins"
        subRoute="name"
        routeTitle="title"
      />
    </div>
    <div class="middle-box">
      da
    </div>
    <div class="right-side">
      <right-side :lists="hotLists" />
    </div>
  </div>
</template>
<script>
import leftRouteParams from '@/components/pins/leftRouteParams.js'
import headerSub from '@/components/header/header-sub'
import rightSide from '@/components/pins/aside'

import pinsAPI from '@/api/pins'

export default {
  components: {
    headerSub,
    rightSide
  },
  data() {
    return {
      leftRouteParams,
      lists: [],
      hotLists: [],
    }
  },
  created() {
    console.log(leftRouteParams);
    this.getHotLists()
  },
  methods: {
    async getHotLists() {
      let {s, d} = await pinsAPI.hotLists()
      if (s === 1) {
        this.hotLists = d.list
      }
    }
  }
}
</script>
<style scoped lang="less">
.container {
  .flex(@jc: space-between);
  margin-top: 1rem;
  background-color: inherit;
  /deep/ #header-sub {
    position: sticky;
    top: 0;
    left: 0;
    border-radius: .2rem;
    background-color: #fff;
    width: 9.33rem;
    max-width: 9.33rem;
    padding: 1rem 0;
    transition: all .2s linear;
    .navs{
      .flex(@dir: column);
      margin: auto;
      .nav{
        width: 100%;
        margin: 0.4rem 0;
        &:nth-child(3){
          border-bottom: 1px solid @bgColor;
        }
        &>a{
          padding: 0.8rem 1rem;
          border-radius: .25rem;
          &.router-link-active{
            background-color: @mainColor;
            color: #fff
          }
        }
      }
    }
  }
}
.right-side{
  position: sticky;
  top: 0;
  right: 0;
  width: 248px;
  background-color: #fff;
}
.middle-box{
  flex: 1;
  background-color: #fff;
  margin: 0 1rem;
}
</style>
