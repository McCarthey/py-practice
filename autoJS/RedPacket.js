auto();
events.observeNotification();
events.onNotification(function (notification) {
    printNotification(notification);
});
toast("监听红包消息中，一来红包将自动跳转");

function printNotification(notification) {
    var appName = notification.getPackageName()
    if (!appName.includes('com.tencent.mm')) {
        return
    }
    var notiText = notification.getText()
    log("应用包名: " + appName);
    log("通知文本: " + notiText);
    if (notiText.includes('[微信红包')) {
        notification.click()
    }
}