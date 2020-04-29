<template>
  <div id="app">
    <h2>我是APP</h2>
    <router-link to="/home" tag="button">主页</router-link>
    <router-link to="/about" tag="button">关于页</router-link>
    <router-link :to="'/user/'+userid" tag="button">用户页</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userid: "chenhan"
    };
  }
};
</script>

<style>
</style>
