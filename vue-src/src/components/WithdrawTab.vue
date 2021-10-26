<template>
  <div>
    <WithdrawAddr />
    <div v-if="withdraw_addr">
      <p>{{ $t('burn-introduction') }}</p>
      <p>{{ $t('transcation-fee') }}</p>
    </div>
  </div>
    
</template>

<script>
import WithdrawAddr from './WithdrawAddr.vue'
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
