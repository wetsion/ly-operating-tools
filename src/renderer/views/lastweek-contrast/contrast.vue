<template>
  <div>
    <h1>上周本周同期对比</h1>
    <p><el-button @click="back">返回</el-button></p>
  </div>
</template>

<script>
  export default {
    name: 'contrast',
    methods: {
      back () {
        this.$router.push('/dashboard')
      }
    }
  }
</script>

<style scoped>

</style>