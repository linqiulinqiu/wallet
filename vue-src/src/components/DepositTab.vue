<template>
  <div class="introduction">
      <DepositAddr />
      <div v-if="deposit_addr" class="fee">
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
    height: 360px;
    position: relative;
    top: 30px;
    width: 90%;
    margin: 0px auto;
  }
  .introduction .fee{
    margin-top: 55px;
  }
  .introduction .fee p{
    margin-bottom:25px;
    color: rgb(23, 73, 5);
  }
</style>