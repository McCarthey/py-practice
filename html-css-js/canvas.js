// canvas元素默认大小是300px * 150px，可以使用html的width height属性定义大小
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'green'
ctx.fillRect(10, 10, 100, 100)