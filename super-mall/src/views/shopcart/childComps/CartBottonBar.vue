<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSellectAll" @click.native="checkedClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算：({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottonBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSellectAll() {
      // 当所有的都没被选中时取反为 false
      if (this.cartList.length === 0) return false;
      // 方法一：过滤器方法
      // return !this.cartList.filter(item => !item.checked).length;
      // 方法二：去查找只要有一个是 false 全选按钮就不会选中
      return !this.cartList.find(item => !item.checked);
      // 方法三：普通遍历
      // for (let item of this.cartList) {
      //   if (!this.checked) {
      //     return false;
      //   }
      // }
      // return true;
    }
  },
  methods: {
    checkedClick() {
      if (this.isSellectAll) {
        // 全部选中
        this.cartList.forEach(item => (item.checked = false));
      } else {
        // 全部或部分不选中
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  display: flex;
  bottom: 49px;
  width: 100%;
  height: 40px;
  background: #eee;
  line-height: 40px;
  font-size: 14px;
}
.bottom-bar .check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.bottom-bar .check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>