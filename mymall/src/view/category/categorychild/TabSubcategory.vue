<template>
  <div class="tab-subcategory">
    <div v-for="(item, index) in subCategories.list" :key="index" class="item">
      <img :src="item.image" alt />
      <div class="item-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabSubcategory",
  props: {
    subCategories: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tab-subcategory {
  padding: 5px 8px;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 15px;

  .item {
    width: 81px;
    margin-right: 8px;
    margin-top: 15px;
    text-align: center;
    font-size: 12px;

    img {
      width: 80%;
    }

    .item-title {
      margin-top: 15px;
    }
  }

  .item:nth-child(3n) {
    margin-right: 0px;
  }
}
</style>