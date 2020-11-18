<template>
  <div class="">
    B页面B --id--{{userId}}
<button @click="resolveLink">BBBBBBBBBBBBBB</button>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: ['userId'],
  data () {
    return {}
  },
  created () {
    console.log(this.$route);
  },
  methods: {
    resolveLink(){
      let routeUrl = this.$router.resolve({
          path: "/A",
          // query: {userId: '123'}
      });
      window.open(routeUrl.href, '_blank');
    }
  }
}
</script>
<style scoped lang="less">
</style>
