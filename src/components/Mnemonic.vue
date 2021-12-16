<template>
  <el-row>
    <el-col id="m-words">
      <el-button @click="dialogFormVisible = true">
        To Validate Mnemonic
      </el-button>
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
        <el-col id="words" :span="22" :offset="1">{{ words }}</el-col>

        <el-col id="mtitle">Input Mnemonic:</el-col>

        <el-input
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
// import { mapState } from "vuex";
export default {
  components: {},
  computed: {
    mnemonic: {
      get() {
        return this.$store.state.mnemonic;
      },
      set(newMnemonic) {
        this.$store.commit("setMnemonic", newMnemonic);
        return newMnemonic;
      },
    },
  },

  data() {
    return {
      dialogFormVisible: false,
      words: "",
      mwords: "",
    };
  },
  methods: {
    createWords: function () {
      const mn = wkeys.create_mnemonic();
      // this.$store.commit("setMnemonic", mn);
      this.words = mn;
      console.log(mn);
      return this.words;
    },

    onSubmit: async function () {
      this.$store.commit("setMnemonic", this.mwords);
      //   this.dialogFormVisible = false;
    },

    clearwords: function () {
      this.mwords = "";
      this.mnemonic = "";
      console.log("44", this.mnemonic);
      this.$store.commit("setMnemonic", this.mnemonic);
    },
  },
};
</script>
