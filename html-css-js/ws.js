var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8777 });

// 连接池
var clients = [];

wss.on('connection', function(ws) {
    // 将该连接加入连接池
	clients.push(ws);
	ws.on('open', function(message) {
		console.log('hello dude!')
		ws.send('Hello Dude');
	});
	
    ws.on('message', function(message) {
		// 广播消息
		console.log('receiced ' + message)
        clients.forEach(function(ws1) {
            if (ws1 !== ws) {
                ws1.send(message);
            }
        })
    });

    ws.on('close', function(message) {
		// 连接关闭时，将其移出连接池
		console.log('close')
        clients = clients.filter(function(ws1) {
            return ws1 !== ws
        })
    });
});