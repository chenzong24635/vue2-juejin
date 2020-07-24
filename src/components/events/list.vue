<template>
  <div class="">
    <ul v-if="listsNew.length>0" class="lists">
      <li v-for="item in listsNew" :key="item._id" class="list">
        <a class="list-box" :href="item.eventUrl" target="_blank">
          <div :style="{'background-image': 'url(' + item.screenshot + ')'}" class="list-img">
          </div>
          <div class="list-message">
            <p class="list-title">{{item.title}}</p>
            <div class="list-date">
              <img src="https://b-gold-cdn.xitu.io/v3/static/img/calendar.8e47027.png" alt="">
              <span>{{date(item.startTime)}}</span>
            </div>
            <div class="list-address">
              <p class="list-address-city">
                <svg-icon name="address" color="#909090" :size="16"></svg-icon>
                <span>{{item.city}}</span>
              </p>
              <button :class="['btn', item.isActive ? 'active':'']">
                {{item.isActive ? '报名参加' : '活动详情' }}
              </button>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
interface propsType{
  [name:string]:any
}

import { computed } from 'vue'
let dayArr = Object.freeze([
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
])
export default {
  name: '',
  components: {},
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  setup(props:propsType){
    let date = (val:string):string => {
      let val1 = new Date(val)
      let month = (val1.getMonth() + 1 + '').padStart(2,'0')
      let date = (val1.getDate() + '').padStart(2,'0')
      let day = dayArr[val1.getDay()]
      return month + '-' + date + ' ' + day
    }
    let listsNew = computed(() => {
      let nowDate = +new Date()
      return props.lists.map(item => {
        let activeDate = +new Date(item.endTime)
        item.isActive = activeDate > nowDate
        return item
      })
    })
    return {
      date,
      listsNew
    }
  },
}
</script>
<style scoped lang="less">
.lists{
  .flex(@wrap: wrap);
  margin-top: 35px;
}
.list{
  width: 25%;
  padding-left: 7px;
  padding-right: 7px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 30px;
  &-box{
    .border();
    display: block;
    transition: all .2s linear;
    background-color: #fff;

    &:hover{
      box-shadow: 0 7px 15px rgba(0,0,0,.1);
      transform: translateY(-3px);
    }
  }
  &-message{
    padding: 20px 12px 15px;
  }
  &-img{
    width: 100%;
    padding-top: 58.82%;
    background-color: #ccc;
    background-repeat: no-repeat;
    background-size: cover;
    // height: 58.82%;
    // object-fit: cover;
  }
  &-title{
    height: 40px;
    font-size: 14px;
    font-weight: 700;
    .ov(2);
  }
  &-date{
    margin: 10px 0;
    .flex(@ai:center);
    img{
      width: 12px;
    }
    &>span{margin-left: 6px;}
  }
  &-address{
    .flex(space-between,center,);
    &-city >span{
      margin-left: 6px;
    }
    .btn{
      width: auto;
      padding: .5rem 2rem;
      border-radius: 2rem;
      background-color: #aaa;
      color: #fff;
    }
    // .active{background-color: red;}
    .active{
      background-color: #4d91fd;
    }

  }
}
</style>
