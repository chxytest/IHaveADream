import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const Home = () => import("../views/home/Home.vue")
const Category = () => import("../views/category/Category.vue")
const Profile = () => import("../views/profile/Profile.vue")
const Shopcart = () => import("../views/shopcart/Shopcart.vue")

// 如下方法解决重复加载路由的问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/category", component: Category },
  { path: "/profile", component: Profile },
  { path: "/shopcart", component: Shopcart },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;