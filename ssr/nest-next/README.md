- nest-next-module
- 修改next目录结构，将nest程序整合到此处（可以将nest项目中的src目录重命名为server，便于查找）
- 为pages目录下的文件编写对应的controller
- 修改package.json中的启动脚本 
- next页面缓存：

    - [官方实例](https://github.com/zeit/next.js/blob/master/examples/ssr-caching/server.js)
    - [cache all pages](https://medium.com/@igordata/how-to-cache-all-pages-in-next-js-at-server-side-1850aace87dc)
    - eg:
    ```javascript
    const express = require('express');
    const next = require('next');
    const LRUCache = require('lru-cache');

    const port = parseInt(process.env.PORT, 10) || 3000;
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({dev});
    const handle = app.getRequestHandler();

    // This is where we cache our rendered HTML pages
    const ssrCache = new LRUCache({
        max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
        length: function (n, key) {
            return n.length
        },
        maxAge: 1000 * 60 * 60 * 24 * 30 // ms
    });

    app.prepare()
        .then(() => {
            const server = express();

            server.get('/_next/*', (req, res) => {
                /* serving _next static content using next.js handler */
                handle(req, res);
            });

            server.get('*', (req, res) => {
                /* serving page */
                return renderAndCache(req, res)
            });

            /* starting server */
            server.listen(port, (err) => {
                if (err) throw err;
                console.log(`> Ready on http://localhost:${port}`)
            })
        });

    /*
    * NB: make sure to modify this to take into account anything that should trigger
    * an immediate page change (e.g a locale stored in req.session)
    */
    function getCacheKey(req) {
        return `${req.path}`
    }

    async function renderAndCache(req, res) {
        const key = getCacheKey(req);

        // If we have a page in the cache, let's serve it
        if (ssrCache.has(key)) {
            //console.log(`serving from cache ${key}`);
            res.setHeader('x-cache', 'HIT');
            res.send(ssrCache.get(key));
            return
        }

        try {
            //console.log(`key ${key} not found, rendering`);
            // If not let's render the page into HTML
            const html = await app.renderToHTML(req, res, req.path, req.query);

            // Something is wrong with the request, let's skip the cache
            if (res.statusCode !== 200) {
                res.send(html);
                return
            }

            // Let's cache this page
            ssrCache.set(key, html);

            res.setHeader('x-cache', 'MISS');
            res.send(html)
        } catch (err) {
            app.renderError(err, req, res, req.path, req.query)
        }
    }
    ```


    ## nest.js打包优化

    [ncc](https://github.com/zeit/ncc)可以将node_modules中相关模块打包，从而让nest.js应用摆脱对node_modules的依赖。

    根据这个issue：[ncc doesn't work with swagger in nest](https://github.com/zeit/ncc/issues/406)，需要在生产环境剔除swagger。

    next.config.js中的next-css、next-sass、next-typescript等插件不应该在打包后的生产环境中存在，否则在nest.js应用启动时，会提示缺少依赖（ncc未将这些依赖打包，也不应该打包）。因此需要在next.config.js中做好环境的判断。

    正式环境报错[Cannot find module '../core-js/object/define-property'](https://github.com/zeit/next.js/issues/6332)意思babel新版本的问题，需要手动安装core-js