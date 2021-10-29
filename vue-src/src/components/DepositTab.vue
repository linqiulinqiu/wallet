<template>
  <div class="introduction">
      <DepositAddr />
      <div v-if="deposit_addr">
        <p>{{$t('deposit-addr',{coin,coin})}}</p>
        <p>{{ $t('transaction-fee',{coin:coin}) }}</p>
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
  .introduction{
    height: 350px;
    position: relative;
    width: 80%;
    margin: 0px auto;
  }
  .introduction p:last-child{
    position: relative;
  }
  .introduction p:first-child{
    margin-bottom:10px ;
  }
</style>