<template>
    <div class="WithdrawBurn">
        <div v-if="xwaddr">
            <p>When you burn P{{coin}}, your {{coin}} will be sent to {{ xwaddr }}</p>
            <el-input v-model="amount" type='text' :placeholder="$t('amount')" suffix-icon="el-icon-edit"></el-input>
            <p>{{$t('receive-money')}} <span></span> </p>
            <el-button>{{$t('withdraw')}}</el-button>
        </div>
    </div>  
</template>

<script>
import { mapState } from 'vuex'

    export default {
        name:'WithdrawBurn',
        computed: mapState({
        baddr: "baddr",
        xwaddr: "withdraw_addr",
        coin: "coin"
    }),
        data() {
            return {
                amount:""
            }
        }
    }
</script>
