<template>
  <div id="app">
    <h2>我是APP</h2>
    <!--<router-link to="/home" tag="button" replace active-class="active">首页</router-link>-->
    <!--<router-link to="/about" tag="button" replace active-class="active">关于</router-link>-->
    <router-link to="/home">主页</router-link>
    <router-link to="/about">关于页</router-link>
    <!-- <router-link :to="'/user/'+userid" tag="button">用户页</router-link> -->
    <!-- <router-link to="/profile" tag="button">档案</router-link> -->
    <!-- <router-link
      :to="{path: '/profile', query: {name: 'why', age: 18,height: 1.88}}"
      tag="button"
    >档案</router-link>-->
    <button @click="userClick">用户页</button>
    <button @click="profileClick">档案</button>
    <keep-alive exclude="Profile,user">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import home from "./components/home";
// import homeChildone from "./components/homeChildone";

export default {
  name: "App",
  // components: { home, homeChildone },
  data() {
    return {
      userid: "chenhan"
    };
  },
  methods: {
    userClick() {
      this.$router.push("/user/" + this.userid);
    },
    profileClick() {
      this.$router.push({
        path: "/profile",
        query: {
          name: "chenhan",
          age: 18,
          height: 1.78
        }
      });
    }
  }
};
</script>

<style>
.active {
  color: #f00;
}
</style>
