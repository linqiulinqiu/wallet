<template>
  <div class="introduction">
      <DepositAddr />
      <div v-if="deposit_addr">
        <p>{{$t('deposit-addr')}}</p>
        <p>{{$t('transcation-fee')}}</p>
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
<style>

</style>