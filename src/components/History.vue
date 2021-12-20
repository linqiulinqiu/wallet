<template>
  <el-col v-if="this.$store.state.addrVisible">
    <div>
      <el-button @click="get_addr">Get Addr</el-button>
      <div v-if="aaa">
        <el-carousel trigger="click" height="350px" :autoplay="false">
          <el-carousel-item v-for="(item, index) in addrInfo" :key="index">
            <el-col id="banner">
              <p>address:{{ item.address }}</p>
              <p>balance:{{ item.balance }}</p>
              <!-- <p>update at:{{ item.time }}</p> -->
            </el-col>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </el-col>
</template>
<script>
import wkeys from "../wkeys";
import hisAddr from "../assets/hisAddr.js";
export default {
  computed: {
    addrInfo: {
      get() {
        console.log("000");
        return this.$store.state.addrInfo;
      },
      set(info) {
        console.log("222");
        info = hisAddr.getAdds();
        this.$store.commit("setAddrInfo", info);
      },
    },
  },
  data() {
    return {
      aaa: false,
    };
  },
  methods: {
    get_addr: async function () {
      this.aaa = true;
      const bb = await hisAddr.getAdds();
      this.$store.commit("setAddrInfo", bb);
    },
  },
};
</script>
