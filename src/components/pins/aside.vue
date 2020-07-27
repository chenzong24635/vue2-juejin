<template>
  <aside class="aside">
    <h3 class="aside-title">{{title}}</h3>
    <ul class="aside-lists">
      <li class="aside-list" v-for="item in newLists" :key="item.objectId">
        <router-link :to="'/pin/' + item.objectId" target="_blank">
          <div class="list-left">
            <p class="list-left-title">{{item.content}}</p>
            <div class="list-left-msg">
              <span>{{item.likedCount}}</span>
              <span>赞</span>
              <span>·</span>
              <span>{{item.commentCount}}</span>
              <span>评论</span>
            </div>
          </div>
          <div class="list-right">
            <img v-if="item.pictures.length" class="list-right-img" :src="item.pictures[0]" alt="">
          </div>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
<script lang="ts">
import { computed } from 'vue'
import { objType } from '@/types/commons'
export default {
  name: '',
  props: {
    title: {
      type: String,
      required: true
    },
    lists: {
      type: Array,
      required: true
    }
  },
  setup(props: objType){
    let newLists: any[] = computed(() => { //只显示前三个
      return props.lists.slice(0, 3)
    })
    return {
      newLists
    }
  }

}
</script>
<style scoped lang="less">
.aside{
  background-color: #fff;
  &-title{
    color: #2e3135;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.07;
    padding: 13px 16px;
    &:not(:last-child){
      border-bottom: 1px solid hsla(0,0%,59.2%,.1);
    }
  }
  &-lists{
    padding: 0 1.5rem;
  }
  &-list {
    .line(bottom);
    padding: 5px 0;
    a{.flex(space-between);}
  }
  .list{
    
    &-left{
      &-title{
        flex: 1;
        padding-right: 1rem;
        font-size: 13px;
        .ov();
      }
      &-msg{
        .flex();
        margin-top: 30px;
        &>span{
          color: @color;
          padding: 0 2px;
        }
      }
    }
    &-right{
      width: 35%;
      &-img{
        max-width: 80px;
        height: 80px;
        border-radius: 0.5rem;
        object-fit: cover;
      }
    }
  }
}
</style>
