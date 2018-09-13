function ArrayList() {
	var array = []
	this.insert = function (item) {
		array.push(item)
	}
	this.toString = function () {
		return array.join()
	}
}