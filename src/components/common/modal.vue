<template>
  <div class="modal">
    <div  @clcik.stop="closeModal" v-show="modalShow" class="modal-slot">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
export default {
  setup () {
    let state = reactive({
      modalShow: true
    })
    let showModal = () => {
      state.modalShow = true;
    }
    let closeModal = () => {
        console.log(111);
        state.modalShow = false;
      }
    return {
      ...toRefs(state),
      showModal,
      closeModal
    }
  },
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
