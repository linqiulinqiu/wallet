<template>
  <el-row type="flex" justify="center">
    <el-col :lg="4" :md="6" :xs="3" id="contact-us">
      <a href="https://discord.gg/xHC9fBfeVW" target="_blank"> </a>
      <a href="https://t.me/PlotBridge" target="_blank"> </a>
      <a href="https://twitter.com/plot_bridge" target="_blank"> </a>
    </el-col>
    <el-col :lg="15" :md="14" :sm="6" :xs="0"></el-col>
    <el-col :lg="2" :sm="4" :xs="7">
      <div @click="openPancakeLp" id="link-lp">
        <img
          id="pancake-lp"
          src="../assets/images/bunny-color.png"
          alt="pancake"
        />
        <span v-if="this.coin == 'XCC'">
          <img src="../assets/images/pxcc-logo.png" alt="chives" />
        </span>
        <span v-else-if="this.coin == 'XCH'">
          <img src="../assets/images/pxch-logo.png" alt="chia" />
        </span>
        LP
      </div>
    </el-col>
    <el-col :lg="4" :md="5" :sm="6" :xs="8">
      <div v-if="this.coin == 'XCC'">
        <el-col id="pool-info" :span="11">
          <a
            target="_blank"
            href="https://pancakeswap.finance/info/pool/0x62608fa59fcd378cd71ce277a50f24df333b4633"
            >{{ $t("pool-info") }}</a
          >
        </el-col>
        <el-col id="token-info" :span="11">
          <a
            target="_blank"
            href="https://bscscan.com/token/0x24D7ec172b331c7636a5Ca604de890996e5e2028"
            >{{ $t("token-info") }}</a
          >
        </el-col>
      </div>
      <div v-if="this.coin == 'XCH'">
        <el-col id="pool-info" :span="11">
          <a
            icon="el-icon-info"
            href="https://pancakeswap.finance/info/pool/0xffdfb45e3d743ec10eb793fdcee3055ea82c270c"
            target="_blank"
            >{{ $t("pool-info") }}</a
          >
        </el-col>
        <el-col id="token-info" :span="11">
          <a
            target="_blank"
            href="https://bscscan.com/token/0x8fCD852147d1BbA1C4f4dFf07880cCB25DD36DD7"
            >{{ $t("token-info") }}</a
          >
        </el-col>
      </div></el-col
    >
  </el-row>
</template>
<script>
import { mapState } from "vuex";
import wops from "../wallet";

export default {
  name: "links",

  computed: mapState({
    baddr: "baddr",
    coin: "coin",
  }),
  methods: {
    openPancakeLp: function () {
      const contract_addr = wops.get_contract_addr();
      const lp_addr = "/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
      const prefixpPancake = "https://pancakeswap.finance/add/";
      const url = prefixpPancake + contract_addr + lp_addr;
      if (!contract_addr) {
        this.$message("Please connect wallet");
      } else {
        window.open(url);
      }
    },
  },
};
</script>
<style>
#contact-us {
  float: left;
  width: 250px;
  height: 50px;
  margin-top: 15px;
}
#contact-us a {
  display: block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
  text-align: center;
}
#contact-us a:first-child {
  background: url(../assets/images/discordlogo.png) no-repeat center;
  background-size: 100%;
}
#contact-us a:nth-child(2) {
  background: url("../assets/images/telegram-logo.svg") no-repeat center;
  background-size: 100%;
}
#contact-us a:nth-child(3) {
  background: url(../assets/images/twitter-logo.jpg) no-repeat center;
  background-size: 100%;
}
#contact-us a:nth-child(2):hover {
  background: url("../assets/images/telegram-logo.svg") no-repeat center;
  background-size: 120%;
}
#contact-us a:nth-child(3):hover {
  background: url(../assets/images/twitter-logo.jpg) no-repeat center;
  background-size: 120%;
}
#contact-us a:first-child:hover {
  background: url(../assets/images/discordlogo.png) no-repeat center;
  background-size: 120%;
}
#link-lp {
  margin-top: 10px;
  border: 1px solid #d1fcd1;
  width: 100px;
  border-radius: 15px;
}
#link-lp img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
#link-lp:hover img {
  transform: scale(1.2);
  transition: transform 0.3s;
}
#token-info,
#pool-info {
  border: 1px solid #d1fcd1;
  /* height: 35px; */
  border-radius: 20px;
  line-height: 15px;
  margin-top: 10px;
  padding: 10px;
  margin-left: 5px;
}
</style>