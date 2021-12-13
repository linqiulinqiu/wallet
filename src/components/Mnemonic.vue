<template>
  <el-row>
    <el-col id="mnemonic">
      <el-button @click="dialogFormVisible = true"
        >To Validate Mnemonic</el-button
      >
      <el-dialog title="Validate Mnemonic" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Mnemonic">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit, (dialogFormVisible = false)"
              >Validate</el-button
            >
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
    <el-col><ReceiveAddress /></el-col>
    <el-col><History /></el-col>
    <el-col><Send /></el-col>
    <el-col><test /></el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
import History from "./History.vue";
import Send from "./Send.vue";
import ReceiveAddress from "./ReceiveAddress.vue";
import test from "./test.vue";

export default {
  name: "Mnemonnic",
  components: {
    History,
    Send,
    ReceiveAddress,
    test,
  },
  computed: mapState({}),
  data() {
    return {
      dialogFormVisible: false,
      form: {
        type: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit: function () {},
  },
};
</script>
