<template>
  <el-col v-if="this.$store.state.addrVisible">
    <div>
      <el-button @click="get_addr">Get Addr</el-button>
      <div v-if="addr_banner">
        <el-carousel trigger="click" height="350px" :autoplay="false">
          <el-carousel-item v-for="(item, index) in addrInfo" :key="index">
            <el-col id="banner">
              <p>address:{{ item.address }}</p>
              <p>balance:{{ item.balance / 1e12 }}</p>
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
        info = wkeys.addrs_info();
        this.$store.commit("setAddrInfo", info);
      },
    },
  },
  data() {
    return {
      addr_banner: false,
      bal: 0,
    };
  },
  methods: {
    get_addr: async function () {
      this.addr_banner = true;
      const addr_info = await wkeys.addrs_info();
      this.bal = await wkeys.balances();
      // for (let i in addr_info) {
      //   if (addr_info[i].balance > 0) {
      //     addr_info[i].balance = addr_info[i].balance.dividedBy(
      //       new BigNumber(10).pow(12)
      //     );
      //   }
      // }
      this.$store.commit("setAddrInfo", addr_info);
    },
  },
};
</script>
