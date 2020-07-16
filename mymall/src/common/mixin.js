import { debounce } from "../common/utils";
import BackTop from "../components/content/backtop/BackTop.vue";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 1.图片加载完的事件监听
    // 通过防抖函数 this.$refs.scroll.refresh 的调用来防止 newRefresh() 函数被频繁调用
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    // console.log("refresh被调用");
    // 监听事件总线中的事件变化，即 item 中图片加载完成
    // 对监听事件进行保存, 保存到 itemImgListener 中
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 点击回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 是否显示回到顶部
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  },
}