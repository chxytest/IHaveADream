<template>
  <div>
    <van-goods-action>
      <div class="goods-action-left">
        <van-goods-action-icon icon="chat-o" text="客服" dot @click="onClickIcon" />
        <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-goods-action-icon icon="star-o" text="收藏" badge="5" @click="onClickIcon" />
      </div>
      <div class="goods-action-right">
        <van-goods-action-button
          text="加入购物车"
          color="#ffe817"
          :style="{ color: '#333' }"
          @click="onClickButton"
        />
        <van-goods-action-button text="立即购买" color="#f69" />
      </div>
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "DetailGoodsAction",
  methods: {
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      this.$emit("addCart");
      // Toast("添加购物车成功");
    }
  }
};
</script>

<style lang="less">
.van-goods-action {
  height: 58px;
}
.goods-action-left {
  width: 50%;
  display: flex;

  .van-goods-action-icon {
    flex: 1;
  }
}
.goods-action-right {
  width: 50%;
  display: flex;
}
</style>