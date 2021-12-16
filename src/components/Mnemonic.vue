<template>
  <el-row>
    <el-col id="m-words">
      <el-button @click="dialogFormVisible = true">
        To Validate Mnemonic
      </el-button>
      <el-dialog title="Validate Mnemonic" :visible.sync="dialogFormVisible">
        Mnemonic:
        <el-input type="textarea" v-model="mnemonic"></el-input>
        <p>{{ mnemonic }}</p>

        <el-button type="primary" @click="createWords">Generate</el-button>
        <el-button type="primary" @click="onSubmit">Save</el-button>
        <el-button type="primary" @click="clearwords">clearwords</el-button>
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
        console.log("set", newMnemonic);
        return newMnemonic;
      },
    },
  },

  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    onSubmit: async function () {
      const words = this.mnemonic;
      this.$store.commit("setMnemonic", words);
      this.dialogFormVisible = false;
    },
    createWords: function () {
      const mn = wkeys.create_mnemonic();
      this.$store.commit("setMnemonic", mn);
      console.log(mn);
      return mn;
    },
    clearwords: function () {
      this.dialogFormVisible = true;
      this.mnemonic = "";
      console.log("44", this.mnemonic);
      this.$store.commit("setMnemonic", this.mnemonic);
    },
  },
};
</script>
