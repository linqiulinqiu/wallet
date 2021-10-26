<template>
    <div class="WithdrawBurn">
        <p>{{ xaddr }}</p>
        <el-input v-model="amount" type='text' :placeholder="$t('amount')" suffix-icon="el-icon-edit"></el-input>
        <p>{{$t('receive-money')}} <span></span> </p>
        <el-button>{{$t('withdraw')}}</el-button>
    </div>  
</template>

<script>
import { mapState } from 'vuex'

    export default {
        name:'WithdrawBurn',
        computed: mapState({
        baddr: "baddr",
        coin: "coin"
    }),
        data() {
            return {
                amount:""
            }
        }
    }
</script>