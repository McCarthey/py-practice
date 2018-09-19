const fs = require('fs')

const PATH = '/SPA/air_drop/src/entries/a_ddd/view/luxy_coin/home_components/imgs/'

// 遍历目录得到文件信息
function getFiles(path, callback) {
    const files = fs.readdirSync(path)

    files.forEach(fileName => {
		if (fs.statSync(`${path}/${fileName}`).isFile() && fs.statSync(`${path}/${fileName}`).size > 10000) {
            callback(path, fileName)
        }
    })
}

// 重命名
function rename(oldPath, newPath) {
    fs.rename(oldPath, newPath, err => {
        if (err) {
            throw err
        }
    })
}

getFiles(PATH, (path, fileName) => {
	const oldpath = `${path}/${fileName}`
	// const newPath = oldpath.replace('loveblock_', '')
	const newPath = `${path}/loveblock_${fileName}`
	rename(oldpath, newPath)
})