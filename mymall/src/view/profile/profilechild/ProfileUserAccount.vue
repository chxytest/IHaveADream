<template>
  <div class="user-account">
    <div class="account-item" v-for="(item, index) in accountList" :key="index">
      <div class="item-num">
        <span class="account-num">{{ item.num }}</span>
        <span class="account-unti">{{ item.unti }}</span>
      </div>
      <div class="account-detail">{{ item.accountInfo }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUserAccount",
  props: {
    accountList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-account {
  // height: ;
  display: flex;

  .account-item {
    width: 100%;
    padding: 18px;
    margin-right: 1px;
    font-size: 13px;
    color: #666;
    background: #fff;
    text-align: center;

    .account-num {
      font-size: 24px;
      font-weight: 700;
      color: #ff5f3e;
    }

    .account-detail {
      margin-top: 6px;
    }
  }

  .account-item:last-of-type {
    margin-right: 0;
  }
}
</style>