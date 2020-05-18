import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.使用 Vuex 插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 2.创建 Store 对象
const Store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

// 3.挂载到vue实例上
export default Store