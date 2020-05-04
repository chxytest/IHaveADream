<template>
  <div>
    <h2>{{ $store.state.count }}</h2>
    <h2>{{ $store.getters.powerCount }}</h2>
    <hr />
    <h2>{{ $store.state.info }}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloVuex"
};
</script>

<style lang="less">
</style>