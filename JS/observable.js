/**
 * 简易的观察者模式：对某件事注册监听，并在事件发生时，自动执行注册的监听者(listener)
 */
class Producer {
    constructor() {
        this.listeners = []
    }
    addListener(listener) {
        if(typeof listener === 'function') {
            this.listeners.push(listener)
        } else {
            throw new Error('listener 必须是 function')
        }
    }
    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
    notify(message) {
        this.listeners.forEach(listener => listener(message))
    }
}

const egghead = new Producer()

function listener1 (message) {
    console.log(`${message} from listener1`)
}

function listener2 (message) {
    console.log(`${message} from listener2`)
}

egghead.addListener(listener1)
egghead.addListener(listener2)

egghead.notify('A new course!')

