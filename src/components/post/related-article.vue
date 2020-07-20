<template >
  <section class="aside-box">
    <p class="aside-title">相关文章</p>
    <ul class="aside-lists">
      <li class="list" v-for="list in props.lists" :key="list.objectId">
        <router-link target="_blank" :to="'/post/'+ list.originalUrl.replace(/https:\/\/juejin.im\/post\//i,'')">
          <p class="list-title">{{list.title}}</p>
          <div class="list-actions">
            <p class="list-action">
              <svg-icon name="zan.e9d7698"></svg-icon>
              <span>{{list.collectionCount}}</span>
            </p>
            <p class="list-action">
              <svg-icon name="comment.a7c8341"></svg-icon>
              <span>{{list.commentsCount}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<style scoped lang="less">
.aside-lists{
  padding: 0 15px;
}
.list{
  padding: 10px 0;
  &-title{
    font-size: 14px;
  }
  &-actions{
    .flex(@ai:center);
  }
  &-action{
    padding-top: 5px;
    margin-right: 10px;
    span{
      color: #b2bac2;
      margin-left: 5px;
    }
  }
}
</style>
