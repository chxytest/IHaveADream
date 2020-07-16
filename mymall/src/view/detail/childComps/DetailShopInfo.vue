<template>
  <div class="deatil-shop-info" v-if="Object.keys(shopInfo).length !== 0">
    <div class="shop-top">
      <img :src="shopInfo.shopLogo" alt />
      <span class="title">{{ shopInfo.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="middle-left middel-item">
        <div class="sells-info">
          <div class="sells-count">{{ shopInfo.cSells | sellCountFilter }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="goods-info">
          <div class="goods-count">{{ shopInfo.cGoods }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="middle-right middel-item">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{ item.score }}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style lang="less" scoped>
.deatil-shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;

  .shop-top {
    line-height: 45px;
    align-items: center;
    display: flex;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .title {
      margin-left: 10px;
    }
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;

    .middle-left {
      display: flex;
      justify-content: space-evenly;
      color: #333;
      text-align: center;
      border-right: 1px solid rgba(0, 0, 0, 0.1);

      // 如下方法解决盒子之间等均分的问题
      // justify-content: space-between;
      // &:before,
      // &:after {
      //   content: "";
      //   display: block;
      // }

      .sells-count,
      .goods-count {
        font-size: 18px;
      }
      .sells-text,
      .goods-text {
        margin-top: 10px;
        font-size: 12px;
      }
    }

    .middle-right {
      font-size: 13px;
      color: #333;

      table {
        width: 120px;
        margin-left: 20px;
      }

      table td {
        padding: 5px 0;
      }

      table tr {
        vertical-align: middle;
      }

      .score {
        color: #5ea732;
      }

      .score-better {
        color: #f13e3a;
      }

      .better span {
        background-color: #5ea732;
        color: #fff;
        text-align: center;
      }

      .better-more span {
        background-color: #f13e3a;
      }
    }

    .middel-item {
      flex: 1;
    }
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;

    .enter-shop {
      display: inline-block;
      font-size: 14px;
      background-color: #f2f5f8;
      width: 150px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 10px;
    }
  }
}
</style>