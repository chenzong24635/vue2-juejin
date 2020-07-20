<template>
    <svg 
      :class="svgClass" 
      aria-hidden="true" 
      v-on="$listeners" 
      :style="{'font-size': size + 'px','fill': color}"
    >
      <use :xlink:href="iconName" />
    </svg>
</template>

<script>
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
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
    svgClass() {
      return 'svg-icon ' +   this.className
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