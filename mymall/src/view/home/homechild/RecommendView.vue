<template>
  <div class="recommend-view" v-if="recommends.length > 0">
    <div class="recommend-item" v-for="(item, sort) in recommends" :key="sort">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div class="recommend-title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.recommend-view {
  width: 100%;
  display: flex;
  overflow: hidden;
  text-align: center;
  font-size: 13px;
  padding: 10px 0 23px;
  border-bottom: 10px solid #eee;

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 69px;
    height: 69px;
    margin-bottom: 10px;
  }
}
</style>