<template>
  <div>
    <h2>我是profile</h2>
    <div>profile的哈哈</div>
    <h2>{{ $route.query.name }}</h2>
    <h2>{{ $route.query.age }}</h2>
    <h2>{{ $route.query.height }}</h2>
  </div>
</template>

<script>
export default {
  name: "Profile"
};
</script>

<style>
</style>