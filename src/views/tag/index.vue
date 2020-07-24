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
interface objType{
  [propertyName: string]: any
}

interface propsType {
  title: string | number;
}

interface tagsType {
  tagid: string;
  title: string;
}
interface subNavsType {
  sort: string;
  title: string;
}

interface stateType {
  sort: string,
  subIndex: number,
  tagid: string,
  page: number,
  pageSize: number,
  total: number,
  lists: any[],
  subscribe: objType,
  isLoading: boolean,
  [property: string]: any
}

import commonList1 from "@/components/common/common-list1";
import scroll from "@/mixins/scroll";

import tagAPI from "@/api/tag";
import { reactive, toRefs, onMounted, watch } from "vue";
export default {
  name: "",
  components: {
    commonList1
  },
  props: ["title"],
  setup(props: propsType) {
    let tags: tagsType[] = Object.freeze([
      {
        tagid: "55cdb52740ac79db3570607f",
        title: "架构"
      },
      {
        tagid: "5597a3cae4b08a686ce5d0fb",
        title: "开源"
      },
      {
        tagid: "55cd843d60b203b0519307a9",
        title: "算法"
      },
      {
        tagid: "555e9abee4b00c57d9956152",
        title: "GuitHub"
      },
      {
        tagid: "55979fe6e4b08a686ce562fe",
        title: "面试"
      },
      {
        tagid: "559c814be4b0d4d1b1e9521e",
        title: "代码规范"
      },
      {
        tagid: "56e65334da2f60004c50910f",
        title: "产品"
      },
      {
        tagid: "56b5a7f3df0eea00544e1993",
        title: "掘金翻译计划"
      }
    ]);

    let subNavs: subNavsType[] = Object.freeze([
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

    let state:stateType = reactive({
      sort: "rankIndex",
      subIndex: 0,
      tagid: "",
      page: 0,
      pageSize: 20,
      total: 0,
      lists: [],
      subscribe: {},
      isLoading: false
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

    
    let subChange = (item: subNavsType, index: number): void => {
      state.subIndex = index;
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
    let filterId: () => string = (): string => {
      return state.tags.filter((item: tagsType) => item.title === props.title)[0].tagid;
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
      tags,
      subNavs,
      ...toRefs(state),
      getLists,
      getTagDetail,
      subChange,
      filterId
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
