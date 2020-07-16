<template>
  <div class="user-info">
    <img src="../../../assets/img/profile/avatar.svg" alt class="avatar" />

    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="../../../assets/img/profile/phone.svg" alt />
        <span>暂无绑定手机号</span>
      </div>
    </div>

    <div class="arrow">
      <img src="../../../assets/img/common/arrow-left.svg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUserInfo"
};
</script>

<style lang="less" scoped>
.user-info {
  height: 85px;
  background: var(--color-tint);
  padding: 6px 15px;
  color: #fff;
  display: flex;

  .avatar {
    height: 70px;
    width: 70px;
  }

  .info {
    padding-left: 15px;
    flex: 1;

    .login {
      margin-top: 15px;
    }

    img {
      width: 20px;
      height: 30px;
      vertical-align: middle;
      margin-left: -5px;
    }

    span {
      font-size: 13px;
    }
  }

  .arrow {
    width: 20px;
    line-height: 85px;
    img {
      width: 20px;
    }
  }
}
</style>