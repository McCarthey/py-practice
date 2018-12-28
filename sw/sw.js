/* eslint-disable */
self.addEventListener('install', function(event) {
    self.skipWaiting()
});

self.addEventListener('activate', function(event) {
    return self.clients.claim()
});

self.addEventListener('push', function(event) {
    var data = event.data;
    if (event.data) {
        data = data.json();
        console.log('Push message is :', data);
        var title = data.maintitle || 'Luxy Push';
        var options = {
            body: data.subtitle,
            icon: 'https://pytest.onluxy.com/static/img/logo_120.png',
            tag: 'Luxy',
            renotify: true
        };
        console.log('test', self.clients)
        self.clients.matchAll({
            includeUncontrolled: true
        }).then(function(clients) {
            var client = clients[0]
            console.log('teasdasd', client)
            if (!clients.length || client.visibilityState !== 'visible') {
                self.registration.showNotification(title, options)
            }
        })
    } else {
        console.log('No push messages');
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
        self.clients.matchAll({
            includeUncontrolled: true
        }).then(function(clients) {
            if (clients.length === 0) {
                self.clients.openWindow && self.clients.openWindow('https://py.onluxy.com/user_center.html#/');
                return
            }
            var client = clients[0]
            // console.log(client)
            if (!client.focused) {
                client.focus()
            }
        })
    );
});