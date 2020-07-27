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
<script lang="ts">
import {stateType} from '@/types/topics'

import topicsList from '@/components/topics/list';
import {topicList, topicListFollowed} from '@/api/topics';
import { reactive, toRefs, onMounted } from 'vue';

export default {
  components: {
    topicsList
  },
  setup() {
    let state: stateType = reactive({
      focusLists: [],
      allLists: [],
    })
    let getTopicList = async():Promise<void> => {
      let {s, d} = await topicList();
      if(s === 1) {
        state.allLists = d.list;
      }
    }
    let getTopicListFollowed= async():Promise<void> => {
      let {s, d} = await topicListFollowed();
      if(s === 1) {
        state.focusLists = d.list;
      }
    }

    onMounted(()=>{
      getTopicList()
      // state.isLogin && getTopicListFollowed()
    })

    return {
      ...toRefs(state),
      getTopicListFollowed
    }
  },
}
</script>
<style scoped >
.title{
  text-indent: 1.2rem;
  margin-top: 4rem;
}
</style>
