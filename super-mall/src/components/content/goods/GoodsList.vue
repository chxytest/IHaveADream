<template>
  <div class="goods-list">
    <goods-item v-for="(item, index) in goods" :key="index" :goodsitem="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsItem
  }
};
</script>

<style>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3px;
}
</style>