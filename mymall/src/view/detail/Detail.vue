<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnavbar" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info ref="params" :params-info="paramsInfo"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommds" :goods="recommdsInfo"></goods-list>
    </scroll>
    <detail-goods-action @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailGoodsAction from "./childComps/DetailGoodsAction";

import Scroll from "../../components/commen/scroll/Scroll";
import { itemListenerMixin, backTopMixin } from "../../common/mixin";
import {
  getDetailData,
  getRecommend,
  Goods,
  Shop,
  Params
} from "../../network/detail";
import { debounce } from "../../common/utils";
import { Toast } from "vant";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailGoodsAction,
    GoodsList,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommdsInfo: [],
      titleTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1. 保存商品的 iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid);

    // 2. 获取详情页数据
    this.getDetailInfo(this.iid);

    // 3. 获取推荐部分数据
    this.getRecommend();

    // 4. 给 getThemeTopY 赋值（给this.themeTopYs赋值操作进行防抖）
    this.getThemeTopY = debounce(() => {
      // 获取每个组件的 offsetTop 并将其存储到 titleTopYs 数组中
      this.titleTopYs = [];

      this.titleTopYs.push(0);
      this.titleTopYs.push(this.$refs.params.$el.offsetTop);
      this.titleTopYs.push(this.$refs.comment.$el.offsetTop);
      this.titleTopYs.push(this.$refs.recommds.$el.offsetTop);
      this.titleTopYs.push(Number.MAX_VALUE);

      // console.log(this.titleTopYs);
    });
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    // 获取详情页数据
    getDetailInfo(iid) {
      getDetailData(iid).then(res => {
        const data = res.result;
        // console.log(data);
        // 2.1. 获取轮播图的数据
        this.topImages = data.itemInfo.topImages;

        // 2.2. bundleRenderer.renderToString 创建获取商品信息
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 2.3. 获取店铺信息
        this.shopInfo = new Shop(data.shopInfo);

        // 2.4. 获取详细穿着效果信息
        this.detailInfo = data.detailInfo;

        // 2.5. 获取商品参数信息
        this.paramsInfo = new Params(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 2.6. 获取评论组件参数信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },

    // 获取推荐数据
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res);
        this.recommdsInfo = res.data.list;
      });
    },

    // 点击头部标题跳转详情页对应位置
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.titleTopYs[index], 100);
    },

    // 监控图片加载完成后刷新一下
    imageLoad() {
      // this.$refs.scroll.refresh();
      this.newRefresh();

      // 在图片加载完成后再调防抖函数
      this.getThemeTopY();
    },

    // 监听滚动位置
    contentScroll(position) {
      // 1. 获取滚动的高度
      const positionY = -position.y;
      // console.log(positionY);

      // 2. 把 positionY 值和 titleTopYs 值进行对比，来判断当前是处在哪个标题的位置
      // 方法一：普通判断方法
      // let titleLength = this.titleTopYs.length;
      // for (let i = 0; i < titleLength; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < titleLength - 1 &&
      //       positionY >= this.titleTopYs[i] &&
      //       positionY < this.titleTopYs[i + 1]) ||
      //       (i === titleLength - 1 && positionY >= this.titleTopYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     // 将滚动判断的currentIndex赋值给DetailNavBar组件中的currentIndex来改变标题的切换
      //     this.$refs.detailnavbar.currentIndex = this.currentIndex;
      //   }
      // }
      // 方法二：在 titleTopYs 最后加一个最大值，将最后一个大于判断变成区间判断
      let titleLength = this.titleTopYs.length;
      for (let i = 0; i < titleLength; i++) {
        if (
          this.currentIndex !== i &&
          i < titleLength - 1 &&
          positionY >= this.titleTopYs[i] &&
          positionY < this.titleTopYs[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          // 将滚动判断的currentIndex赋值给DetailNavBar组件中的currentIndex来改变标题的切换
          this.$refs.detailnavbar.currentIndex = this.currentIndex;
        }
      }

      this.listenShowBackTop(position);
    },

    // 将商品添加到购物车，先把商品信息提交给 vuex
    addToCart() {
      // 1. 获取添加到购物车需要的商品信息
      const products = {};
      products.iid = this.iid;
      products.image = this.topImages[0];
      products.title = this.goodsInfo.title;
      products.desc = this.goodsInfo.desc;
      products.price = this.goodsInfo.realPrice;

      // 2. 通过 this.$store.commit 提交 addToCartList 方法给 store 中的 mutation
      this.$store.dispatch("addToCartList", products).then(res => {
        // console.log(res);
        Toast.success(res);
      });
      // console.log(products);
    }
  }
};
</script>

<style lang="less" scoped>
#detail {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 10;
  background: #fff;

  .detail-nav {
    height: 44px;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
}
</style>