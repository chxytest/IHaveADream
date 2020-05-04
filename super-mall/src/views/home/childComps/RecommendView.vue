<template>
  <div class="recommend-view">
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

<style>
.recommend-view {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 13px;
  padding: 10px 0 23px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 69px;
  height: 69px;
  margin-bottom: 10px;
}
</style>