<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="detail-back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="detail-title">
        <div
          v-for="(item, index) in title"
          :key="index"
          class="detail-title-item"
          :class="{active: currentIndex === index}"
          @click="titleClick(index)"
        >{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/commen/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      // this.$router.go(-1);
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.detail-title {
  display: flex;
  font-size: 15px;
  // justify-content: space-around;

  .detail-title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
}

.detail-back img {
  margin-top: 10px;
}
</style>