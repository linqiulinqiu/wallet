<template>
  <el-row type="flex" justify="center">
    <el-col :lg="3" :xs="3" id="contact-us">
      <a href="https://discord.gg/xHC9fBfeVW" target="_blank"> </a>
      <a href="https://t.me/PlotBridge" target="_blank"> </a>
      <a href="https://twitter.com/plot_bridge" target="_blank"> </a>
    </el-col>
    <el-col :lg="15" :md="14" :xs="1"></el-col>
    <el-col :lg="4" :xs="6">
      <div @click="openPancakeLp" id="link-lp">
        <img
          id="pancake-lp"
          src="../assets/images/bunny-color.png"
          alt="pancake"
        />
        <img src="../assets/images/pxcc-logo.png" alt="chives" />
        <a>LP</a>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "links",

  computed: mapState({
    baddr: "baddr",
    coin: "coin",
  }),
  methods: {
    openPancakeLp: function () {
      if (this.coin == "XCC") {
        const pancake_prefix =
          "https://pancakeswap.finance/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x0243FB40dDED3b4622004035D4871AA1541dB8B4";
        const url = pancake_prefix;
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
  background: url("../assets/images/t_logo.svg") no-repeat center;
  background-size: 100%;
}
#contact-us a:nth-child(3) {
  background: url(../assets/images/twitter-logo.jpg) no-repeat center;
  background-size: 100%;
}
#contact-us a:nth-child(2):hover {
  background: url("../assets/images/t_logo.svg") no-repeat center;
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
  /* height: 40px; */
}
.el-footer img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.el-footer #link-lp:hover img {
  transform: scale(1.2);
  transition: transform 0.3s;
}
</style>