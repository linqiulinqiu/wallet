<template>
  <div>
      <WithdrawAddr />
      <div v-if="withdraw_addr">
        <p>Burn P{{coin}}, then {{coin}} will be distributed to your {{coin}} wallet</p>
        <p>Transaction Fee at 0.1% will be charged, minimal 0.001 P{{coin}} for each transaction</p>
      </div>
  </div>
</template>

<script>
import WithdrawAddr from './WithdrawAddr'
import { mapState } from 'vuex'

export default {
  name: 'WithdrawTab',
  components: {
    WithdrawAddr
  },
  computed: mapState({
      withdraw_addr: "withdraw_addr",
      coin: "coin"
  })
}
</script>
