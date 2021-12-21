<template>
  <el-row>
    <el-col id="m-words">
      <el-button @click="popDialog"> The Mnemonic </el-button>
      <el-dialog
        font-size="large"
        title="Mnemonic"
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
      >
        <el-button
          id="generate"
          size="small"
          type="primary"
          @click="createWords"
          >Generate</el-button
        >
        <span v-if="dirty">*</span>
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          clearable
          type="textarea"
          v-model="mwords"
          placeholder="Input Mnemonic"
        ></el-input>
        <div id="save-clear">
          <el-button type="primary" @click="onSubmit">Save</el-button>
          <el-button type="primary" @click="clearwords">clear</el-button>
        </div>
        <div>点击空白部分退出</div>
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
  computed: {
      dirty: function () {
          if (this.mwords == this.$store.state.mnemonic) return false;
          return true;
      }
  },
  methods: {
    popDialog: function () {
      this.mwords = this.$store.state.mnemonic;
      this.dialogFormVisible = true;
    },
    handleClose(done) {
        if(this.dirty){
          this.$confirm("确认退出？")
            .then((_) => {
              done();
            })
            .catch((_) => {});
        }else{
            done()
        }
    },
    createWords: function () {
      const mn = wkeys.create_mnemonic();
      this.mwords = mn;
    },

    onSubmit: async function () {
      const mn = this.mwords.trim().split(" ");
      if (mn.length > 24) return false;
      for (let i in mn) {
        mn[i] = mn[i].trim();
        if (mn[i].length < 1) {
          return false;
        }
      }
      this.mwords = mn.join(" ");
      this.$store.commit("setMnemonic", this.mwords);
    },

    clearwords: function () {
      this.mwords = "";
    },
  },
};
</script>
