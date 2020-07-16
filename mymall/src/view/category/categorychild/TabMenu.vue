<template>
  <scroll id="tab-menu">
    <div>
      <div
        v-for="(item, index) in menuCategories"
        :key="index"
        class="menu-list"
        @click="clickTitle(index)"
        :class="{active: currentIndex === index}"
      >
        <div class="menu-title">{{ item.title }}</div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "../../../components/commen/scroll/Scroll";

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    menuCategories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    clickTitle(index) {
      this.currentIndex = index;
      this.$emit("selectTitle", index);
    }
  }
};
</script>

<style lang="less" scoped>
#tab-menu {
  width: 100px;
  height: 100%;
  background: #f6f6f6;
  box-sizing: border-box;
  overflow: hidden;

  .menu-list {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background: #fff;
    border-left: 2px solid var(--color-high-text);
  }
}
</style>