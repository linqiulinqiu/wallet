<template>
  <div id="app">
    <el-row :gutter="10" type="flex" justify="center" align="middle">
      <el-col :xs="20" :sm="18" :md="14" :lg="10" :xl="10">
        <el-col class="a"><Connect /></el-col>
        <el-col class="a"><Mnemonic /></el-col>
        <!-- <el-col class="aa"><TestAddr /></el-col> -->

        <el-col class="aa"><History /></el-col>
        <!-- <el-col class="aa"><Send /></el-col> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Mnemonic from "./components/Mnemonic.vue";
import Send from "./components/Send.vue";
import History from "./components/History.vue";
import TestAddr from "./components/TestAddr.vue";
import Connect from "./components/ConnectWallet.vue";

export default {
  name: "App",
  components: {
    Send,
    History,
    Mnemonic,
    TestAddr,
    Connect,
  },
};
</script>,
    History

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#main {
  width: 700px;
  margin: 50px auto;
}
.a {
  height: 100px;
  padding: 20px;
  border: 1px steelblue dashed;
}
</style>
