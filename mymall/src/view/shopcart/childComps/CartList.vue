<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div v-for="(item, index) in cartList" :key="index" class="cart-item">
          <van-checkbox :name="item" checked-color="var(--color-tint)" ref="checkboxes" />
          <van-card
            :num="item.count"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
            :thumb="item.image"
          />
        </div>
      </van-checkbox-group>
    </scroll>
    <cart-bottom-bar
      @checkAllChange="checkAllChange"
      :total-price="totalPrice"
      :total-checked="isTotalchecked"
    />
  </div>
</template>

<script>
import Scroll from "../../../components/commen/scroll/Scroll";
import { mapGetters } from "vuex";
import CartBottomBar from "./CartBottomBar";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartBottomBar
  },
  data() {
    return {
      result: []
    };
  },
  computed: {
    ...mapGetters(["cartList"]),
    isTotalchecked() {
      return this.getTotalChecked();
    },
    totalPrice() {
      return this.getTotalPrice();
    }
  },
  activated() {
    // 当购物车列表有数据更新时，滚动区域的高度会变化
    // 因此每次进入购物车页面需要刷新一下来更新滚动区域数据
    this.$refs.scroll.refresh();
  },
  methods: {
    // 已经勾选项商品的价格总和
    getTotalPrice() {
      let arr = this.result;
      let total = 0;
      if (arr.length === 0) return 0;
      for (let j = 0; j < arr.length; j++) {
        total += arr[j].price * arr[j].count;
      }
      return total;
    },
    // 判断当商品一一勾选后，全选按钮自动勾选
    getTotalChecked() {
      return this.result.length === this.cartList.length &&
        this.result.length > 0
        ? true
        : false;
    },
    // 点击全选方法
    checkAllChange() {
      // 通过判断 result 数组的长度与 cartList 数组的长度是否一致来进行取反
      if (this.result.length < this.cartList.length) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 49px);

  .content {
    height: 100%;
    overflow: hidden;
  }

  .cart-item {
    display: flex;
    border-bottom: 1px solid #ccc;
    background: #fafafa;
    justify-content: center;
  }
}
</style>

<style lang="less">
.cart-list {
  .van-checkbox {
    width: 25px;
    padding: 5px 0 5px 5px;
    // flex: 1;
  }

  .van-card {
    width: 350px;
    padding: 5px 5px 5px 0;
    margin-top: 0;
  }

  .van-card__thumb {
    width: 90px;
    height: 110px;
    padding: 5px;
    margin-right: 0px;

    img {
      border-radius: 5px;
    }
  }
  .van-card__content {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;

    .van-card__desc {
      font-size: 14px;
      color: #666;
      margin-top: 15px;
    }
  }

  .van-card__bottom {
    margin-bottom: 5px;
  }

  .van-card__price {
    color: orangered;
    font-size: 17px;

    .van-card__price-integer {
      font-size: 17px;
    }
  }
  .van-card__num {
    color: #333;
  }
}

.van-multi-ellipsis--l2 {
  white-space: nowrap;
}
</style>