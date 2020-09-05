/**
 * 从一个对象数组中获取这些对象相同的 key/value对，作为新的对象返回
 * 例如：
    let test = [
      { app: 'http1', version: 'v1', demo: 'haha' },
      { app: 'http2', version: 'v1', demo: 'haha' },
      { app: 'http1', version: 'v1', demo: 'ha' },
      { app: 'http1', version: 'v1', demo: 'haha', another: 'whatever' }
    ]
    
    应输出 {version: "v1"} 
 */

// 对象须为键值对的简单对象，值为引用类型的不考虑
export const getIntersectionObjectFromArrayObject = (array) => {
  const result = {};
  // 获取数组元素中 key 最多的对象
  let objectWithMostKeys = {
    index: -1,
    obj: {},
    keys: [],
  };
  for (let i = 0; i < array.length; i++) {
    const keys = Object.keys(array[i]);
    if (keys.length > Object.keys(objectWithMostKeys.obj).length)
      objectWithMostKeys = {
        index: i,
        obj: array[i],
        keys: Object.keys(array[i]),
      };
  }

  const { keys, obj } = objectWithMostKeys;
  const deletedKeys = [];
  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      for (let j = 0; j < keys.length; j++) {
        if (obj[keys[j]]) result[keys[j]] = obj[keys[j]];
      }
      continue;
    }
    for (let j = 0; j < keys.length; j++) {
      if (result[keys[j]]) {
        if (array[i][keys[j]] !== result[keys[j]]) {
          deletedKeys.push(keys[j]); // 记录删除过的 key
          delete result[keys[j]];
        }
      } else {
        if (!deletedKeys.includes(keys[j]) && array[i][keys[j]])
          result[keys[j]] = array[i][keys[j]];
      }
    }
  }
  return result;
};