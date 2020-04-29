import VueRouter from 'vue-router'
import Vue from 'vue'
// import home from '../components/home.vue'
// import about from '../components/about.vue'
// import user from '../components/user.vue'

const home = () => import('../components/home.vue')
const homeChildone = () => import('../components/homeChild1.vue')
const homeChildtwo = () => import('../components/homeChild2.vue')
const about = () => import('../components/about.vue')
const user = () => import('../components/user.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home', component: home,
    children: [
      { path: ' ', redirect: homeChildone }, // 子组件重定向时 path 要空格
      { path: 'homeChildone', component: homeChildone },
      { path: 'homeChildtwo', component: homeChildtwo }
    ]
  },
  { path: '/about', component: about },
  { path: '/user/:userid', component: user }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

export default router