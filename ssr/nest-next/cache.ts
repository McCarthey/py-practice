const LRUCache = require('lru-cache');
const ssrCache = new LRUCache({
    max: 100 * 1024 * 1024 /* cache size will be 100 MB using `return n.length` as length() function */,
    length(n, key) {
        return n * 2 + key.length;
    },
    maxAge: 1000 * 60 * 60 * 24 * 30, // ms
});

export async function useCache(req: any, res: any, path: string, query: any, response) {
    const key = path + JSON.stringify(query);
    if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT');
        return res.send(ssrCache.get(key));
    }

    try {
        const html = await res.nextServer.renderToHTML(req, res, path, response);
        // console.log('[要缓存的内容]', html);

        if (res.statusCode !== 200) {
            return res.send(html);
        }

        ssrCache.set(key, html);

        res.setHeader('x-cache', 'MISS');
        return res.send(html);
    } catch (err) {
        console.log(err);
    }
}
