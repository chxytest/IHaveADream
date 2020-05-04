import Vue from "vue";
import Vuex from "vuex";
import { INCREMENT } from "./mutations-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 100,
    students: [
      { id: 100, name: 'why', age: 18 },
      { id: 101, name: 'what', age: 19 },
      { id: 102, name: 'who', age: 20 },
      { id: 103, name: 'when', age: 21 },
    ],
    info: {
      name: 'kobe',
      age: 40,
      height: 1.98
    }
  },
  mutations: {
    [INCREMENT](state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    updateInfo(state) {
      // 此处不能进行异步
      // setTimeout(() => {
      //   state.info.name = 'coderwhy'
      // }, 1000)

      state.info.name = 'coderwhy'  // 响应式的会改变页面数据,name已经初始化
      // state.info['address'] = '北京' // 不会响应式的改变页面数据,address没有被初始化
      // 增加属性
      // Vue.set(state.info, 'address', '深圳') // 响应式的方法Vue.set会改变页面数据

      // 删除属性
      // delete state.info.age // 该方法也无法做到响应式，页面数据不会更新
      // Vue.delete(state.info, 'age') // 该方法可以做到响应式，页面数据会更新
    }
  },
  actions: {
    aupdateInfo(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('updateInfo')
          console.log(payload)
          resolve('111111')
        }, 1000)
      })
    }
  },
  getters: {
    powerCount(state) {
      return state.count * state.count
    }
  },
  modules: {}
});
