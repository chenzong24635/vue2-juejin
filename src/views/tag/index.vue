<template>
  <div class>
    <!-- 标签页面 -->
    <div class="tag-top">
      <h1 class="title">{{title}}</h1>
      <p class="counts">
        <span>{{subscribe.subscribersCount}} 关注，</span>
        <span>{{subscribe.entryCount}} 文章</span>
      </p>
    </div>
    <div class="container">
      <div class="tag-header">
        <div class="focus">
          <img :src="subscribe.icon" alt class="focus-icon" />
          <c-button type="success cutout">关注</c-button>
        </div>
        <ul class="subs">
          <li
            @click="subChange(item, index)"
            :class="['sub', index === subIndex ? 'active' : '']"
            v-for="(item, index) in subNavs"
            :key="item.sort"
          >{{item.title}}</li>
        </ul>
      </div>
      <common-list1 type="tag" :lists="lists" @getLists2="getLists" />
    </div>
  </div>
</template>
<script lang="ts">
import{objType}from '@/types/commons'
import {subNavsType,stateType} from '@/types/tag'

import commonList1 from "@/components/common/common-list1";
import scroll from "@/mixins/scroll";

import tagAPI from "@/api/tag";
import { reactive, toRefs, onMounted, watch, ref } from "vue";
export default {
  name: "",
  components: {
    commonList1
  },
  props: ["title"],
  setup(props: objType) {
    let state:stateType = reactive({
      sort: "rankIndex",
      tagid: "",
      page: 0,
      pageSize: 20,
      total: 0,
      lists: [],
      isLoading: false,
      subscribe: {}
    });

    let getLists = async ():Promise<void> => {
      if (state.isLoading) return;
      state.isLoading = true;
      try {
        let { s, d } = await tagAPI.tags(
          state.tagid,
          state.page,
          state.pageSize,
          state.sort
        );
        if (s === 1) {
          state.lists = state.lists.concat(d.entrylist);
          state.page++;
          state.total = d.total;
        }
        state.isLoading = false;
      } catch (e) {
        state.isLoading = false;
        console.log(e);
      }
    };

    let getTagDetail = async ():Promise<void> => {
      try {
        let { s, d } = await tagAPI.tagDetail(encodeURIComponent(props.title));
        if (s === 1) {
          state.tagid = d.id;
          state.subscribe = d;
        }
      } catch (e) {
        console.log(e);
      }
    };

    let subIndex = ref(0)
    let subNavs = Object.freeze([
      {
        sort: "rankIndex",
        title: "热门"
      },
      {
        sort: "createdAt",
        title: "最新"
      },
      {
        sort: "hotIndex",
        title: "最热"
      }
    ]);
    let subChange = (item: subNavsType, index: number): void => {
      subIndex.value = index;
      state.sort = subNavs.filter(
        (item1: subNavsType) => item1.title === item.title
      )[0].sort;
      reset();
      getLists();
    };
    
    let reset = (): void => {
      state.page = 0
      state.pageSize = 20
      state.total = 0
      state.lists = []
    };

    let {isBottom} = scroll()
    watch(
      ()=>isBottom.value,
      ()=>{
        getLists()
      }
    )

    onMounted(async ():Promise<void> => {
      await getTagDetail();
      await getLists();
    });

    return {
      subNavs,
      subIndex,
      ...toRefs(state),
      getLists,
      subChange,
    };
  }
};
</script>
<style scoped lang="less">
.tag-top {
  position: relative;
  height: 150px;
  line-height: 30px;
  padding: 4rem 0;
  margin-bottom: 0.3rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #f1f1f1;
  text-align: center;
  h1 {
    font-size: 25px;
    font-weight: 700;
  }
  .counts span {
    color: #666;
  }
}
.title {
  text-align: center;
  color: #666;
}
.tag-header {
  .flex(@jc:space-between, @ai:center);
  padding: 15px 0;
}
.focus {
  .flex(@ai:center);
  &-icon {
    height: 2rem;
    margin-right: 1rem;
  }
}
.subs {
  .flex(flex-end, center);
  background-color: #f4f5f5;
  .sub {
    font-size: 1.3rem;
    margin-left: 2rem;
    cursor: pointer;
    color: #909090;
    &.active {
      color: @activeColor;
    }
  }
}
</style>
