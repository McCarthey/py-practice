# Zipkin

## 架构
zipkin架构分为两部分: 
- zipkin server
- zipkin client

zipkin server 主要包括四个模块：
- Collector 接收或收集各应用传输的数据
- Storage 存储接受或收集过来的数据，当前支持Memory，MySQL，Cassandra，ElasticSearch等，默认存储在内存中。
- API（Query） 负责查询Storage中存储的数据，提供简单的JSON API获取数据，主要提供给web UI使用
- Web 提供简单的web界面

## 概念
- traceId: 用来确定一个追踪链的16字符长度的字符串，在某个追踪链中保持不变。
- spanId: 区域Id，在一个追踪链中spanId可能存在多个，每个spanId用于表明在某个服务中的身份，也是16字符长度的字符串。
- parentId: 在跨服务调用者的spanId会传递给被调用者，被调用者会将调用者的spanId作为自己的parentId，然后自己再生成spanId。