<template>
    <el-container>
        <el-header>
            <el-row type="flex" align="center" justify="center">
                <el-col :span="12">
                    <div>Deposit</div>
                </el-col>
                <el-col :span="12">
                    <div>Withdrow</div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <div>
                <p>addr</p>
                <el-input type='text' placeholder="please enter the amount." suffix-icon="el-icon-edit"></el-input>
                <p>You'will receive <span>xx</span> </p>
                <el-button>Withdraw</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                input: ''
            }
        }
    }
</script>