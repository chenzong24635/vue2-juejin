<template>
  <c-button type="success cutout" @click.stop="focus">关注</c-button>
</template>
<script>
export default {
  name: '',
  props: ['id'],
  data () {
    return {}
  },
  setup () {
    let focus = ()=>{}
    return {
      focus
    }
  },

}
</script>
<style scoped lang="less">
</style>
