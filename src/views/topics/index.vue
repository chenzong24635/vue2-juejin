<template>
  <div class="container">
    <div v-if="isLogin">
      <h1 class="title">我关注的话题</h1>
      <topics-list :type="1" :lists="focusLists" />
    </div>
    <div>
      <h1 class="title">全部话题</h1>
      <topics-list :lists="allLists" />
    </div>
    <div class="root-view-bg"></div>
  </div>
</template>
<script>
import topicsList from '@/components/topics/list';
import {topicList, topicListFollowed} from '@/api/topics.js';
import {mapState} from 'vuex';

export default {
  components: {
    topicsList
  },
  data() {
    return {
      focusLists: [],
      allLists: [],
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  created() {
    this.getTopicList();
    this.isLogin && this.getTopicListFollowed();
  },
  methods: {
    async getTopicList() {
      let {s, d} = await topicList();
      console.log(s, d);
      if(s === 1) {
        this.allLists = d.list;
      }
    },
    async getTopicListFollowed() {
      let {s, d} = await topicListFollowed();
      console.log(s, d);
      if(s === 1) {
        this.focusLists = d.list;
      }
    },
  }
}
</script>
<style scoped >

.title{
  text-indent: 1.2rem;
  margin-top: 4rem;
}

</style>
