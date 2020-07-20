<template functional>
  <div v-if="props.level" class="level">
    Lv{{props.level}}
  </div>
</template>
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
