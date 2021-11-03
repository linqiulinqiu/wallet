<template>
  <el-row type="flex" justify="center">
    <el-col :lg="3" :xs="3" class="contact-us">
      <a href="http://discord.gg/xHC9fBfeVW" target="_blank"> </a>
      <!-- <a href="">
        <svg width="35" height="35" viewBox="0 0 30 35">
          <path
            fill-rule="evenodd"
            fill="currentColor"
            d="M21.3766 4.10479C22.4093 4.38257 23.2225 5.20102 23.4985 6.24038C24 8.12411 24 12.0545 24 12.0545C24 12.0545 24 15.9848 23.4985 17.8688C23.2225 18.908 22.4093 19.7265 21.3766 20.0044C19.505 20.5091 12 20.5091 12 20.5091C12 20.5091 4.49496 20.5091 2.62336 20.0044C1.59082 19.7265 0.777545 18.908 0.501545 17.8688C0 15.9848 0 12.0545 0 12.0545C0 12.0545 0 8.12411 0.501545 6.24038C0.777545 5.20102 1.59082 4.38257 2.62336 4.10479C4.49496 3.59998 12 3.59998 12 3.59998C12 3.59998 19.505 3.59998 21.3766 4.10479ZM15.8182 12.0546L9.54551 15.623V8.48596L15.8182 12.0546Z"
          ></path>
        </svg>
      </a> -->
      <!-- <a href="">
        <svg width="30" height="35" vewBox="0 0 30 35">
          <path
            fill="currentColor"
            d="M8.2177 20.2976C15.798 20.2976 19.9327 14.0329 19.9327 8.58261V8.05011C20.7362 7.46091 21.435 6.74089 22 5.92012C21.2567 6.26235 20.4637 6.48437 19.6507 6.57791C20.5139 6.06164 21.1597 5.24885 21.4675 4.2913C20.6598 4.76183 19.7822 5.10021 18.8677 5.29365C17.3053 3.64491 14.7069 3.56109 13.0415 5.10571C11.9701 6.10222 11.5157 7.59694 11.8512 9.02114C8.54594 8.85772 5.46574 7.29769 3.37823 4.72983C2.28095 6.60789 2.84519 9.01622 4.66249 10.2114C4.00661 10.1858 3.36464 10.0146 2.78309 9.71026V9.7729C2.78257 11.7293 4.15628 13.417 6.07204 13.8136C5.46884 13.9751 4.83671 13.9965 4.22396 13.8763C4.76475 15.5538 6.31437 16.7003 8.07674 16.7267C6.62377 17.8749 4.82287 18.4936 2.97103 18.4808C2.65779 18.4808 2.31323 18.4495 2 18.4182C3.84433 19.6513 6.0148 20.3057 8.23336 20.2976"
          ></path>
        </svg>
    </a> -->
    </el-col>
    <el-col :lg="6" :xs="10" class="link-lp" :offset="5">
      <p>
        {{ $t("links") }}
        <a @click="openPancakeLp">{{ $t("xc-lp", { coin: this.coin }) }}</a>
      </p>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "links",
  computed: mapState({
    baddr: "baddr",
    coin: "coin",
  }),
  data() {
    return {
      //   url: "url",
    };
  },
  methods: {
    openPancakeLp: function () {
      console.log(this.contract_addr);
      const pancake_prefix = "https://pancake.kiemtienonline360.com/#/add/BNB/";
      const url = pancake_prefix;
      if (!this.baddr) {
        this.$message("please choose coin first");
      } else {
        window.open(url);
      }
      // const contract_addr = wrop.$store.commit(bsc.contract_addr);
    },
  },
};
</script>
<style>
.contact-us {
  float: left;
  width: 250px;
  height: 50px;
  margin-top: 15px;
}
.contact-us a {
  display: block;
  width: 45px;
  height: 45px;
  border-radius: 20px;
  float: left;
  margin-right: 10px;
  text-align: center;
}
.contact-us a:first-child {
  background: url(../assets/images/discordlogo.png) no-repeat center;
  background-size: 60%;
}
.contact-us a:first-child:hover {
  background: url(../assets/images/discordlogo.png) no-repeat center;
  background-size: 80%;
}
</style>