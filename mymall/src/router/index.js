import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const Home = () => import("../view/home/Home.vue")
const Category = () => import("../view/category/Category.vue")
const Cart = () => import("../view/shopcart/Cart.vue")
const Profile = () => import("../view/profile/Profile.vue")
const Detail = () => import("../view/detail/Detail.vue")



const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/category", component: Category },
  { path: "/cart", component: Cart },
  { path: "/profile", component: Profile },
  { path: "/detail/:iid", component: Detail }
]


const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router