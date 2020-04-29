<template>
  <div>
    <h2>我是用户</h2>
    <div>啦啦</div>
    <div>{{ userId }}</div>
  </div>
</template>

<script>
export default {
  name: "user",
  computed: {
    userId() {
      return this.$route.params.userid;
    }
  }
};
</script>

<style>
</style>