<template>
  <div class="">
    <ul>
      <li 
        v-for="list in lists"
        :key="list.objectId"
      >
        <list-detail :list="list" />
        <article-actions 
          :likeCount="list.likedCount"
          :commentCount="list.commentCount"
        />
      </li>
    </ul>
    
  </div>
</template>
<script>
import listDetail from '@/components/pins/list-detail2.vue'
export default {
  name: '',
  components: {listDetail},
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
li{
  margin-bottom: 10px;
  background-color: #fff;
}
</style>
