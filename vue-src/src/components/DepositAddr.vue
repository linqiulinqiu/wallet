<template>
    <div class="deposit-addr" v-if="baddr">
        <div v-if="deposit_addr">
          <p>{{deposit_addr}}</p>
        </div>
        <div v-else>
          <el-button v-if="free_xins>0" @click.native.prevent="obtain_addr" :loading="loading">{{$t("obtain-deposit-address")}}</el-button>
          <p v-else-if="free_xins===0">{{$t('no-depositAddr')}}</p>
          <p v-else>
            <pulse-loader></pulse-loader>
            {{$t('check-depositAddr')}}
          </p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'


export default {
  name: 'DepositAddr',
  computed: mapState({
      baddr: 'baddr',
      deposit_addr: "deposit_addr",
      coin: "coin",
      free_xins:"free_xins"
  }),
  data: ()=>{
    return {
      loading: false
    }
  },
  methods: {
      obtain_addr: async function (){
          this.disabled
          const commit = this.$store.commit
          this.loading = true
          const msg = await wops.obtain_deposit_addr(function(xaddr){
            commit('setDepositAddr',xaddr)
          })
          if(msg!='ok'){
            this.loading = false
            this.$message(msg)
          }
      }
  }
}
</script>
