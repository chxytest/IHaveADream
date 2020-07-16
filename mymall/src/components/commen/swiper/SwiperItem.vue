<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SwiperItem"
};
</script>

<style lang="less" scoped>
.slide {
  width: 100%;
  flex-shrink: 0;

  img {
    width: 100%;
  }
}
</style>