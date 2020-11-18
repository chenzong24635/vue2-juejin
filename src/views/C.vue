<template>
  <div @click="click">
    {{ id }}--
    {{ id1 }}
  </div>
</template>

<script>
export default {
  props:['id','arr'],
  data(){
    return {
      id1: ''
    }
  },
  computed: {
    newId: {
      get() {
        return this.id / 1
      },
      set(val) {
        console.log(val);
        this.id1 = val
        return val
      }
    }
  },
  methods: {
    click(){
      this.newId += 1
    },
  },
};
</script>