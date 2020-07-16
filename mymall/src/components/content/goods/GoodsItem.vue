<template>
  <div class="goods-item" @click="goodsItemClick">
    <img v-lazy="showImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <div class="goods-price">
        <span class="price">{{ goodsItem.price }}</span>
        <img src="../../../assets/img/common/collect.svg" alt />
        <!-- <span class="image"></span> -->
        <span class="collect">{{ goodsItem.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import collect from "../../../assets/img/common/collect.svg";

export default {
  name: "GoodsItem",
  // data() {
  //   return {
  //     lazyImage: "../../../assets/img/common/placeholder.png"
  //   };
  // },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    }
  },
  methods: {
    imageLoad() {
      // console.log("加载完图片");
      // itemImageLoad 事件表示图片都加载完了
      this.$bus.$emit("itemImageLoad");

      // 方法二：
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("HomeItemImageLoad");
      // } else if (this.$route.path.indexOf("Detail")) {
      //   this.$bus.$emit("DetailItemImageLoad");
      // }
    },
    goodsItemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style lang="less" scoped>
.goods-item {
  padding-bottom: 40px;
  width: 48%;
  position: relative;

  img {
    width: 100%;
    border-radius: 8px;
  }

  .goods-info {
    overflow: hidden;
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    right: 0;
    left: 0;
    text-align: center;

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 3px;
    }

    .goods-price {
      display: flex;
      justify-content: center;
    }

    .price {
      color: var(--color-high-text);
      margin-right: 3px;
    }

    img {
      width: 14px;
      height: 14px;
    }
    // .image {
    //   width: 14px;
    //   height: 14px;
    //   background: url(collect);
    // }

    .collect {
      margin-left: 2px;
    }
  }
}
// .goods-info .collect {
//   position: relative;
// }
// .goods-info .collect::before {
//   content: "";
//   position: absolute;
//   left: -15px;
//   top: -1px;
//   width: 14px;
//   height: 14px;
//   background: url("../../../assets/img/common/collect.svg");
// }
</style>