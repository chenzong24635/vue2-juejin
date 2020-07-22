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
  props: {
    title: {
      type: String
    },
  },
}
</script>
<style scoped lang="less">
</style>
