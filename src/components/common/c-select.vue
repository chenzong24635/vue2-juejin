<template>
  <div class="c-select">
    <p class="c-select-title">
      {{title}}
    </p>
    <ul>
      <li>
        <slot></slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String
    },
    /* lists: {
      type: Array,
      required: true
    }, */
    // required
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
</style>
