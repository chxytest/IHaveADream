<template>
  <div class="goods-item">
    <img :src="goodsitem.show.img" alt />
    <div class="goods-info">
      <p>{{ goodsitem.title }}</p>
      <span class="price">{{ goodsitem.price }}</span>
      <span class="collect">{{ goodsitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  width: 48%;
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 8px;
}
.goods-info {
  font-size: 12px;
  overflow: hidden;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>