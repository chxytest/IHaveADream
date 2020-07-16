export default {
  // 获取存储到 state 中 cartList 的数组长度
  cartLength(state) {
    return state.cartList.length
  },

  // 获取存储到 state 中的商品数据 cartList
  cartList(state) {
    return state.cartList
  }
}