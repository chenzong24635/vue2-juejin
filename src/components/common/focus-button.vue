<template>
  <c-button type="success cutout" @click.stop="focus">关注</c-button>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  name: '',
  props: ['id'],
  data () {
    return {}
  },
  created () {},
  methods: {
    ...mapActions([
      'showLoginModel'
    ]),
    focus() {
      this.showLoginModel()
    }
  }
}
</script>
<style scoped lang="less">
</style>
