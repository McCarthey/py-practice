/**
 * 装饰器@expression，expression求值后必须为一个函数
 * @param target 
 */

function Path(p1: string, p2: string) {
    return function (target) { //  这才是真正装饰器
        // do something 
        console.log(p1 + p2)
    }
}

@Path("/hello", "world")
class HelloService {}