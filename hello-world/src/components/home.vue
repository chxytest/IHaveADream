<template>
  <div>
    <h2>我是主页</h2>
    <div>哈哈</div>
    <router-link to="/home/homeChildone" tag="button">子哈哈</router-link>
    <router-link to="/home/homeChildtwo" tag="button">子呵呵</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>