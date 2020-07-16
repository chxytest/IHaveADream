<template>
  <div class="detail-base-info" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="goods-info-title">{{ goodsInfo.title }}</div>
    <div class="goods-info-price">
      <span class="info-new-price">{{ goodsInfo.newPrice }}</span>
      <span class="info-old-price">{{ goodsInfo.oldPrice }}</span>
      <span class="info-discount">{{ goodsInfo.discount }}</span>
    </div>
    <div class="goods-info-columns">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[goodsInfo.services.length - 1].name }}</span>
    </div>
    <div class="goods-info-services">
      <span v-for="index in goodsInfo.services.length - 1" :key="index">
        <img :src="goodsInfo.services[index - 1].icon" alt />
        <span>{{ goodsInfo.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail-base-info {
  margin-top: 15px;
  color: #999;
  padding: 0px 8px;
  border-bottom: 5px solid #f2f5f8;

  .goods-info-title {
    color: #222;
  }

  .goods-info-price {
    margin-top: 10px;

    .info-new-price {
      font-size: 24px;
      color: var(--color-high-text);
    }

    .info-old-price {
      font-size: 15px;
      text-decoration: line-through;
      margin-left: 5px;
    }

    .info-discount {
      font-size: 12px;
      color: #fff;
      background-color: var(--color-high-text);
      border-radius: 8px;
      padding: 2px 5px;
      margin-left: 5px;
      position: relative;
      top: -8px;
    }
  }

  .goods-info-columns {
    margin-top: 15px;
    font-size: 13px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }

  .goods-info-services {
    line-height: 60px;
    display: flex;
    justify-content: space-between;

    img {
      width: 14px;
      height: 14px;
      position: relative;
      bottom: -3px;
    }

    span {
      font-size: 13px;
      color: #333;
    }
  }
}
</style>