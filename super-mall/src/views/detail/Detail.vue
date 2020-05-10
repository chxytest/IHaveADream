<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
import DetailNavBar from "../detail/childcomps/DetailNavBar";
import DetailSwiper from "../detail/childcomps/DetailSwiper";
import DetailBaseInfo from "../detail/childcomps/DetailBaseInfo";
import DetailShopInfo from "../detail/childcomps/DetailShopInfo";

import { getDetail, Goods, Shop } from "../../network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    };
  },
  created() {
    // 1. 保存传入的 iid
    this.iid = this.$route.params.iid;

    // 2.调详情页接口
    getDetail(this.iid).then(res => {
      // 1.获取轮播图片
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
    });
  },
  methods: {}
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
</style>