<template>
  <button :class="newType" :style="{borderRadius: radius,fontSize: size /1.2 + 'px',padding: `${size/2}px ${size*1.2}px`}" >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: '',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: Number,
    },
    radius: {
      type: String,
    }
  },
  computed: {
    newType(){
      let types = this.type.split(' ')
      let str =''
      try{
        types = types.map(item => {
          return 'btn-' + item
        })
        str = types.join(' ')
      }catch{
        str = ''
      }
      return str
    }
  },
  components: {},
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>
<style scoped lang="less">
button{
  display: inline-block;
  width: auto;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  // border-radius: 4px;
  transition: .1s;
  padding: 8px 16px;
  font-size: 13px;
  &:hover{
    opacity: .8;
    a{
      color: inherit;
    }
  }
}
.type(@color: #fff, @bgc: #fff){
  color: @color;
  background: @bgc;
  border: 1px solid @color;
  &.btn-cutout{
    color: @bgc;
    background: @color;
    border-color: @bgc;
  }
}
.btn-default{
  .type(@color: #606266,);
}
.btn-primary{
  .type(@bgc:@mainColor);
}
.btn-success{
  .type(@bgc: #37c700);
}

</style>
