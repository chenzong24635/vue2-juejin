<template>
  <div class="">
    <!-- 所有标签 -->
    <!-- <ul class="subs">
      <li 
        @click="subChange(item, index)" 
        :class="['sub', index === subIndex ? 'active' : '']" 
        v-for="(item, index) in subNavs" :key="item.sort"
      >{{item.title}}</li>
    </ul> -->
  </div>
</template>
<script>

import tagAPI from '@/api/tag'
export default {
  name: '',
  components: {},
  data () {
    return {
      subNavs: [
        {
          sort: 'new',
          title: '最新'
        },
        {
          sort: 'hot',
          title: '最热'
        },
      ],
      sort: 'new',
      subIndex: 0,
    }
  },
  created () {
    console.log();
    // this.getLists();
  },
  methods: {
    async getLists() {
      let res = await tagAPI.subscribe();
      console.log(res);
    }
  }
}
</script>
<style scoped lang="less">
</style>
