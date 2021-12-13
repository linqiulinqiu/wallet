<template>
  <el-row id="send" class="aa">
    <el-col>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="To">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="Fee">
          <el-input v-model="form.fee"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: mapState({}),
  data() {
    return {
      form: {
        address: "",
        fee: "",
        amount: "",
      },
    };
  },
  methods: {
    onSubmit: function () {},
  },
};
</script>
<style>
</style>