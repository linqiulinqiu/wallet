<template>
  <el-carousel
    class="aa"
    :interval="4000"
    height="400px"
    :autoplay="false"
    indicator-position="outside"
  >
    <el-carousel-item v-for="item in history" :key="item.id">
      <p>adress:{{ item.address }}</p>
      balance:{{ item.balance }}
      <p>update at:{{ item.update }}</p>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    var history = [];
    for (var i = 1; i <= 100; i++) {
      var item = {};
      item.address = "address" + i;
      item.balance = "balance" + i;
      item.update = "update" + i;
      history.unshift(item[i]);
    }
    return {
      history: [
        {
          address: item.address,
          balance: item.balance,
          update: item.update,
        },
      ],
    };
  },
};
</script>