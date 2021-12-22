<template>
  <el-col v-if="this.$store.state.addrVisible">
    <div>
      <el-button @click="get_addr">Get Addr</el-button>
      <div v-if="addr_banner">
        <el-carousel trigger="click" height="350px" :autoplay="false">
          <el-carousel-item v-for="item in addrInfo" :key="item.address">
            <el-col id="banner">
              <p>{{ item.address }}</p>
              <p>balance:{{ item.balance }}</p>
              <!-- <p>update at:{{ item.time }}</p> -->
            </el-col>
          </el-carousel-item>
        </el-carousel>
        <div>Total Balance: {{ bal }}</div>
      </div>
    </div>
  </el-col>
</template>
<script>
import wkeys from "../wkeys";
import hisAddr from "../assets/hisAddr.js";
import { BigNumber } from "@ethersproject/bignumber";
export default {
  computed: {
    addrInfo: {
      get() {
        console.log("000");
        return this.$store.state.addrInfo;
      },
      set(info) {
        console.log("222");
        // info = wkeys.addrs_info();
        this.$store.commit("setAddrInfo", info);
      },
    },
  },
  data() {
    return {
      addr_banner: true,
      bal: 0,
    };
  },
  // watch: {
  //   addrInfo: {
  //     function() {
  //       console.log("watch addrinfo", this.$store.state.addrInfo);
  //       return this.$store.state.addrInfo;
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    get_addr: async function () {
      this.addr_banner = true;
      const addr_info = await wkeys.addrs_info();
      this.bal = await wkeys.balances();
      this.$store.commit("setAddrInfo", addr_info);
    },
  },
};
</script>
