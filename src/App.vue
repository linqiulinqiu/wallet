<template>
  <div id="app">
    <el-col id="main">
      <Mnemonic />
      <Send />
    </el-col>
  </div>
</template>

<script>
import Mnemonic from "./components/Mnemonic.vue";
import Send from "./components/Send.vue";

export default {
  name: "App",
  components: {
    Send,
    Mnemonic,
  },
};
</script>

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
