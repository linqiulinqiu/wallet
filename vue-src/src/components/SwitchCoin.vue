<template>
        <el-col class="changecoin" hidden>
          <el-button @click="switchxch">Chia</el-button>
          <el-button @click="switchxcc">Chives</el-button>
        </el-col>
</template>
<script>
import wops from '../wallet'
export default ({
    methods: {
        switchxch: function (){
            wops.connect('XCH', this.$store.commit)
        },
        switchxcc: function (){
            wops.connect('XCC', this.$store.commit)
        }
    }
})
</script>
