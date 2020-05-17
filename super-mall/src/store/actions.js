import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
  addCart(context, payload) {
    // 查找之前的数据中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 判断 oldProduct 是否为空
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}