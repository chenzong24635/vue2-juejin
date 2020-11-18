<template>
  <div class="">
    <hoc-com >
      <p slot="demo">demodemodemodemo</p>
    </hoc-com>
    <p @click="tob">BBBBBBBBB</p>
    <router-link :to="{path:'/B',query: {id:444}}">BBBB</router-link>
  </div>
</template>
<script>
import withPromise from '@/mixins/test.js'
const view = {
  template: `
    <span>
      <slot name="demo"></slot>
      <span>{{result}}</span>
    </span>
  `,
  data() {
    // 发送请求的时候要带上它
    return {
      requestParams: {
        name: 'ssh'
      }  
    }
  },
  props: ["result", "loading"],
};

// 假装这是一个 axios 请求函数
const request = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 1000);
  });
};

const hocCom = withPromise(view, request)
export default {
  components: {
    hocCom
  },
  created() {
    this.$Alert.info({
        content: '我是提示信息 1',
        duration: 50000
    });
    this.$Alert.info({
        content: '我是提示信息 2'
    });
  },
  methods: {
    tob(){
      this.$router.push({
        name: 'B',
        params: {
          id: 1313,
          name: 'bbb'
        }
      })
      /* this.$router.push({
        path: '/B',
        query: {
          id: 'dsdsds'
        }
      }) */
    }
  }
}
</script>