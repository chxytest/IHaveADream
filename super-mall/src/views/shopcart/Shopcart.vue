<template>
  <div class="cart">
    <!-- 导航头部 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 汇总购买 -->
    <cart-botton-bar></cart-botton-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottonBar from "./childComps/CartBottonBar";

import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottonBar
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>