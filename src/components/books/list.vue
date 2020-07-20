<template functional>
  <div class="">
    <ul class="lists">
      <li 
        class="list" 
        v-for="item in props.lists"
        :key="item.id"
      >
        <router-link target="_blank" :to="'/book/' + item.id" class="list-a">
          <img :src="item.img" alt="" class="list-img">
          <div class="list-cnt">
            <h1 class="title">{{item.title}}</h1>
            <p class="desc">{{item.desc}}</p>
            <div class="user">
              <router-link class="user-a" :to="'/user/'+ item.userData.uid" target="_blank">
                <img class="user-avatar" :src="item.userData.avatarLarge" alt="" >
                <span class="user-name">{{item.userData.username}}</span>
                <span v-if="item.userData.level" class="user-level">Lv{{item.userData.level}}</span>
              </router-link>
              <p class="user-profile">{{item.profile}}</p>
            </div>
            <div class="other">
              <span class="other-price">￥ {{item.price}}</span>
              <span class="dot other-section">{{item.lastSectionCount}}小节</span>
              <span class="dot other-buy">{{item.buyCount}}人已购买</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="less">
.lists{
  width: 700px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(4,5,13,.23);
}
.list{
  padding: 2rem;
  .line();
  &:hover{
    background-color: #f7f9f9;
  }
  &-a{
    .flex();
  }
  &-img{
    width: 100px;
    height: 140px;
    flex-shrink: 0;
    box-shadow: 3px 4px 12px 0 rgba(0,0,0,.2);
    overflow: hidden;
    background-color: #ccc;
  }
  &-cnt{
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 14px;
    color: #2e3135;
    padding-left: 22px;
    margin: .5rem 0;
    .title{
      font-size: 20px;
      font-weight: 400;
    }
    .desc{
      margin-top: 5px;
      line-height: 20px;
      height: 20px;
      color: #71777c;
      .ov();
    }
    .user{
      .flex(@ai:center,@wrap:nowrap);
      margin: .5rem 0;
      &-a{
        .flex(@ai:center);
      }
      &-avatar{
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        margin-right: 4px;
        object-fit: cover;
        background-color: #eee;
      }
      &-name{
        color: #000;
        font-weight: 400;
        font-size: 1.25rem;
        margin: 0 5px;
      }
      &-level{
        font-size: 12px;
        -webkit-transform:scale(.8, .8);
        transform: scale(.8, .8);
        padding: 1px 2px;
        border-radius: 1px;
        color: #fff;
        background-color: #6ECEFF;
      }
      &-profile{
        color: #71777c;
        white-space: nowrap;
        margin: 0 10px;
        .ov();
      }
    }
    .other{
      margin: .5rem 0;
      .flex(@ai:center);
      &-price{
        color: #ed7b11;
        font-size: 18px;
        margin-right: 1rem;
      }
      .dot{
        .delimiter('·');
        opacity: .6;
        font-size: 13px;
        color: #71777c;
      }
    }
  }
}
</style>
