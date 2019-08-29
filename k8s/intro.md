# 什么是 Kubernetes

Kubernetes（k8s）是自动化容器操作的开源平台，这些操作包括部署，调度和节点集群间扩展。如果你曾经用过 Docker 容器技术部署容器，那么可以将 Docker 看成 Kubernetes 内部使用的低级别组件。Kubernetes 不仅仅支持 Docker，还支持 Rocket，这是另一种容器技术。 使用 Kubernetes 可以：

- 自动化容器的部署和复制
- 随时扩展或收缩容器规模
- 将容器组织成组，并且提供容器间的负载均衡
- 很容易地升级应用程序容器的新版本
- 提供容器弹性，如果容器失效就替换它，等等...

# 集群

集群是一组节点，这些节点可以是物理服务器或者虚拟机，之上安装了 Kubernetes 平台。

组件包括:

- PodContainer（容器）
- Label（标签）
- Replication Controller（复制控制器）
- Service（服务）
- Node（节点）
- Kubernetes Master（Kubernetes 主节点）

## Pod

Pod安排在节点上，包含一组容器和卷。同一个Pod里的容器共享同一个网络命名空间，可以使用localhost互相通信。Pod是短暂的，不是持续性实体。

- 如果Pod是短暂的，那么我怎么才能持久化容器数据使其能够跨重启而存在呢？ 是的，Kubernetes支持**卷**的概念，因此可以使用持久化的卷类型。
- 是否手动创建Pod，如果想要创建同一个容器的多份拷贝，需要一个个分别创建出来么？可以手动创建单个Pod，但是也可以使用Replication Controller使用Pod模板创建出多份拷贝，下文会详细介绍。
- 如果Pod是短暂的，那么重启时IP地址可能会改变，那么怎么才能从前端容器正确可靠地指向后台容器呢？这时可以使用Service，下文会详细介绍。

## Label

一些Pod有Label。一个Label是绑定到Pod的一对键/值对，用来传递用户定义的属性。Label用来标记Pod，比如可以标记成前端、后端Pod，并通过Selectors选择带有特定Label的Pod，并将Service或者Replication Controller应用到上面。

## Replication Controller

如果为某个Pod创建了Replication Controller并且指定3个副本，它会创建3个Pod，并且持续监控它们。如果某个Pod不响应，那么Replication Controller会替换它，保持总数为3。

当创建Replication Controller时，需要指定两个东西：

- Pod模板：用来创建Pod副本的模板
- Label：Replication Controller需要监控的Pod的标签。现在已经创建了Pod的一些副本，那么在这些副本上如何均衡负载呢？我们需要的是Service。

## Service

如果Pods是短暂的，那么重启时IP地址可能会改变，怎么才能从前端容器正确可靠地指向后台容器呢？

假定有2个后台Pod，并且定义后台Service的名称为‘backend-service’,

- 会为Service创建一个本地集群的DNS入口，因此前端Pod只需要DNS查找主机名为 ‘backend-service’，就能够解析出前端应用程序可用的IP地址。
- 现在前端已经得到了后台服务的IP地址，但是它应该访问2个后台Pod的哪一个呢？Service在这2个后台Pod之间提供透明的负载均衡，会将请求分发给其中的任意一个（如下面的动画所示）。通过每个Node上运行的代理（kube-proxy）完成。

## Pod与Node

Pod总是运行在Node节点上。Node是Kubernetes的工作机器，可以是虚拟机或物理机。每个节点由Master管理，一个节点上可以有多个Pod，K8s master 会自动处理调度集群各个节点上的 Pod

## Port、NodePort、TargetPort

- port：表示service暴露在cluster ip 上的端口。<clusterIp>:port 是提供给集群内部客户访问service的入口。
- nodePort: nodePort是kubernetes提供给集群外部客户访问service入口的一种方式。所以，<nodeIP>:nodePort 是提供给集群外部客户访问service的入口。
- targetPort：targetPort是pod上的端口，从port和nodePort上到来的数据最终经过kube-proxy流入到后端pod的targetPort上进入容器。