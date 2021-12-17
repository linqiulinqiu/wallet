<template>
  <div id="app">
    <el-row :gutter="10" type="flex" justify="center" align="middle">
      <el-col :xs="20" :sm="18" :md="14" :lg="10" :xl="10">
        <el-col class="a"><Mnemonic /></el-col>
        <el-col class="aa"><History /></el-col>
        <el-col class="aa"><Send /></el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Mnemonic from "./components/Mnemonic.vue";
import Send from "./components/Send.vue";
import History from "./components/History.vue";

export default {
  name: "App",
  components: {
    Send,
    History,
    Mnemonic,
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
</style>
