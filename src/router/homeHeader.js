// <!--部分页面的头部（首页，小册）二级导航 -->
const homeList = () => import('@/components/common/common-list1.vue')

const homeHeader = [
  {
    path: '/home/recommended',
    name: 'recommended',
    props: {
      sort: ''
    },
    meta: {
      title: '推荐',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "21207e9ddb1de777adeaca7a2fb38030"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/backend',
    name: 'backend',
    meta: {
      title: '后端',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "5562b419e4b00c57d9b94ae2",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/frontend',
    name: 'frontend',
    meta: {
      title: '前端',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "5562b415e4b00c57d9b94ac8",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/android',
    name: 'android',
    meta: {
      title: 'Android',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "5562b410e4b00c57d9b94a92",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/ios',
    name: 'ios',
    meta: {
      title: 'IOS',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "5562b405e4b00c57d9b94a41",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/ai',
    name: 'ai',
    meta: {
      title: '人工智能',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "57be7c18128fe1005fa902de",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/freebie',
    name: 'freebie',
    meta: {
      title: '开发工具',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "5562b422e4b00c57d9b94b53",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/career',
    name: 'career',
    meta: {
      title: '代码人生',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "5c9c7cca1b117f3c60fee548",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
  {
    path: '/home/article',
    name: 'article',
    meta: {
      title: '阅读',
      apiData: {
        operationName: "",
        query: "",
        variables: {
          tags: [],
          category: "5562b428e4b00c57d9b94b9d",
          first: 20,
          after: "",
          order: "POPULAR"
        },
        extensions: {
          query: {
            id: "653b587c5c7c8a00ddf67fc66f989d42"
          }
        }
      }
    },
    component: homeList,
  },
]
export default  homeHeader