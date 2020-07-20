<template>
  <ul class="tabs">
    <li 
      @click="tabChange(tab,index)"
      v-for="(tab, index) in tabs" 
      :key="index" 
      :class="['tab', line ? 'line' : '',index === newIndex ? 'active' : '']"
    >
      {{tab}}
    </li>
  </ul>
</template>
<script>
export default {
  name: '',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    line: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      newIndex: 0
    }
  },
  created() {
    this.newIndex = this.tabIndex
  },
  methods: {
    tabChange(item, index) {
      this.newIndex = index
      this.$emit('changed', index)
    }
  }
}
</script>
<style scoped lang="less">
.tabs{
  .flex(@ai:center);
  .tab{
    font-size: 16px;
    padding: 20px;
    cursor: pointer;
    &.line{
      .line(bottom,@width: 2px,@c: #fff);
      &.active{
        border-bottom-color: @mainColor;
        // .line(bottom,@width: 2px,@c: @mainColor);
      }
    }
    
  }
}
</style>
