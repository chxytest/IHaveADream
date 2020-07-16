<template>
  <div id="cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品卡片列表和商品提交栏 -->
    <cart-list />
  </div>
</template>

<script>
import NavBar from "../../components/commen/navbar/NavBar";
import CartList from "./childComps/CartList";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style lang="less" scoped>
#cart {
  .cart-nav-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: 700;
    z-index: 10;
  }
}
</style>