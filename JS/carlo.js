const carlo = require('carlo');

(async () => {
    // Launch the browser
    const app = await carlo.launch()

    // Terminate Note.js process on app window closing
    app.serveFolder(__dirname)

    // Expose 'env' function in the web environment
    await app.exposeFunction('env', _ => process.env)

    // Navigate to the main page of your app
    await app.load('carlo.html')
})()