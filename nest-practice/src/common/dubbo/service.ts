import { java } from 'dubbo2.js'
import config from './dubbo.config'

const provider = {
  CategoryService(dubbo) {
    return dubbo.proxyService({
      dubboInterface: config.services.CategoryService,
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
      dubboInterface: config.services.GoodsService,
      methods: {
        get(uid) {
          return [
            java.combine('int', uid)
          ]
        },
        search() {
          return [
            java.combine(config.GoodsSearchRequest,
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