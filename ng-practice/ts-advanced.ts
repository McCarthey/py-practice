import { type } from "os";

/**
 * ts进阶
 */

/**
 * 类型别名:可以创建类别，常用于联合类型。
 */
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
    if(typeof n === 'string') {
        return n
    } else {
        return n()
    }
}

