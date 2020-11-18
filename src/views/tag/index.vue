<template>
  <div class="">
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
          <img :src="subscribe.icon" alt="" class="focus-icon">
          <c-button type="success cutout">关注</c-button>
        </div>
        <ul class="subs">
          <li 
            @click="subChange(item, index)" 
            :class="['sub', index === subIndex ? 'active' : '']" 
            v-for="(item, index) in subNavs" :key="item.sort"
          >{{item.title}}</li>
        </ul>
      </div>
      <common-list1 type="tag" :lists="lists" @getLists2="getLists" />
    </div>
  </div>
</template>
<script>

import commonList1 from '@/components/common/common-list1'
import scroll from '@/mixins/scroll'

import tagAPI from '@/api/tag'
export default {
  name: '',
  components: {
    commonList1
  },
  props: ['title'],
  mixins: [scroll],
  data () {
    return {
      tags: Object.freeze([
        {
          tagid: '55cdb52740ac79db3570607f',
          title: '架构'
        },
        {
          tagid: '5597a3cae4b08a686ce5d0fb',
          title: '开源'
        },
        {
          tagid: '55cd843d60b203b0519307a9',
          title: '算法'
        },
        {
          tagid: '555e9abee4b00c57d9956152',
          title: 'GuitHub'
        },
        {
          tagid: '55979fe6e4b08a686ce562fe',
          title: '面试'
        },
        {
          tagid: '559c814be4b0d4d1b1e9521e',
          title: '代码规范'
        },
        {
          tagid: '56e65334da2f60004c50910f',
          title: '产品'
        },
        {
          tagid: '56b5a7f3df0eea00544e1993',
          title: '掘金翻译计划'
        },
      ]),
      subNavs: [
        {
          sort: 'rankIndex',
          title: '热门'
        },
        {
          sort: 'createdAt',
          title: '最新'
        },
        {
          sort: 'hotIndex',
          title: '最热'
        },
      ],
      sort: 'rankIndex',
      subIndex: 0,
      tagid: '',
      page: 0,
      pageSize: 20,
      total: 0,
      lists: [],
      subscribe: {},
      isLoading: false,
    }
  },
  async mounted () {
    // this.tagid = this.filterId();
    console.log('tagPage',this.title,this.tagid);
    await this.getTagDetail();
    await this.getLists();
  },
  methods: {
    async getLists() {
      if(this.isLoading) return
      this.isLoading = true
      try {
        let {s, d} = await tagAPI.tags(this.tagid, this.page, this.pageSize, this.sort)
        if (s === 1) {
          this.lists = this.lists.concat(d.entrylist);
          this.page ++;
          this.total = d.total;
        }
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },
    async getTagDetail() {
      let {s, d} = await tagAPI.tagDetail(encodeURIComponent(this.title))
      if (s === 1) {
        this.tagid = d.id
        this.subscribe = d
      }
    },
    subChange(item, index) {
      this.subIndex = index;
      this.sort = this.subNavs.filter(item1 => item1.title === item.title)[0].sort;
      this.reset();
      this.getLists();
      console.log(this.sort);
    },
    reset() {
      this.page = 0,
      this.pageSize = 20,
      this.total = 0,
      this.lists = []
    },
    filterId() {
      return this.tags.filter(item => item.title === this.title)[0].tagid;
    }
  }
}
</script>
<style scoped lang="less">
.tag-top{
  position: relative;
  height: 150px;
  line-height: 30px;
  padding: 4rem 0;
  margin-bottom: .3rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #f1f1f1;
  text-align: center;
  h1{font-size: 25px;font-weight: 700;}
  .counts span{
    color: #666;
  }
}
.title{
  text-align: center;
  color: #666;
}
.tag-header{
  .flex(@jc:space-between,@ai:center);
  padding: 15px 0; 
}
.focus{
  .flex(@ai:center);
  &-icon{
    height: 2rem;
    margin-right: 1rem;
  }
}
.subs{
  .flex(flex-end,center);
  background-color: #f4f5f5;
  .sub{
    font-size: 1.3rem;
    margin-left: 2rem;
    cursor: pointer;
    color: #909090;
    &.active{
      color: @activeColor;
    }
  }
}
</style>
