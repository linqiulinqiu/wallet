<template>
    <div>
        <el-input v-model="input" placeholder="please import the address" suffix-icon="el-icon-edit"></el-input>
        <el-button>Bind address</el-button>
        <p>Binding,please wait.</p>
        <el-button>next</el-button>
    </div>
</template>

<script>

export default {
  
  data() {
    return {
      input: 'placeholder'
    }
  }
}
</script>