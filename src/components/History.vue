<template>
  <el-col>
    <!-- <el-carousel trigger="click" height="350px" :autoplay="false">
      <el-carousel-item v-for="(item, index) in history" :key="index">
        <el-col id="banner">
          <p>address:{{ addrInfo }}</p>
          <p>balance:{{ addrInfo }}</p>
          <p>update at:{{ item.time }}</p>
        </el-col>
      </el-carousel-item>
    </el-carousel> -->
    <div>
      <el-button @click="getadd">Get Addr</el-button>
      <div v-if="aaa" class="ss">
        <div v-for="item in addrInfo" :key="item.address">
          {{ item.address }}
        </div>
      </div>
    </div>
  </el-col>
</template>
<script>
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
    var history = [];
    for (var i = 0; i <= 9; i++) {
      var item = {};
      item.address = "address" + i;
      item.balance = "balance" + i;
      item.time = "time" + i;
      history.push(item);
    }
    return {
      history: history,
      aaa: false,
    };
  },
  methods: {
    getadd: async function () {
      this.aaa = true;

      const bb = await hisAddr.getAdds();
      console.log("generate addr", bb);
      this.$store.commit("setAddrInfo", bb);
      console.log(1111);
    },
  },
};
</script>