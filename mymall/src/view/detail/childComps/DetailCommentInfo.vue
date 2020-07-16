<template>
  <div class="detail-comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-info-head">
      <div class="head-title">用户评价</div>
      <div class="head-more">更多</div>
    </div>
    <div class="comment-info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="comment-info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span>{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    showDate(value) {
      // 1. 将时间戳转换成 date 对象
      const date = new Date(value * 1000);

      // 2. 将date 转换成年月日
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.detail-comment-info {
  padding: 5px 12px;
  color: #333;
  border: 5px solid #f2f5f8;

  .comment-info-head {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;

    .head-title {
      font-size: 15px;
    }

    .head-more {
      font-size: 13px;
      margin-right: 10px;
    }
  }

  .comment-info-user {
    padding: 10px 0 5px;

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    span {
      font-size: 15px;
      position: relative;
      top: -15px;
      margin-left: 10px;
    }
  }

  .comment-info-detail {
    padding: 0 5px 15px;

    p {
      font-size: 13px;
      color: #777;
      line-height: 1.5;
    }

    .info-other {
      font-size: 12px;
      color: #999;
      margin-top: 10px;

      span {
        margin-right: 5px;
      }
    }
  }
}
</style>