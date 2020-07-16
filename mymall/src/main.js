import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import { Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Card, Checkbox, CheckboxGroup, SubmitBar, Toast } from 'vant';
import 'vant/lib/index.css';
import VueLazyload from 'vue-lazyload'

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Toast);
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
