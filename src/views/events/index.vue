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
<script lang="ts">
interface propsType{
  id: string | number
}

interface defaultCityType{
  cityName: string,
  cityAlias: string,
  weight: number
}

interface stateType{
  cityList: any[],
  allCity: any[],
  lists: any[],
  pageNum: number,
  isLoading: boolean,
  [propertyName: string]: any

}

import eventAPI from '@/api/events'
import headerSub from '@/components/header/header-sub'
import eventsList from '@/components/events/list'
import copyRight from '@/components/common/copy-right'
import scroll from '@/mixins/scroll'
import { reactive, computed, toRefs, onMounted, watch } from 'vue'


export default {
  components: {
    headerSub,
    eventsList,
    copyRight
  },
  props: ['id'],
  setup(props: propsType) {
    let defaultCity: defaultCityType[] = Object.freeze([
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
    ])
    let state: stateType = reactive({
      cityList: [],
      allCity: computed(()=>[...defaultCity,...state.cityList]),
      lists: [],
      pageNum: 1,
      isLoading: false,
    })

    // methods
    let getCityList = async(): Promise<void> => {
      try {
        let {s, d} = await eventAPI.cityList();
        if(s === 1) {
          state.cityList = d;
        } 
      } catch (e) {
        console.log(e);
      }
    }

    // let getBanner = async():Promise<void> => {
    //   try {
    //     let {s, d} = await eventAPI.banner();
    //     if(s === 1) {
    //       this.banners = d;
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    let getLists = async(): Promise<void> => {
      if(state.isLoading) return
      state.isLoading = true
      let id: string | number = props.id ==='all' ? '' : props.id
      try {
        let {s, d} = await eventAPI.eventList(1, id, state.pageNum++);
        if(s === 1){
          state.lists = state.lists.concat(d);
          state.isLoading = false
        }
      } catch (e) {
        console.log(e);
      }
    }

    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )
    onMounted(async():Promise<void>=>{
      await getCityList();
      // await getBanner();
      await getLists();
    })

    return {
      defaultCity,
      ...toRefs(state),
      getCityList,
      getLists,
    }
  },
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
  .flex(@ai:center);
  span{
    margin-left: 6px;
    font-size: 1.16rem;
  }
}

</style>
