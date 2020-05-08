<template>
  <div class="container">
    <header-sub
      :headerSubs="defaultCity" 
      :headerSubs1="cityList"
      mainRoute="events"
      subRoute="cityAlias"
      routeTitle="cityName"
    >
      <template #events>
        <a class="events-slot" target="_blank" href="https://wj.qq.com/s2/3430206/b3b9/">
          <svg-icon name="box"></svg-icon>
          <span>活动合作</span>
        </a>
      </template>
    </header-sub>

    <div class="panel">
      <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in banners" :key="item._id">
          <a class="swiper-a" :href="item.eventUrl">
            <img class="swiper-img" :src="item.screenshot" alt="">
          </a>
        </swiper-slide>
        <div v-if="banners.length>1" class="swiper-button-prev" slot="button-prev"></div>
        <div v-if="banners.length>1" class="swiper-button-next" slot="button-next"></div>
        <div v-if="banners.length>1" class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="date">
        日历
        <!-- {{allCity}} -->
      </div>
    </div>
    <div>
      <events-list  
        :lists="lists"
      />
      <div v-if="lists.length === 0" class="nodata">
        暂无数据
      </div>
    </div>
    <copy-right />
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import eventAPI from '@/api/events'
import headerSub from '@/components/events/header-sub'
import eventsList from '@/components/events/events-list'
import copyRight from '@/components/common/copy-right'
import scroll from '@/mixins/scroll'


export default {
  components: {
    Swiper,
    SwiperSlide,
    headerSub,
    eventsList,
    copyRight
  },
  directives: {
    swiper: directive
  },
  props: ['id'],
  mixins: [scroll],
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
          cityName: "热门活动",
          cityAlias: "all",
          weight: 0
        },
        {
          cityName: "北京",
          cityAlias: "beijing",
          weight: 0
        },
        {
          cityName: "上海",
          cityAlias: "shanghai",
          weight: 0
        },
        {
          cityName: "广州",
          cityAlias: "guangzhou",
          weight: 0
        },
        {
          cityName: "深圳",
          cityAlias: "shenzhen",
          weight: 0
        },
        {
          cityName: "杭州",
          cityAlias: "hangzhou",
          weight: 0
        }
      ],
      lists: [],
      pageNum: 0
    }
  },
  watch: {
    '$route': function(to ,from){
      console.log(to ,from);
      if(to.name === from.name && to.params.id!==from.params.id){
        console.log(to.params.id,this.id);
        // this.id = to.params.id
        this.reset()
        this.getLists()
      }
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
    await this.getCityList();
    await this.getBanner();
    await this.getLists();
    console.log(this.id)
  },
  methods: {
    reset() {
      // this.alias = '';
      this.pageNum = 0;
      this.lists = [];
    },
    async getCityList() {
      let {s, d} = await eventAPI.cityList(0);
      console.log(s,d);
      if(s === 1) {
        this.cityList = d;
      } 
    },
    async getBanner() {
      let {s, d} = await eventAPI.banner();
      if(s === 1) {
        this.banners = d;
      }
      console.log(s,d);

    },
    async getLists() {
      let id = this.id ==='all' ? '' : this.id
      let {s, d} = await eventAPI.eventList(1, id, this.pageNum++);
      if(s === 1){
        this.lists = this.lists.concat(d);
      }
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
.container{background-color: inherit;}
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
.panel{
  padding-top: 6rem;
}
.events-slot{
  span{
    margin-left: 6px;
    font-size: 1.16rem;
  }
}

</style>
