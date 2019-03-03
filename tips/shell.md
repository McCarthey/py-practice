- shell 学习

    ```shell
    mode=1
    if [ $1 == $mode ]
    then
        gulp --p luxy build && cp ./dist/luxy/index.html /d/onluxy/template/dev_spa/home/index.html
    else
        gulp --p luxy build && cp ./dist/luxy/index.html /d/onluxy/template/spa/home/index.html
    fi
    ```
- nvm

    切换nvm下载源
    ```shell
    nvm node_mirror http://npm.taobao.org/mirrors/node/ 
    nvm npm_mirror https://npm.taobao.org/mirrors/npm/
    ```
