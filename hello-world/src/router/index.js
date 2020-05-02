import VueRouter from 'vue-router'
import Vue from 'vue'
// import home from '../components/home.vue'
// import about from '../components/about.vue'
// import user from '../components/user.vue'

const home = () => import('../components/home.vue')
const homeChildone = () => import('../components/homeChildone.vue')
const homeChildtwo = () => import('../components/homeChildtwo.vue')
const about = () => import('../components/about.vue')
const user = () => import('../components/user.vue')
const Profile = () => import('../components/Profile.vue')

Vue.use(VueRouter)

// 在路由跳转的时候同一个路由多次添加是不被允许的
// 在vue-router 的 4.0 的版本需要加入如下代码
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home', component: home,
    meta: { title: "首页" },
    children: [
      // { path: ' ', redirect: homeChildone }, // 子组件重定向时 path 要空格
      { path: 'homeChildone', component: homeChildone },
      { path: 'homeChildtwo', component: homeChildtwo }
    ]
  },
  {
    path: '/about',
    component: about,
    meta: { title: '关于' },
  },
  { path: '/user/:userid', component: user, meta: { title: '用户' } },
  { path: '/profile', component: Profile, meta: { title: '档案' } },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})



//前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  console.log(to)
  next()
})

// 后置守卫
// router.afterEach((to, from) => {
//   console.log("---------")
// })

export default router