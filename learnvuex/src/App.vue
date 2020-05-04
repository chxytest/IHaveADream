<template>
  <div id="app">
    <hr />
    <h2>{{ $store.state.info }}</h2>
    <button @click="updateInfo">修改信息</button>
    <hr />
    <h2>{{ message }}</h2>
    <h2>{{ $store.state.count }}</h2>
    <button @click="addClick">+</button>
    <button @click="redClick">-</button>
    <hr />
    <h2>{{ $store.getters.powerCount }}</h2>
    <hr />
    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from "../src/components/HelloVuex";

import { INCREMENT } from "./store/mutations-type";

export default {
  name: "App",
  components: {
    HelloVuex
  },
  data() {
    return {
      message: "我是APP"
    };
  },
  methods: {
    addClick() {
      this.$store.commit(INCREMENT);
    },
    redClick() {
      this.$store.commit("decrement");
    },
    updateInfo() {
      // this.$store.commit("updateInfo");
      this.$store.dispatch("aupdateInfo", "我是payload").then(res => {
        console.log("里面提交完成");
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less">
</style>