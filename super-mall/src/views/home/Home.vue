<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabControl1"
      class="tab-control"
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
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tabcontrol"
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabControl2"
        :class="{ fixed: isTabFixed }"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabcontrol/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "../../network/home";
import { debounce } from "../../common/utils";
import { itemListenerMixin } from "../../common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currenttype: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currenttype].list;
    }
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  created() {
    // this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh();
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 手动代码点击一次
    this.tabclick(0);
  },
  methods: {
    // 事件监听方法
    tabclick(index) {
      switch (index) {
        case 0:
          this.currenttype = "pop";
          break;
        case 1:
          this.currenttype = "new";
          break;
        case 2:
          this.currenttype = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      // if (this.$refs.tabControl1 !== undefined) {
      //   this.$refs.tabControl1.currentIndex = index;
      //   this.$refs.tabControl2.currentIndex = index;
      // }
    },
    // 组件点击监听
    backClick() {
      // console.log("组件监听");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 判断 callback 是否显示
      this.isShowBackTop = -position.y > 1000;
      // 判断 tabControl 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // 对不同类型的商品上拉加载更多
      this.getHomeGoods(this.currenttype);
      // 从新计算高度
      // this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      // 获取 tabControl 的 offsetTop
      // 所有的组件中都有 $el 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络数据请求方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 此处的 pages 是拿到的 data 中 goods 对象的对应 type 的那条数据，
      // page 是当前已加载的页面数量，并对其自动加1
      // 在请求数据时获取的就是对应 type 当前已加载页面的总数据
      const pages = this.goods[type].page + 1;
      getHomeGoods(type, pages).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tabcontrol {
  position: sticky;
  /* top: 44px; */
  background: white;
  z-index: 9;
}

.content {
  /* 方案一：通过calc减去底部的高度得到中间的高度 */
  /* height: calc(100% - 49px); */
  overflow: hidden;

  /* 方案二：通过绝对定位来确定 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  background: white;
  z-index: 9;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>