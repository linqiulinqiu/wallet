<template>
  <el-carousel
    :interval="4000"
    height="400px"
    :autoplay="false"
    indicator-position="outside"
  >
    <el-carousel-item v-for="item in history" :key="item.id">
      <!-- <img :src="item.address" class="image" /> -->
      address:{{ item.address }}
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      history: [
        {
          address: "addr 1",
          balance: "balance 1",
          time: "time 1",
        },
        {
          address: "addr 1",
          balance: "balance 1",
          time: "time 1",
        },
        {
          address: "addr 1",
          balance: "balance 1",
          time: "time 1",
        },
        {
          address: "addr 1",
          balance: "balance 1",
          time: "time 1",
        },
        {
          address: "addr 1",
          balance: "balance 1",
          time: "time 1",
        },
        {
          address: "addr 2",
          balance: "balance 2",
          time: "time 2",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
        {
          address: "addr 3",
          balance: "balance 3",
          time: "time 3",
        },
      ],
    };
  },
};
</script>