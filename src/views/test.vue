<template>
  <div >
    <!-- <my-com/> -->
    <test />
    <label for="bookNum">数 量</label>
    <button @click="setCount(count+1)">+</button>
    <span>{{count}}</span>
    <button @click="setCount(count-1)">-</button>
  </div>
</template>

<script>
import { store, mutations } from '../mystore/index' 

export default {
    components: {
      test: ()=>import('./test1.vue')
    },
    computed: {
      count () {
        return store.count
      }
    },
    methods: {
      setCount: mutations.setCount
    }
    
}
</script>
