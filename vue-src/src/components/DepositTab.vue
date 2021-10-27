<template>
  <div class="introduction">
      <DepositAddr />
      <div v-if="deposit_addr">
        <p>{{$t('deposit-addr',{coin,coin})}}</p>
        <p>{{ $t('transcation-fee',{coin:coin}) }}</p>
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
      deposit_addr: "deposit_addr",
      coin:"coin"
  }),
  methods: {

  }
}
</script>
<style>

</style>