<template >
  <div class="actions1">
    <div class="action1">
      <div class="action1-left">
        {{$_dateDis(date)}}
      </div>
      <div class="action1-right">
        <div class="praise">
          <svg-icon name="praise1" :size="16"></svg-icon>
        </div>
        <div class="reply">
          <svg-icon name="message2" :size="16"></svg-icon>
          <span>回复</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {$_dateDis} from '@/filters'
export default {
  props: ['date'],
  setup() {
    return {
      $_dateDis
    }
  }
}
</script>
<style scoped lang="less">
.actions1{
  width: 100%;
}
.action1{
  .flex(space-between,center);
  color: #8a93a0;
  &-right{
    flex: 1;
    
    .flex(flex-end,center);
    .reply{
      margin-left: 30px;
      font-size: 12px;
      span{
        margin-left: 5px;
      }
    }
  }
}
</style>
