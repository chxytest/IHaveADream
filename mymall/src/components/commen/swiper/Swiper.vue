<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          :key="index"
          class="indi-item"
          :class="{active: index === currentIndex-1}"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      // 默认自动轮播时间
      type: Number,
      default: 3000
    },
    animDuration: {
      // 默认元素滚动的值
      type: Number,
      default: 300
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    moveRatio: {
      type: Number,
      default: 0.25
    }
  },
  data() {
    return {
      scrolling: false, // 是否正在滚动
      currentIndex: 1, // 当前的index
      swiperStyle: {}, // swiper样式
      slideCount: 0, // 元素个数
      totalWidth: 0 // swiper的宽度
    };
  },
  mounted() {
    setTimeout(() => {
      // 1. 操作DOM在前后添加 slide
      this.handleDom();
      // 2. 开启定时器
      this.startTimer();
    }, 100);
  },
  methods: {
    // 1.定时器操作
    startTimer: function() {
      // 开始时间
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer: function() {
      // 停止时间
      window.clearInterval(this.playTimer);
    },

    // 2.轮播上一个和下一个
    previous() {
      this.changeItem(-1);
    },
    next() {
      this.changeItem(1);
    },

    // 3.切换改变item轮播
    changeItem(num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.改变currentIndex和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    },

    // 4.轮播滚动到正确的位置
    scrollContent(currentPosition) {
      // 1.设置正在滚动
      this.scrolling = true;

      // 2.开始滚动
      this.swiperStyle.transition = "transform" + this.animDuration + "ms";
      this.setTransform(currentPosition);

      // 3.判断滚动到的位置
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false;
    },

    // 5.设置滚动的位置
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px, 0, 0)`;
    },

    // 6.校验滚动的正确位置
    checkPosition() {
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        // 2.结束移动后回调
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },

    // 7.操作DOM, 在DOM前后添加Slide
    handleDom() {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");

      // 2.保存个数
      this.slideCount = slidesEls.length;

      // 3.如果大于1个，那么在前后分别添加一个 slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      // 4.让swiper元素，显示第一个（目前是显示首页前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    },

    // 8.拖动事件处理
    // 8.1拖动触碰开始
    touchStart(e) {
      // 1.如果正在滚动可以不拖动
      if (this.scrolling) return;

      // 2.停止定时器
      this.stopTimer();

      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
      // console.log(this.startX);
    },
    // 8.2触碰后移动
    touchMove(e) {
      // 1.计算出用户的拖动距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前位置
      this.setTransform(moveDistance);
    },
    // 8.3拖动触碰结束
    touchEnd() {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终距离
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 右边移动超过 0.5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 左边移动超过 0.5
        this.currentIndex++;
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 4.移动完成后重新开始定时器
      this.startTimer();
    }
  }
};
</script>

<style lang="less" scoped>
#hy-swiper {
  position: relative;
  overflow: hidden;

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;

    .indi-item {
      box-sizing: border-box;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: #fff;
      line-height: 8px;
      text-align: center;
      font-size: 12px;
      margin: 0 5px;
    }

    .indi-item.active {
      background-color: rgba(212, 62, 46, 1);
    }
  }
}
</style>