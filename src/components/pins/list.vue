<template>
  <div class="">
    <ul>
      <li class="list" v-for="item in listsNew" :key="item.id">
        <list-detail1 v-if="type === 'recommended' || type === 'following'" :user="item" v-bind="$attrs" />
        <list-detail2 v-else-if="type === 'hot' " :user="item" v-bind="$attrs" />
      </li>
    </ul>
  </div>
</template>
<script>
import listDetail1 from './list-detail1.vue'
import listDetail2 from './list-detail2.vue'
export default {
  name: '',
  components: {
    listDetail1,
    listDetail2
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: true
    },
    lists: {
      type: Array,
      required: true
    }
  },

  computed: {
    listsNew: {
      get (){
        return this.lists.map(item => item.node)
      }
    }
  },
  data () {
    return {}
  },
  created () {
    console.log(this.$attrs);
  },
  methods: {}
}
</script>
<style scoped lang="less">
.list{
  padding: 20px;
  margin-bottom: 6px;
  background-color: #fff;
}
</style>
