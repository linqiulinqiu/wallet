<template>
    <div>
    <p>addr</p>
    <el-input type='text' placeholder="please enter the amount." suffix-icon="el-icon-edit"></el-input>
    <p>{{$t('receive-money')}} <span>xx</span> </p>
    <el-button>{{$t('withdraw')}}</el-button>
    </div>  
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>