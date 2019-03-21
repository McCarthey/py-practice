
/**
 * 本文件内代码段均可使用在线JSBin测试
 * https://jsbin.com/nuhita/5/edit?js,console,output
 */

/**
 * Observer(观察者对象): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
 * Observable(可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
 * subscribe(订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
 */



const Rx = require('rxjs/Rx')
/** 
 * Observable被称为可观察对象
 */
/**
 * 创建Observable: create, from, of, fromEvent, fromPromise，never，empty，throw，interval，timer等
 */
// var observable = Rx.Observable
//     .create(function (observer) {
//         observer.next('Jerry')
//         observer.next('Tom')
//     })
// console.log('start')
// observable.subscribe((val) => {
//     console.log(val)
// })
// console.log('end') // 'start'=> 'Jerry' => 'Tom' => 'end' 证明此处是同步的

/**
 * Observer被成为观察者，有next error complete三个方法
 */
// var observable = Rx.Observable
//     .create(function (observer) {
//         observer.next('Jerry')
//         observer.next('Tom')
//         observer.complete()
//         observer.next('not work')
//     })

// var observer = {
//     next: function(val) {
//         console.log(val)
//     },
//     error: function(err) {
//         console.log(err)
//     },
//     complete: function() {
//         console.log('complete')
//     }
// }

// observable.subscribe(observer) // Jerry => Anna => complete
// 或者直接写在subscribe()中
// observable.subscribe(
//     value => {console.log(value)},
//     error => {console.log(error)},
//     () => {console.log('complete')}
// )
// 另外，观察者可以是不完整的，可以只具有next这一个方法

/**
 * of：可以同步地传递几个值，如上述代码等同于：
 */
// var source = Rx.Observable.of('Jerry', 'Tom')

// source.subscribe({
//     next: function(value) {
//         console.log(value)
//     },
//     error: function(err) {
//         console.log(err)
//     },
//     complete: function() {
//         console.log('complete')
//     }
// }) // Jerry => Anna => complete

/**
 * from：接受任何可枚举的参数:
 */
// var arr = ['Jerry', 'Tom', 2016, 2017, '30 days']
// var source = Rx.Observable.from(arr)

// source.subscribe({
//     next: function (value) {
//         console.log(value)
//     },
//     error: function (err) {
//         console.log(err)
//     },
//     complete: function () {
//         console.log('complete')
//     }
// }) // "Jerry" "Tom" 2016 2017 "30 days" "complete"

/**
 * from也可接受字符串：
 */
// var source = Rx.Observable.from('铁人赛');

// source.subscribe({
//     next: function(value) {
//         console.log(value)
//     },
//     complete: function() {
//         console.log('complete!');
//     },
//     error: function(error) {
//         console.log(error)
//     }
// });

// 铁
// 人
// 赛
// complete!

/**
 * from: 也可以传入一个promise (也可使用fromPromise)
 */
// var source = Rx.Observable.from(new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hello RxJs')
//     }, 3000)
// }))

// source.subscribe({
//     next: function (value) {
//         console.log(value)
//     },
//     complete: function () {
//         console.log('complete!');
//     },
//     error: function (error) {
//         console.log(error)
//     }
// })

/**
 * fromEvent: 第一个参数是DOM对象，第二个传入要监听的事件名称
 */
var source = Rx.Observable.fromEvent(document.body, 'click')

source.subscribe({
    next: function (value) {
        console.log(value)
    },
    complete: function () {
        console.log('complete!');
    },
    error: function (error) {
        console.log(error)
    }
})

/**
 * empty,never,throw
 */

/**
 * interval
 */
// var source = Rx.Observable.create(function(observer) {
//     var i = 0;
//     setInterval(() => {
//         observer.next(i++);
//     }, 1000)
// }); // 订阅上述observable后会每隔一秒输出0,1,2...，等同于：
// var source = Rx.Observable.interval(1000)

/**
 * timer：接受两个参数，第一个参数代表要发出第一个值的等待时间(ms)，第二个参数代表第一次之后发送值的间隔时间
 */
// var source = Rx.Observable.timer(1000, 5000)

