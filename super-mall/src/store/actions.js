import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找之前的数据中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 判断 oldProduct 是否为空
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量加1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('新增商品数量1')
      }
    })
  }
}