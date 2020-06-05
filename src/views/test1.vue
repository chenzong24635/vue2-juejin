<template>
  <div>
    {{store.count}}
  </div>
</template>
<script>
import { store } from '../mystore/index' 
export default {
  data() {
    return {
      store
    }
  },
}
</script>