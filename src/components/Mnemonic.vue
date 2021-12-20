<template>
  <el-row>
    <el-col id="m-words">
      <el-button @click="popDialog"> To Validate Mnemonic </el-button>
      <el-dialog
        font-size="large"
        title="Validate Mnemonic"
        :visible.sync="dialogFormVisible"
      >
        <el-button
          id="generate"
          size="small"
          type="primary"
          @click="createWords"
          >Generate</el-button
        >
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          clearable
          type="textarea"
          v-model="mwords"
          placeholder="Input Mnemonic"
        ></el-input>
        <div id="save-clear">
          <el-button type="primary" @click="onSubmit">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Save
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button
          >
          <el-button type="primary" @click="clearwords">clearwords</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import wkeys from "../wkeys";
export default {
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      mwords: "",
    };
  },
  methods: {
    popDialog: function () {
      this.mwords = this.$store.state.mnemonic;
      this.dialogFormVisible = true;
    },
    createWords: function () {
      const mn = wkeys.create_mnemonic();
      this.mwords = mn;
    },

    onSubmit: async function () {
      this.$store.commit("setMnemonic", this.mwords);
      this.$store.commit("setAddrVisible", true);
    },

    clearwords: function () {
      this.mwords = "";
    },
  },
};
</script>