// var source = Rx.Observable.timer(1000); // 也可接受一个参数，订阅后等待1s，然后结束(complete)


/**
 * Subsciption: 订阅Observable后会返回一个Subscription，可以在执行subscription.unsubscribe()方法取消订阅
 */
// var source = Rx.Observable.interval(1000)

// var subsciption = source.subscribe({
//     next(val) {
//         console.log(val)
//     },
//     error(err) {
//         console.log(err)
//     },
//     complete() {
//         console.log('complete')
//     }
// })

// setTimeout(() => {
//     subsciption.unsubscribe()
// }, 5000)


/**
 * Operators：接收当前Observable，并返回另一个Observable的函数，如map,mapTo
 */
// map: 类似数组的map方法
// var source = Rx.Observable.interval(1000)
// var newest = source.map(v => v + 1)

// newest.subscribe(console.log)

// mapTo: mapTo 可以把传进来的值改成一个固定的值
// var source = Rx.Observable.interval(1000)
// var newest = source.mapTo(3)

// newest.subscribe(console.log)

// filter: 类似数组的filter方法
// var source = Rx.Observable.interval(1000)
// var newest = source.filter(x => x % 2 === 0)

// newest.subscribe(console.log)


/**
 * 简单来说数据就在Observable中流动，你可以使用各种operator对流处理，例如：
 */
// const ob = Rx.Observable.interval(1000)
// ob.take(3).map(n => n * 2).filter(n => n >= 2).subscribe({
//     next: n => console.log(n),
//     error: err => console.log(err),
//     complete: () => console.log('complete')
// }) 

// /**
//  * 合并序列之Observable.concat() ： 
//  * Observable 顺序的、串行的将所有输入 Observable 的值合并给输出 Observable。
//  */
// // exp1-1
// var timer = Rx.Observable.interval(1000).take(4);
// var sequence = Rx.Observable.range(1, 10);
// var result = timer.concat(sequence);
// result.subscribe(x => console.log(x));

// // exp1-2
// var timer1 = Rx.Observable.interval(1000).take(10)
// var timer2 = Rx.Observable.interval(2000).take(6)
// var timer3 = Rx.Observable.interval(500).take(10)
// var result = timer1.concat(timer2, timer3)
// result.subscribe(x => console.log(x))

/**
 * 合并序列之Observable.merge() ：
 * 所有的输入 Observable 都完成了，输出 Observable 才能完成。该 Observable 发出的项是每个输入 Observable 的结果。
 */
// exp2-1
// var timer1 = Rx.Observable.interval(1000).take(10);
// var timer2 = Rx.Observable.interval(2000).take(6);
// var timer3 = Rx.Observable.interval(500).take(10);
// var merged = timer1.merge(timer2, timer3);
// merged.subscribe(x => console.log(x));

// Observable 懒执行
// var source = Rx.Observable.from([1,2,3,4,5]);
// var example = source.map(x => x + 1); // 此处不会执行

// example.subscribe(console.log) // 只有订阅后才会执行

// Observable 渐进式运算
// var source = Rx.Observable.from([1,2,3]);
// var example = source
//               .filter(x => x % 2 === 0)
//               .map(x => x + 1)

// example.subscribe(console.log);

// concatAll：顺序的连接内部Observable，将高阶Observable转化为一阶Observable(打平)
// var clicks = Rx.Observable.fromEvent(document, 'click');
// var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
// var firstOrder = higherOrder.concatAll();
// firstOrder.subscribe(x => console.log(x)) // 对于每一次点击，都将每隔1秒分别输出0-1-2-3，0-1-2-3，……

// concatMap：将每个值映射为 Observable, 然后使用concatAll将所有的 内部 Observables 打平。等同于 map + concatAll
// var clicks = Rx.Observable.fromEvent(document, 'click');
// var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
// result.subscribe(x => console.log(x)); // 和上一段代码等效

// concatMap实例2：连续发送请求
// function getPostData() {
//     return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json())
// }

// var source = Rx.Observable.fromEvent(document.body, 'click')

// var example = source.concatMap(e => Rx.Observable.from(getPostData()))

// example.subscribe({
//     next: value => console.log(value),
//     error: err => console.log(`Error ${err}`),
//     complete: () => console.log('Finished')
// })


