<template>
  <div id="profile">
    <!-- 顶部我的档案导航 -->
    <nav-bar class="profile-nav">
      <div slot="center">我的档案</div>
    </nav-bar>
    <!-- 用户信息栏 -->
    <profile-user-info />
    <!-- 我的余额、优惠和积分 -->
    <profile-user-account :account-list="accountList" />
    <!-- 消息、积分和会员 -->
    <normal-list-view :normal-list="orderList" />
    <!-- 购物车、下载APP -->
    <normal-list-view :normal-list="serviceList" />
  </div>
</template>

<script>
import NavBar from "../../components/commen/navbar/NavBar";
import ProfileUserInfo from "./profilechild/ProfileUserInfo";
import ProfileUserAccount from "./profilechild/ProfileUserAccount";
import NormalListView from "./profilechild/NormalListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileUserInfo,
    ProfileUserAccount,
    NormalListView
  },
  data() {
    return {
      accountList: [
        { num: "0.00", unti: "元", accountInfo: "我的余额" },
        { num: 0, unti: "个", accountInfo: "我的优惠" },
        { num: 0, unti: "分", accountInfo: "我的积分" }
      ],
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" }
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#profile {
  height: 100vh;
  width: 100%;
  background: #f2f2f2;

  .profile-nav {
    background: var(--color-tint);
    color: #fff;
  }
}
</style>