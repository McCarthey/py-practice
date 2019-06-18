# redis

Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、**可基于内存亦可持久化的日志型、Key-Value 数据库**，并提供多种语言的 API。

## 安装及配置

Redis 默认配置是没有密码的（很多云服务器的因此被攻击），修改 redis.conf 中的

```
#requirepass foobared
```

为

```
requirepass myRedis
```

以启用密码

## node.js 中使用

可以结合 bluebird 将 redis 中的 api 全部 promise 化

```javascript
const redis = require("redis");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  password: "XXXX"
});

try {
  const isExist = await redisClient.existsAsync(key);
  if (isExist) {
    console.log("[key是否存在]", isExist);
    const html = await redisClient.getAsync(key);
    res.setHeader("x-cache", "HIT");
    return res.send(html);
  } else {
    const genHtml = await res.nextServer.renderToHTML(req, res, path, response);

    if (res.statusCode !== 200) {
      return res.send(genHtml);
    }

    redisClient.set(key, genHtml, "EX", 10);

    res.setHeader("x-cache", "MISS");
    return res.send(genHtml);
  }
} catch (err) {
  console.log(err);
}
```
上例以html缓存为例
