<template>
  <div id="app">
    <el-col id="main">
      <Mnemonic />
      <History />
      <Send />
    </el-col>
  </div>
</template>

<script>
// import History from "./components/History.vue";
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
