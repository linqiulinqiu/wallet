<template>
  <el-carousel trigger="click" height="350px" :autoplay="false">
    <el-carousel-item v-for="(item, index) in history" :key="index">
      <el-col id="banner">
        <p>address:{{ item.address }}</p>
        <p>balance:{{ item.balance }}</p>
        <p>update at:{{ item.time }}</p>
      </el-col>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    var history = [];
    for (var i = 0; i <= 10; i++) {
      var item = {};
      item.address = "address" + i;
      item.balance = "balance" + i;
      item.time = "time" + i;
      history.push(item);
    }
    return {
      history: history,
      disabled_p: true,
      disabled_n: false,
    };
  },
};
</script>