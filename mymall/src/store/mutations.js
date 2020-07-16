export default {
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    // payload.checked = true // 用来决定添加到购物车的商品是默认选中的
    state.cartList.push(payload)
  }
}