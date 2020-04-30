<template>
  <div class="container">
    <div class="panel">
      <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in banners" :key="item._id">
          <a class="swiper-a" :href="item.eventUrl">
            <img class="swiper-img" :src="item.screenshot" alt="">
          </a>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="date">
        {{allCity}}
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import eventAPI from '@/api/event'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      banners: [1,2,3],
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      cityList: [],
      defaultCity: [
        {
          name: "all",
          title: "热门活动",
          val: ""
        },
        {
          name: "beijing",
          title: "北京",
          val: "北京"
        },
        {
          name: "shanghai",
          title: "上海",
          val: "上海"
        },
        {
          name: "guangzhou",
          title: "广州",
          val: "广州"
        },
        {
          name: "shenzhen",
          title: "深圳",
          val: "深圳"
        },
        {
          name: "hangzhou",
          title: "杭州",
          val: "杭州"
        }
      ]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    allCity() {
      return [...this.defaultCity,...this.cityList]
    }
  },
  async mounted() {
    // await this.getCityList();
    await this.getBanner();
    // await this.getEventList();
    console.log(this.allCity)
  },
  methods: {
    async getCityList() {
      let {s, d} = await eventAPI.cityList();
      console.log(s,d);
    },
    async getBanner() {
      let {s, d} = await eventAPI.banner();
      if(s === 1) {
        this.banners = d;
      }
      console.log(s,d);

    },
    async getEventList() {
      let {s, d} = await eventAPI.eventList();
      console.log(s,d);

    }
  }
}
</script>
<style lang="css">
  :root{
  --swiper-navigation-size: 24px;
  --swiper-theme-color: #fff;
}
</style>
<style scoped lang="less">

.panel{
  .flex(@jc:space-between);
  background-color: #f4f5f5;
}
.swiper,.date{
  width: 470px;
  height: 280px;
  background-color: #fff;
  margin: 0;
}
.swiper{
  &-a{
    display: block;
    width: 100%;
    height: 100%;
    background-color: #ccc;
  }
  &-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
