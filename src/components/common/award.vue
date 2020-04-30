<template>
  <div>
    <c-modal v-show="awardModalShow">
      <div  class="award">
        <span @click="closeModal" class="close-icon">×</span>
        <div class="header">
          <svg-icon name="icon.a87e5ae" :size="40"></svg-icon>
          <p class="title">新人专享好礼</p>
        </div>
        <p class="desc">
          凡未购买过小册的用户，均可领取三张 5 折新人专享券，购买小册时自动使用专享券，最高可节省 45 元。
        </p>
        <ul class="tickets">
          <li class="ticket" v-for="item in [1,2,3]" :key="item">
            <p class="ticket-enjoy">小册新人 5 折券</p>
            <p class="ticket-sale">最高可省 15 元</p>
          </li>
        </ul>
        <p class="remark">注：专享券的使用期限在领券的七天内。</p>
        <button @click="receive" class="award-btn">一键领取</button>
      </div>
    </c-modal>
  </div>
</template>
<script>
import cModal from '@/components/common/modal'
export default {
  name: '',
  components: {
    cModal
  },
  props: {
    awardModalShow: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    },
    receive() {
      
    }
  }
}
</script>
<style scoped lang="less">
.award{
  position: relative;
  max-width: 350px;
  color: #f6e3b7;
  padding: 30px 20px;
  background-image: linear-gradient(140deg,#f87554,#f0232f);
  border-radius: 2px;
  .header{
    .flex(center,center);
    .title{
      color: #fff;
      font-size: 28px;
      margin-left: 25px;
      font-weight: 700;
    }
  }
  .desc{
    font-size: 14px;
    font-weight: 300;
    margin: 30px 0 18px;
  }
}
.close-icon{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #eed7a1;
  text-align: center;
  cursor: pointer;
}
.ticket{
  .flex();
  position: relative;
  text-align: center;
  font-size: 16px;
  color: #8b572a;
  font-weight: 400;
  line-height: 54px;
  margin-bottom: 8px;
  background-color: #fff;
  &:before,
  &:after{
    content: "";
    position: absolute;
    top: 0;
    width: 12px;
    height: 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 2;
  }
  &:before{
    left: -10px;
    background-image: url(../../assets/image/left.4bdbb30.png);
  }
  &:after{
    right: -10px;
    background-image: url(../../assets/image/right.379deec.png);
  }
  &-enjoy{
    .line(@dir:right,@type: dashed,@c:#eed7a1);
    width: 50%;
  }
  &-sale{
    width: 50%;
  }
}
.remark{
  margin: 15px 0;
  font-size: 14px;
  font-weight: 300;
}
.award-btn{
  display: block;
  width: 100%;
  padding: 12px 0;
  border-radius: 2px;
  background-image: linear-gradient(180deg,#fde2ac,#fbc174);
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
  font-size: 18px;
  color: #8b572a;
}
</style>
