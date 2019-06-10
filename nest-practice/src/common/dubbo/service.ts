import { java } from 'dubbo2.js'


const provider = {
  CategoryService(dubbo) {
    return dubbo.proxyService({
      dubboInterface: 'com.duomai.bigdata.erec.service.CategoryService',
      methods: {
        get(uid) {
        },
        list() {

        },
        predict(name) {

        }
      }
    })
  },
  GoodsService(dubbo) {
    return dubbo.proxyService({
      dubboInterface: 'com.duomai.bigdata.erec.service.GoodsService',
      methods: {
        get(uid) {
          return [
            java.combine('int', uid)
          ]
        },
        search() {
          return [
            java.combine('com.duomai.bigdata.erec.service.GoodsSearchRequest',
              {
                'size': 1,
                'query': '手机',
                'rank': 0,
                'page': 1
              }
            )
          ]
        }
      }
    })
  }
}

export default provider