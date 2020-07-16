<template>
  <div class="home-swiper" v-if="banners && banners.length">
    <swiper ref="mySwiper" :options="swiperOptions" v-if="banners && banners.length">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="imageLoad" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    banners: {
      type: Array,
      default() {
        return;
      }
    }
  },
  data() {
    return {
      isload: false,
      swiperOptions: {
        loop: true,
        // effect: "coverflow", // 3d流
        autoplay: {
          delay: "3000",
          disableOnInteraction: false
        },
        slidesPerView: 1,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active"
        }
      }
    };
  },
  watch: {
    banners(newVal) {
      if (newVal && newVal.length <= 1) {
        this.swiperOptions.loop = false;
      }

      this.$nextTick(() => {
        this.swiper.updateSlides();
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    imageLoad() {
      if (!this.isload) {
        this.$emit("swiperImageload");
        this.isload = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-swiper {
  width: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 4px;
    --swiper-pagination-color: red;
    --swiper-theme-color: white;
  }

  .swiper-pagination-bullet {
    background-color: white;
  }
}
</style>