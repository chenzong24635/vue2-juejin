<template >
  <div v-if="level" class="level">
    Lv{{level}}
  </div>
</template>
<script>
export default {
  props:['level']
}
</script>
<style scoped lang="less">
.level{
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 1px;
  color: #fff;
  background-color: #599DFF;
}
</style>
