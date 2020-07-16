<template>
  <div id="home" class="wrapper">
    <!-- 顶部 navbar 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="top-tabcontrol"
      :titles="['流行', '新款', '精选']"
      ref="topTabcontrol"
      @tabclick="tabClick"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图区域 -->
      <home-swiper :banners="banners" @swiperImageload="swiperImageload"></home-swiper>
      <!-- 特殊入口区域 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行区域 -->
      <popular-this-week></popular-this-week>
      <!-- 控制 controlbar 区域，并切换显示列表数据 -->
      <tab-control :titles="['流行', '新款', '精选']" ref="centerTabcontrol" @tabclick="tabClick"></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "../../components/commen/navbar/NavBar";
import HomeSwiper from "./homechild/HomeSwiper";
import RecommendView from "./homechild/RecommendView";
import PopularThisWeek from "./homechild/PopularThisWeek";
import TabControl from "../../components/content/tabcontrol/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";

import Scroll from "../../components/commen/scroll/Scroll";
import { getHomeMultidata, getHomeGoods } from "../../network/home";
import { itemListenerMixin, backTopMixin } from "../../common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    PopularThisWeek,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 滚动完后做一次刷新
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1. 离开页面时保存 y 值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2. 取消全局监听事件
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    // 获取轮播、特殊入口和本周流行的数据
    this.getHomeMultidata();

    // 获取商品列表数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 手动点击一次代码
    this.tabClick(0);
  },
  methods: {
    // 请求首页轮播、推荐、每周流行数据
    getHomeMultidata() {
      getHomeMultidata().then(response => {
        // console.log(response);
        this.banners = response.data.banner.list;
        this.recommends = response.data.recommend.list;
      });
    },

    // 请求商品的数据
    getHomeGoods(type) {
      const pages = this.goods[type].page + 1;
      getHomeGoods(type, pages).then(response => {
        // console.log(response);
        this.goods[type].list.push(...response.data.list);
        this.goods[type].page += 1;

        // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载，
        // 才能再次进行下一次上啦加载
        this.$refs.scroll.finishPullUp();
      });
    },

    // 监控用户点击tabcontrol
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      // 方法一：让两个 tabcontrol 的 currentIndex 保持一致
      // 通过 if 判断 TabControl 已经存在了，防止在 created 里面调用 tabClick 报错
      // if (this.$refs.topTabcontrol !== undefined) {
      //   this.$refs.topTabcontrol.currentIndex = index;
      //   this.$refs.centerTabcontrol.currentIndex = index;
      // }

      // 方法二：在 mounted 中进行点击就不需要 if 判断
      this.$refs.topTabcontrol.currentIndex = index;
      this.$refs.centerTabcontrol.currentIndex = index;
    },

    // 监听滚动的位置
    contentScroll(position) {
      // 1. 判断是否显示回到顶部按钮
      this.listenShowBackTop(position);

      // 2.决定 tabControl 是否吸顶 position: fixed
      this.isTabFixed = -position.y > this.tabOffsetTop;
      // console.log(this.isTabFixed);
    },

    // 上拉加载更多方法
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 首页监听轮播图片加载完后，TabControl 的offsetTop
    swiperImageload() {
      // 获取 tabControl 的 offsetTop
      this.tabOffsetTop = this.$refs.centerTabcontrol.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    }
  }
};
</script>

<style lang="less" scoped>
#home {
  // height: calc(100% - 49px);
  height: 100vh;
  width: 100%;

  .home-nav {
    background: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .top-tabcontrol {
    position: relative;
    background: white;
    z-index: 9;
  }
}
</style>