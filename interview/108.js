var name = 'Tom';
(function () {
    if (typeof name == 'undefined') {
        var name = 'Jack'; // 变量提升至作用域顶端 但未赋值 因此目前是undefined；若改成let，则输出'Hello Tom'
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
}
})(); // 'Goodbye Jack'
