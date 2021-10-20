<template>
  <div id="app">
    <ConnectWallet />
    <DepositAddr />
  </div>
</template>

<script>
import ConnectWallet from './components/ConnectWallet.vue'
import DepositAddr from './components/DepositAddr.vue'

export default {
  name: 'App',
  components: {
    ConnectWallet,
    DepositAddr
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
