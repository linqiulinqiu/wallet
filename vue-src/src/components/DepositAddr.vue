<template>
    <div class="deposit-addr" v-if="baddr">
        <div v-if="deposit_addr" class="have-dep-addr">
          <el-tooltip placement="top">
            <p>{{deposit_addr}}</p>>
            <span size="small" slot="content">{{$t('copy-dep-addr')}}</span> 
          </el-tooltip>
        </div>
        <div v-else>
          <el-button v-if="free_xins>0" @click.native.prevent="obtain_addr" :loading="loading" class="obtain">{{$t("obtain-deposit-address")}}</el-button>
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
      loading: false,

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
<style>
  .deposit-addr{
    width: 100%;
    margin-top: 50px;
  }
  .deposit-addr .obtain{
    height: 50px;
    margin-top:80px ;
    border-radius: 15px;
  }
  .deposit-addr .el-button:hover{
    background-color: #668b66;
    color: #d1fcd1;
    border: #b1fcb1 1px solid;
  }
  .have-dep-addr {
    height: 100px;
    width: 95%;
    border: 1px solid #d1fcd1;
    margin: 0px auto;
    border-radius:10px;
    background-color: #7a9e7a;
    color: #d1fcd1;
  }
</style>