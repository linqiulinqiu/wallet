<template>
    <div class="withdraw-addr" v-if="baddr">
        <div v-if="withdraw_addr" class="bound">
          <p class="send">{{$t('burn-coin',{coin:coin,withdraw_addr:withdraw_addr})}}</p> 
        </div>
        <div v-else>
          <p><el-input v-model="xwaddr" :placeholder="$t('input-wallet-for-withdraw')" suffix-icon="el-icon-edit"></el-input></p>
          <el-button @click="bind_addr" :loading="loading" :disabled="disabled">{{$t("bind-withdraw-address")}}</el-button>
        </div>
        <div class="withdrawburn">
          <WithdrawBurn />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import wops from '../wallet'
import WithdrawBurn from "./WithdrawBurn.vue";

export default {
  name: 'WithdrawAddr',
  components:{
    WithdrawBurn,
  },
  computed: mapState({
      baddr: "baddr",
      withdraw_addr: "withdraw_addr",
      coin: "coin"
  }),
  data: ()=>{
      return {
          xwaddr:'',
          loading:false,
          disabled:false
      }
  },
  methods: {
      bind_addr: async function (){
          const commit = this.$store.commit
          const msg = await wops.bind_withdraw_addr(this.xwaddr,function(xaddr){
            console.log('tx done')
            commit('setWithdrawAddr',xaddr)
          })
          if(msg==='ok'){
            console.log('tx start, loading')
            this.loading = true
            this.disabled = true
          }else{
            console.log('no tx should be done')
            this.$message(msg)
            this.xwaddr = ""
            this.loading = false
            this.disabled = false
          }
      }
  }
}
</script>
<style>
  .withdraw-addr{
    height: 250px;
  }
  .withdraw-addr .el-input{
    width: 70%;
    margin: 20px auto;
  }
  .bound{
    background-color: rgba(142, 190, 138, 0.521);
    color: rgb(23,73,5);
    display: block;
    width: 90%;
    height: 100px;
    line-height: 50px;
    border-radius: 20px;
    margin: 30px auto 10px;
  }
</style>
