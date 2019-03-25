/**
 * 装饰器@expression，expression求值后必须为一个函数
 * @param target 
 */

function Path(target:any) {
    console.log("I am decorator.")
}

@Path
class HelloService {}