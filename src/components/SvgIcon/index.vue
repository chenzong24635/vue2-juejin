<template>
    <svg 
      :class="svgClass" 
      aria-hidden="true" 
      :style="{'font-size': size + 'px','fill': color}"
    >
      <use :xlink:href="iconName" />
    </svg>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'transparent'
    },
    size: {
      type: Number,
      default: 20
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let iconName = computed(()=>{
      return `#icon-${props.name}`
    }) 
    let svgClass = computed(()=>{
      return `svg-icon ${props.className}`
    }) 
    return {
      iconName,
      svgClass
    }
  }

}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>