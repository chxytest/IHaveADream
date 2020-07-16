<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style lang="less" scoped>
#tab-bar {
  display: flex;
  height: 49px;
  background: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 2px rgba(100, 100, 100, 0.2);

  // z-index: 99;
}
</style>