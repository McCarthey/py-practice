# Docker
### Docker简介
[参见](https://yeasy.gitbooks.io/docker_practice/introduction/)

### 基本概念
- 镜像(image)
- 容器(container)
- 仓库(Repository)

### 镜像
- 获取镜像
    ```bash
    docker pull ubuntu:18.04
    ```
- 列出镜像
    ```bash
    docker image ls
    ```
- 删除本地镜像
    ```bash
    docker image rm <镜像ID前几位> 
    ```
    或
    ```bash
    docker image rm <仓库名>:<标签>
    ```
- 镜像保存
    ```bash
    docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]  
    ```
    **不推荐**用来保存镜像，相当于黑盒操作，这里仅用来理解镜像的构成
- Dockerfile 定制镜像
    - From 指定基础镜像
    - RUN 执行命令

    例如:
    ```bash
    FROM nginx
    RUN echo '<h1>Hello, Docker from Dockerfile!</h1>' > /usr/share/nginx/html/index.html 
    ```
    这里修改了nginx官方镜像的默认页面

- Dockerfile 构建镜像

    在上一步包含Dockerfile的目录中执行：
    ```bash
    docker build -t nginx:v3
    ```
### 容器
- 启动容器：
    ```bash
    docker run -dit nginx:v3
    ```
    -d：后台运行；-i：让容器的标准输入保持打开；-t：让Docker分配一个伪终端并绑定到容器的标准输入上；

- 终止容器：
    ```bash
    docker container stop <容器ID>
    ```
- 启动已终止容器：
    ```bash
    docker container start <容器ID>
    ```
- 进入容器
    ```bash
    docker exec -it <容器ID> bash
    ```
    用以进入后台运行的容器
- 删除容器
    ```bash
    docker container rm <容器ID> -f
    ```
    -f 参数表示强制删除正在运行中的容器
    ```bash
    docker container prune
    ```
    可以清除掉所有处于终止状态的容器