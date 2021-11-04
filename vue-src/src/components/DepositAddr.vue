<template>
  <div class="deposit-addr" v-if="baddr">
    <div v-if="deposit_addr" class="have-dep-addr">
      <el-tooltip effect="light" placement="top">
        <button
          type="button"
          v-clipboard:copy="deposit_addr"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          {{ deposit_addr }}
        </button>
        <span size="small" slot="content">{{ $t("copy-dep-addr") }}</span>
      </el-tooltip>
    </div>
    <div v-else>
      <el-button
        v-if="free_xins > 0"
        @click.native.prevent="obtain_addr"
        :loading="loading"
        class="obtain"
        >{{ $t("obtain-deposit-address") }}</el-button
      >
      <p v-else-if="free_xins === 0">{{ $t("no-depositAddr") }}</p>
      <p v-else>
        <pulse-loader></pulse-loader>
        {{ typeof(free_xins)+" "+ $t("check-depositAddr") }}
      </p>
      <p v-if="free_xins > 0">{{ $t("bind-fee") }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import wops from "../wallet";

export default {
  name: "DepositAddr",
  computed: mapState({
    baddr: "baddr",
    deposit_addr: "deposit_addr",
    coin: "coin",
    free_xins: "free_xins",
  }),
  data: () => {
    return {
      loading: false,
    };
  },

  methods: {
    obtain_addr: async function () {
      this.disabled;
      const commit = this.$store.commit;
      this.loading = true;
      const msg = await wops.obtain_deposit_addr(function (xaddr) {
        commit("setDepositAddr", xaddr);
      });
      if (msg != "ok") {
        this.loading = false;
        this.$message(msg);
      }
    },
    onCopy: function () {
      this.$message({
        message: this.$t("copy-success"),
        type: "success",
      });
    },
    onError: function () {
      this.$message.error(this.$t("copy-falied"));
    },
  },
};
</script>
<style>
.add {
  width: 90%;
  height: 93px;
  text-align: center;
}
.add p {
  text-align: center;
  width: 100%;
  margin-left: 5%;
  margin-top: 30px;
}
.add .el-input {
  width: 70%;
}
.deposit-addr {
  width: 100%;
}
.deposit-addr .obtain {
  height: 50px;
  margin-top: 80px;
  border-radius: 15px;
}
.deposit-addr .el-button:hover {
  background-color: #668b66;
  color: #d1fcd1;
  border: #b1fcb1 1px solid;
}
.have-dep-addr {
  height: 100px;
  width: 95%;
  border: 1px solid #d1fcd1;
  margin: 0px auto;
  border-radius: 10px;
  background-color: #7a9e7a;
  color: #d1fcd1;
}
.have-dep-addr button {
  width: 95%;
  height: 40px;
  background-color: #668b66;
  color: #d1fcd1;
  border: none;
  margin-top: 30px;
  border-radius: 10px;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
}
</style>
