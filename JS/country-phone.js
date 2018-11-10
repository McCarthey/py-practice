const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

const url = 'http://www.kjson.com/files/geo'
const path = './country-phone.json'

let result = []

function startRequest(url) {
    http.get(url, function(res) {
        let html = ''
        res.setEncoding('utf-8')
        res.on('data', function(chunk) {
            html += chunk
        })

        res.on('end', function() {
            const $ = cheerio.load(html)
            $('.panel-body table tr').each(function(idx, element) {
				const $element = $(element)
				if ($element.attr('bgcolor')) return
				let obj = {}
				$element.children().each(function (tdx, tdEle) {
					if (tdx === 2) {
						obj.country = $(tdEle).text()
					} 
					if (tdx === 3) {
						obj.num = `+${$(tdEle).text()}`
					}
				})
				if (!obj.country.trim()) return
				result.push(obj)
			})
			const jsonData = JSON.stringify(result)
			writeData(jsonData)
        })
    })
}

function writeData(dataToWrite) {
	fs.writeFile(path, `${dataToWrite}`, err => {
	    if (err) {
	        return console.error(err)
	    }
	    fs.readFile(path, (err, data) => {
	        if (err) {
	            return console.error(err)
	        }
	        console.log(`异步读取文件数据: ${data}`)
	    })
	})
}


startRequest(url)