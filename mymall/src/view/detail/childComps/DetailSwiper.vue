<template>
  <div class="detail-swiper">
    <van-swipe :autoplay="3000" :indicator-color="'red'" :show-indicators="true">
      <van-swipe-item v-for="(item, index) in topImages" :key="index">
        <img v-lazy="item" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail-swiper {
  // overflow: hidden;

  img {
    width: 100%;
    height: 300px;
  }
}
</style>
