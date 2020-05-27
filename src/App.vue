<template>
  <div id="app">
    <header-base v-if="!$route.meta.hideHeader"></header-base>
    <suspension-icon></suspension-icon>
    <router-view/>
  </div>
</template>
<script>
import headerBase from '@/components/header/header-base'
import suspensionIcon from '@/components/common/suspension-icon'

export default{
  components: {
    headerBase,
    suspensionIcon
  },
  created(){
    console.log(1);
  }
}
</script>
<style lang="less">
@import './assets/css/normalize.css';
@import './assets/css/common.css';

</style>
