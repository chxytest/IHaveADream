<template>
  <div class="detail-params-info" v-if="Object.keys(paramsInfo).length !== 0">
    <div class="params-rule">
      <div class="rule-size">{{ paramsInfo.rulekey }}</div>
      <table class="info-size" v-for="(item, index) in paramsInfo.tables" :key="index">
        <tr v-for="(tr, x) in item" :key="x">
          <td v-for="(td, y) in tr" :key="y">{{ td }}</td>
        </tr>
      </table>
    </div>
    <div class="params-info">
      <div class="info-key">{{ paramsInfo.infokey }}</div>
      <table class="info-param">
        <tr v-for="(info, k) in paramsInfo.set" :key="k">
          <td class="info-param-key">{{ info.key }}</td>
          <td class="param-value">{{ info.value }}</td>
        </tr>
      </table>
    </div>
    <div class="info-img" v-if="paramsInfo.image.length !== 0">
      <img :src="paramsInfo.image" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail-params-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;

  .rule-size {
    width: 100%;
    height: 42px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 42px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      height: 42px;

      td {
        border-bottom: 1px solid rgba(100, 100, 100, 0.1);
      }
    }
  }

  .params-info {
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    .info-key {
      width: 100%;
      height: 42px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.1);
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      line-height: 42px;
    }

    .info-param-key {
      /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
      width: 95px;
    }

    .param-value {
      color: #eb4868;
    }
  }

  .info-img img {
    width: 100%;
  }
}
</style>