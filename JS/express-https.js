const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const http = require('http')
const https = require('https')

const privatekey = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf-8')
const certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf-8')
const credentials = {key: privatekey, cert: certificate}

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

const PORT = 8000
const SSLPORT = 8001

httpServer.listen(PORT, () => {
	console.log('HTTP Server is running on: http://localhost:%s', PORT)
})

httpsServer.listen(SSLPORT, () => {
	console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})

app.get('/', (req, res) => {
	if (req.protocol === 'https') {
		res.status(200).send('This is https visit!')
	} else {
		res.status(200).send('This is http visit')
	}
})