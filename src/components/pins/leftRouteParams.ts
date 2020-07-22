// 左侧导航路由参数
// https://web-api.juejin.im/query
const leftRoutes1 = [
  {
    name: 'recommended',
    title: '推荐',
    apiData: {
      operationName: "",
      query: "",
      variables: {
        size: 20,
        after: "",
      },
      extensions: {
        query: {
          id: "249431a8e4d85e459f6c29eb808e76d0"
        }
      }
    }
  },
  {
    name: 'hot',
    title: '热门',
    apiData: {
      operationName: "",
      query: "",
      variables: {
        first: 20,
        after: "",
      },
      extensions: {
        query: {
          id: "f0a2fbbc03d4d46266e40762139c414c"
        }
      }
    }
  },
  {
    name: 'following',
    title: '关注',
    apiData: {
      operationName: "",
      query: "",
      variables: {
        type: "MAIN",
        size: 20,
        after: "",
        since: "" //new Date()
      },
      extensions: {
        query: {
          id: "648c28f5213f7d3601f4d5efa7fa3826"
        }
      }
    }
    /* apiData: {
      operationName: "",
      query: "",
      variables: {
        excluded: [],
        limit: 24
      },
      extensions: {
        query: {
          id: "2dc8fd603ff34277d121086abc655ff5"
        }
      }
    } */
  },
]

// https://short-msg-ms.juejin.im/v1/pinList/topic
const leftRoutes2 = [
  {
    name: '5c09ea2b092dcb42c740fe73',
    title: '开源推荐',
  },
  {
    name: '5abb61e1092dcb4620ca3322',
    title: '内推招聘',
  },
  {
    name: '5abcaa67092dcb4620ca335c',
    title: '掘金相亲',
  },
  {
    name: '5c106be9092dcb2cc5de7257',
    title: '上班摸鱼',
  },
  {
    name: '5b514af1092dcb61bd72800d',
    title: '应用安利',
  },
  {
    name: '5abb67d2092dcb4620ca3324',
    title: '开发工具',
  },
  {
    name: '5c46a17f092dcb4737217152',
    title: 'New资讯',
  },
]
export default [...leftRoutes1,...leftRoutes2]