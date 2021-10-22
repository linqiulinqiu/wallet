<template>
  <div>
      <DepositAddr />
      <div v-if="deposit_addr">
        <p>Deposit XCH into this address, then PXCH will be distributed to your BSC wallet</p>
        <p>Transaction Fee at 0.3% will be charged, minimal 0.01 XCH for each transaction</p>
      </div>
  </div>
</template>

<script>
import DepositAddr from './DepositAddr'
import { mapState } from 'vuex'

export default {
  name: 'DepositTab',
  components: {
    DepositAddr
  },
  computed: mapState({
      deposit_addr: "deposit_addr"
  }),
  methods: {

  }
}
</script>
