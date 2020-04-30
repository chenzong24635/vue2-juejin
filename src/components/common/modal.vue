<template>
  <div class="modal" @clcik="closeModal">
    <div v-show="modalShow" class="modal-slot">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      modalShow: true
    }
  },
  created () {},
  methods: {
    showModal() {
      this.modalShow = false;
    },
    closeModal() {
      this.modalShow = true;
    }
  }
}
</script>
<style scoped lang="less">
.modal{
  .flex(center,center);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 500;
  &-slot{
    position: relative;
    // padding: 2rem;
    max-width: 100%;
    margin: auto;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
  }
}
</style>
