<template>
  <div>
    <h2>我是主页</h2>
    <div>哈哈</div>
    <router-link to="/home/homeChildone">我是新闻</router-link>
    <router-link to="/home/homeChildtwo">我是咨询</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      // 首页中使用 path 属性记录离开时的路径，在 beforeRouteLeave 中记录
      path: "/home/homeChildone"
    };
  },
  // 这两个组件只有被保持了状态使用了 keep-alive 时，才是有效的
  activated() {
    this.$router.push(this.path);
  },
  deactivated() {
    console.log("deactivated");
  },
  // 组件内的导航守卫
  beforeRouteLeave(to, from, next) {
    this.path = this.$router.path;
    next();
  }
};
</script>

<style>
</style>