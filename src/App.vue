<template>
  <div id="app">
    <Mnemonic />
    <Send />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
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
</style>
