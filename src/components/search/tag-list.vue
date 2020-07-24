<template>
  <ul class="lists">
    <li @click.stop="linkTo(item)" class="list" v-for="item in listsNew" :key="item.entity.id">
      <img :src="item.entity.icon" alt="" class="list-avatar">
      <div class="list-cnt">
        <div class="cnt-box">
          <p class="list-username" v-html="item.highlight.username || item.entity.username"></p>
        </div>
        <p class="list-count">
          <span v-if="item.entity.subscribersCount" >{{item.entity.subscribersCount}}关注 · </span>
          <span v-if="item.entity.entryCount" >{{item.entity.entryCount}}文章</span>
        </p>
      </div>
      <focus-button></focus-button>
    </li>
  </ul>
</template>
<script>
import {mapActions} from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: '',
  props: {
    lists: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'home'
    },
    hasNextPage: { //是否有下一页
      type: Boolean,
      default: true
    },
  },
  setup(props) {
    let listsNew = computed(()=>{
      let arr = props.lists.map(item => {
        if(item.node){
          return item.node
        }else {
          return item
        }  
      })
      return arr
    }) 
    let router = useRouter()
    function linkTo(item) {
      let routeUrl = router.resolve(`/tag/${item.entity.id}`)
      window.open(routeUrl.href, '_blank');
    }
    return {
      listsNew,
      linkTo,
      ...mapActions([
        'showLoginModel'
      ])
    }
  },
}
</script>
<style scoped lang="less">
@import '../../assets/css/search.less';

/deep/ .list-count{
  color: #2e3135;
  font-size: 14px;
  opacity: 1;
}
</style>
