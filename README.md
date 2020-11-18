
# 
package.json
```json
"eslintConfig": {
  "rules": {
    "no-unused-vars": "off" // 添加
  }
}
```

# flex 布局中，保持内容不超出容器的解决办法

- min-width:0;
- flex: 1;width:0;
- flex: 1;overflow: hidden;

# svg 封装

[vue 中封装 svg-icon 组件并使用](https://www.cnblogs.com/lhjfly/p/10756650.html)

[svgo-优化 SVG 文件的 Node.js 工具](https://blog.csdn.net/qq_35366269/article/details/102716256)

# 分享

1.分享到 QQ 空间接口：https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=你的网址&sharesource=qzone&title=你的分享标题&pics=你的分享图片&summary=你的分享描述信息

2.分享给 QQ 好友接口：http://connect.qq.com/widget/shareqq/index.html?url=你的分享网址&sharesource=qzone&title=你的分享标题&pics=你的分享图片地址&summary=你的分享描述&desc=你的分享简述

3.分享到新浪微博接口：http://service.weibo.com/share/share.php?url=你的分享网址&sharesource=weibo&title=你的分享标题&pic=你的分享图片&appkey=你的key，需要在新浪微博开放平台中申请


# 访问图片出现 403 的解决办法

方法一：使用 no-referrer

这种方案不仅针对图片的防盗链,还可以是其他标签.  
在前端页面头部添加一个 meta

```html
<meta name="referrer" content="no-referrer" />
```

方法二：使用 images.weserv.nl

```js
getImage(url){
	console.log(url);
	// 把现在的图片连接传进来，返回一个不受限制的路径
	if(url !== undefined){
		return url.replace(/^(http)[s]*(\:\/\/)/,'https://images.weserv.nl/?url=');
	}
}

```

原理

http 请求中的 referrer

- http 请求体的 header 中有一个 referrer 字段，用来表示发起 http 请求的源地址信息，这个 referrer 信息是可以省略但是不可修改的，就是说你只能设置是否带上这个 referrer 信息，不能定制 referrer 里面的值。

- 服务器端在拿到这个 referrer 值后就可以进行相关的处理，比如图片资源，可以通过 referrer 值判断请求是否来自本站，若不是则返回 403 或者重定向返回其他信息，从而实现图片的防盗链。上面出现 403 就是因为，请求的是别人服务器上的资源，但把自己的 referrer 信息带过去了，被对方服务器拦截返回了 403。

- 在前端可以通过 meta 来设置 referrer policy(来源策略)，具体可以设置哪些值以及对应的结果参考这里。所以针对上面的 403 情况的解决方法，就是把 referrer 设置成 no-referrer，这样发送请求不会带上 referrer 信息，对方服务器也就无法拦截了。
