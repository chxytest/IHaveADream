<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tabcontrol" :titles="['流行', '新款', '精选']"></tab-control>

    <ul>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
      <li>mogujie</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import { getHomeMultidata } from "../../network/home";
import TabControl from "../../components/content/tabcontrol/TabControl";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    // 请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res);
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  }
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tabcontrol {
  position: -webkit-sticky;
  position: sticky;
  top: 40px;
  background: white;
}
</style>