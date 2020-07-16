<template>
  <div class="cart-bottom-bar">
    <van-submit-bar
      class="cart-submit-bar"
      text-align="left"
      :price="totalPrice*100"
      button-text="提交订单"
    >
      <van-checkbox v-model="_totalChecked" @click="checkAll" checked-color="var(--color-tint)">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: "CartBottomBar",
  computed: {
    _totalChecked: {
      get: function() {
        return this.totalChecked;
      },
      set: function() {}
    }
    // _totalChecked() {
    //   return this.totalChecked;
    // }
  },
  // data() {
  //   return {
  //     // checked: this.totalChecked
  //   };
  // },
  props: {
    totalPrice: {
      type: Number,
      default() {
        return 0;
      }
    },
    totalChecked: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // 将全选点击事件发送给父组件 cartList
    checkAll() {
      this.$emit("checkAllChange");
    }
  }
};
</script>

<style lang="less" scoped>
.cart-bottom-bar {
  height: 49px;
  .van-submit-bar {
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .van-submit-bar__bar {
    background-color: #eee;
  }
  .van-checkbox {
    width: 63px;
  }
  .van-submit-bar__text {
    margin-left: 15px;
  }
  // .van-checkbox__label {
  //   font-size: 14px;
  // }
  .van-submit-bar__price {
    font-size: 16px;
  }
}
</style>