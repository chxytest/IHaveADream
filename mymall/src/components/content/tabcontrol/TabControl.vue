<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabclick", this.currentIndex);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-control {
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  display: flex;

  .tab-control-item {
    flex: 1;

    span {
      padding: 5px;
    }
  }

  .active {
    color: var(--color-high-text);

    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>