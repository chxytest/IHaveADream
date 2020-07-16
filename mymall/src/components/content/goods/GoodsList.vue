<template>
  <div class="goods-list" v-if="this.goods.length > 0">
    <goods-item v-for="(item, index) in goods" :key="index" :goods-item="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";

export default {
  name: "GoodsList",
  components: {
    GoodsItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3px;
}
</style>