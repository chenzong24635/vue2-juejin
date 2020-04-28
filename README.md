# svg封装
[vue中封装svg-icon组件并使用](https://www.cnblogs.com/lhjfly/p/10756650.html)

[svgo-优化SVG文件的Node.js工具](https://blog.csdn.net/qq_35366269/article/details/102716256)
[svgo](https://blog.csdn.net/qq_35366269/article/details/102716256)

# 分享
1.分享到QQ空间接口：https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=你的网址&sharesource=qzone&title=你的分享标题&pics=你的分享图片&summary=你的分享描述信息

2.分享给QQ好友接口：http://connect.qq.com/widget/shareqq/index.html?url=你的分享网址&sharesource=qzone&title=你的分享标题&pics=你的分享图片地址&summary=你的分享描述&desc=你的分享简述

3.分享到新浪微博接口：http://service.weibo.com/share/share.php?url=你的分享网址&sharesource=weibo&title=你的分享标题&pic=你的分享图片&appkey=你的key，需要在新浪微博开放平台中申请


# 
{
  operationName:"",
  query:"",
  variables:{
    type:"ALL",
    query:"vue3 onMounted",
    after:"",
    period:"ALL",
    first:20
  },
  extensions:{
    query:{
      "id":"a53db5867466eddc50d16a38cfeb0890"
    }
  }
}

# 话题
我关注的话题

https://short-msg-ms.juejin.im/v1/topicList/followed
```js
{
  uid: 59deb810f265da431f4a0dff
  device_id: 1587546014607
  token:  eyJhY2Nlc3NfdG9rZW4iOiJ4R25QdWRqWlJWYm45NzVhIiwicmVmcmVzaF90b2tlbiI6Ik0yaGZSSGNEdUxxZWVSS0UiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==
  src: web
  after: 0
  page: 0
  pageSize: 100
}
```

全部话题
https://short-msg-ms.juejin.im/v1/topicList
```js
{
  uid: 59deb810f265da431f4a0dff
  device_id: 1587546014607
  token: eyJhY2Nlc3NfdG9rZW4iOiJ4R25QdWRqWlJWYm45NzVhIiwicmVmcmVzaF90b2tlbiI6Ik0yaGZSSGNEdUxxZWVSS0UiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==
  src: web
  sortType: hot
  page: 0
  pageSize: 100
}
```

# 小册
头部tab列表
```js
https://xiaoce-timeline-api-ms.juejin.im/v1/getNavList
```

列表
```js
https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime

{
  uid: '59deb810f265da431f4a0dff',
  client_id: 1587546014607,
  token: ''
  src: 'web',
  alias: '',
  pageNum: 1,
}

alias：
  全部：''
  前端： 'frontend'
  后端： 'backend'
  。。。
```

# 首页

<!-- https://web-api.juejin.im/query -->

热门： order: "POPULAR"
最新： order: "NEWEST"
热榜： order: "THREE_DAYS_HOTTEST"

# 推荐
## -热门 | 最新 | 热榜（）
```js
{
  "operationName": "",
  "query": "",
  "variables": {
    "first": 20,
    "after": "",
    "order": "POPULAR" | "NEWEST" | "THREE_DAYS_HOTTEST"
  },
  "extensions": {
    "query": {
      "id":"21207e9ddb1de777adeaca7a2fb38030"
    }
  }
}
```
<!-- ## 关注
```js
{
  "operationName": "",
  "query": "",
  "variables": {
    "type": "ARTICLE",
    "first": 20,
    "after": ""
  },
  "extensions": {
    "query": {
      "id": "504f6ca050625a4270ba11eebe696b3c"
    }
  }
}
``` -->
## -后端
```js
{
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
```
### -后端-获取分类列表
```js
https://web-api.juejin.im/query
{
  "operationName":"",
  "query":"",
  "variables":{
    "category":"5562b419e4b00c57d9b94ae2",
    "limit":15
  },
  "extensions":{
    "query":{
      "id":"801e22bdc908798e1c828ba6b71a9fd9"
      }
    }
  }

```