// switch：一旦有新的内部 Observable 出现，通过丢弃前一个，将 高级 Observable 打平
// var clicks = Rx.Observable.fromEvent(document.body, 'click')
// var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(5))
// var switched = higherOrder.switch()
// switched.subscribe(x => console.log(x))

// switchMap: 只要注意一个重点 switchMap 会在下一个 observable 被送出后直接退订前一个未处理完的 observable。等同于map + switch
// var clicks = Rx.Observable.fromEvent(document.body, 'click')
// var example = clicks.switchMap(e => Rx.Observable.interval(1000).take(5))
// example.subscribe(x => console.log(x))  // 和上一段代码等效

// switchMap示例2：连续发送请求，仅最后一个有打印（返回）
// function getPostData() {
//     return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json())
// }
// var source = Rx.Observable.fromEvent(document.body, 'click')
// var example = source.switchMap(e => Rx.Observable.from(getPostData()))
// example.subscribe({
//     next: value => console.log(value),
//     error: err => console.log(`Error ${err}`),
//     complete: () => console.log('Finished')
// })


// merge: 通过把多个 Observables 的值混合到一个 Observable 中 来将其打平。
// var clicks = Rx.Observable.fromEvent(document, 'click');
// var timer = Rx.Observable.interval(1000);
// var clicksOrTimer = clicks.merge(timer);
// clicksOrTimer.subscribe(x => console.log(x));

// mergeAll: 将高阶 Observable 转换成一阶 Observable ，一阶 Observable 会同时发出在内部 Observables 上发出的所有值
// var clicks = Rx.Observable.fromEvent(document, 'click');
// var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
// var firstOrder = higherOrder.mergeAll();
// firstOrder.subscribe(x => console.log(x));

// mergeMap：将每个值映射成 Observable ，然后使用 mergeAll 打平所有的内部 Observables 。等同于map + merge
// var clicks = Rx.Observable.fromEvent(document, 'click')
// var example = clicks.mergeMap(ev => Rx.Observable.interval(1000))
// example.subscribe(x => console.log(x + 1)) // 和上一段代码等效

// mergeMap示例2：每点击一次，会出现一次请求(不同于concatMap)，请求会依次返回
// function getPostData() {
//     return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json())
// }
// var source = Rx.Observable.fromEvent(document.body, 'click')
// var example = source.mergeMap(e => Rx.Observable.from(getPostData()))
// example.subscribe({
//     next: value => console.log(value),
//     error: err => console.log(`Error ${err}`),
//     complete: () => console.log('Finished')
// })


// concatMap, switchMap, mergeMap共同点： 
// 这三个 operators 可以把第一个参数返回的 promise 直接转成 observable，这样我们就不用再用 Rx.Observable.from 转一次
// function getPersonData() {
//     return fetch('https://jsonplaceholder.typicode.com/posts/1')
//     .then(res => res.json())
// }
// var source = Rx.Observable.fromEvent(document.body, 'click');

// var example = source.concatMap(e => getPersonData()); // 此处可以不需要Rx.Observable.from()方法

// example.subscribe({
//     next: (value) => { console.log(value); },
//     error: (err) => { console.log('Error: ' + err); },
//     complete: () => { console.log('complete'); }
// }); 

// concatMap, switchMap, mergeMap的使用场景：
// - 建议初学者不确定选哪一个时，使用 switchMap
// - 使用concatMap和mergeMap时，过快触发（内部Observable结束过慢）将会引起内存问题



// combineLatest：接受多个Observable参数，顺序订阅每个Observable，每当任一输入 Observable 发出，收集每个输入 Observable 的最新值组成一个数组。
// 所以，当你给操作符 传入 n 个 Observable，返回的 Observable 总是会发出一个长度为 n 的数组，对应输入 Observable 的顺序
// 它会等待所有Observable发出
// const timer1 = Rx.Observable.timer(0, 1000)
// const timer2 = Rx.Observable.timer(500, 1000)
// const combineTimer = Rx.Observable.combineLatest(timer1, timer2)
// combineTimer.subscribe(x => console.log(x)) // 将两个observable结合，顺序输出