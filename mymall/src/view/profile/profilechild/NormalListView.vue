<template>
  <div class="list-view">
    <div class="list-item" v-for="(item, index) in normalList" :key="index">
      <img :src="imgUrl(item)" alt class="list-icon" />
      <div class="list-info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalListView",
  props: {
    normalList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imgUrl(item) {
      return require("../../../assets/img/profile/" + item.icon);
      // return "/img/profile/" + item.icon;
    }
  }
};
</script>

<style lang="less">
.list-view {
  background-color: #fff;
  font-size: 15px;
  color: #333;
  margin-top: 15px;

  .list-item {
    height: 44px;
    line-height: 44px;
    position: relative;

    img {
      width: 20px;
      height: 20px;
      position: absolute;
      left: 16px;
      top: 9px;
    }

    .list-info {
      margin-left: 40px;
      padding-left: 5px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    }
  }

  .list-item:last-of-type .list-info {
    border-bottom: 0px;
  }
}
</style>