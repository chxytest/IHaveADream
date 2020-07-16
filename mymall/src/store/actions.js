export default {
  // 1. 通过 mutation 提交的方法来变更 state 中的状态
  addToCartList(context, payload) {
    return new Promise((resolve, reject) => {
      // 2. 先查找之前的购物车列表中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 3. 然后判断 oldProduct 是否为空，即 oldProduct 是否为 true，
      // 不为空就将原本商品的数量加1，为空就往 cartList 插入一条带有 count = 1 属性的新的数据，
      if (oldProduct) {
        context.commit("addCounter", oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit("addToCart", payload)
        resolve('添加新的商品成功')
      }
    })
  }
}