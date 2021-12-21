<template>
  <el-col>
    <el-button v-if="!xaddr" type="primary" @click="connect"
      >Connect Wallet</el-button
    >
    <p v-if="xaddr">
        <el-button @click="encode">Encode</el-button>
        <el-button @click="decode">Decode</el-button>
        <span>{{ xaddr }}</span>
    </p>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
import wops from '../wallet';
import {
    mnemonicToEntropy,
    entropyToMnemonic,
} from 'bip39'
export default {
  computed: mapState({
    xaddr: "xaddr",
  }),
  data() {
    return {
      secret: ""
    };
  },
  methods: {
    connect: function () {
      wops.connect(this.$store.commit)
    },
    encode: async function () {
      const mn = this.$store.state.mnemonic
      console.log('mnemonic from', mn)
      const enc = await wops.enc_data(mnemonicToEntropy(mn))
      console.log('encoded mnemonic', enc)
      this.secret = enc
    },
    decode: async function () {
      const en = this.secret
      console.log('encoded =', en)
      const dec = entropyToMnemonic(await wops.dec_data(en))
      console.log('decoded mnemonic', dec)
    }
  },
};

</script>
