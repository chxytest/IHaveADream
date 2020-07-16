<template>
  <div id="category">
    <!-- 顶部导航 NavBar 部分 -->
    <nav-bar class="category-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <!-- 目录分类部分 -->
    <div class="content">
      <tab-menu :menu-categories="categories" @selectTitle="selectTitle"></tab-menu>

      <scroll id="tab-content">
        <div>
          <tab-subcategory :sub-categories="subCategories" />
          <tab-control :titles="['综合', '新品', '销量']" @tabclick="titleClick" />
          <goods-list :goods="showCategoryDetail" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/commen/navbar/NavBar";
import TabMenu from "./categorychild/TabMenu";
import TabSubcategory from "./categorychild/TabSubcategory";
import TabControl from "../../components/content/tabcontrol/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";

import Scroll from "../../components/commen/scroll/Scroll";
import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "../../network/category.js";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabSubcategory,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      categories: [],
      subCategories: {},
      currentIndex: 0,
      categoryDetail: {
        pop: [],
        new: [],
        sell: []
      },
      currentType: "pop"
    };
  },
  computed: {
    showCategoryDetail() {
      return this.categoryDetail[this.currentType];
    }
  },
  created() {
    this._getCategory();
  },
  methods: {
    // 1. 获取商品分类请求
    _getCategory() {
      getCategory().then(res => {
        // 1. 获取分类列表数据
        this.categories = res.data.category.list;
        // console.log(this.categories);
        // 2. 获取分类列表下第一个的子分类
        // getSubCategory(this.categories[0].maitKey).then(res => {
        //   console.log(res);
        //   this.subCategories = res.data;
        // });
        // 优化：相当于点击了分类列表下第一个菜单
        this._getSubCategory(0);
      });
    },
    // 2. 监控点击的菜单标题事件，由子节点发送事件给父节点
    // 并调获取子分类的方法
    selectTitle(index) {
      this._getSubCategory(index);
    },
    // 3. 获取分类列表下菜单的子分类请求
    _getSubCategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[this.currentIndex].maitKey;
      getSubCategory(maitKey).then(res => {
        // console.log(res);
        this.subCategories = res.data;
        // console.log(this.subCategories);
        // 获取每个 title 标签下的商品数据
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },

    // 4. 获取 TabControl 中对应 title 的商品信息数据
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        // console.log(res);
        this.categoryDetail[type] = res;
        // console.log(type);
        // console.log(this.categoryDetail[type]);
      });
    },

    // 5. 监控用户点击tabcontrol
    titleClick(index) {
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
      // console.log(this.currentType);
    }
  }
};
</script>

<style lang="less" scoped>
#category {
  height: 100vh;

  .category-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    height: calc(100vh - 44px - 49px);
    display: flex;

    #tab-content {
      height: calc(100vh - 44px - 49px);
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>