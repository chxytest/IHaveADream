<template>
  <div class="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <div v-for="(item, index) in detailInfo.detailImage[0].list" :key="index">
        <img :src="item" alt @load="imageLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      count: 0,
      imagesLength: 0
    };
  },
  watch: {
    // 监听传过来的 detailInfo 对象中图片长度的变化
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  },
  methods: {
    // 判断图片是否加载完成，之后再进行一次回调
    imageLoad() {
      if (++this.count === this.imagesLength) {
        this.$emit("imageLoad");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail-goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;

  .info-desc {
    padding: 0 15px;

    .desc {
      padding: 15px 0;
      font-size: 14px;
    }

    .start,
    .end {
      width: 90px;
      height: 1px;
      background-color: #a3a3a5;
      position: absolute;
    }

    .start {
      left: 15px;
    }

    .end {
      right: 15px;
    }

    .start::before,
    .end::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: #333;
      bottom: 0;
    }

    .end::after {
      right: 0;
    }
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
}
</style>