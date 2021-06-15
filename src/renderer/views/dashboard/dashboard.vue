<template>
  <div>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8"><el-button type="primary" @click="weekChart">周销售额折线图</el-button></el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8"><el-button type="primary" @click="contrastChart">上周本周同期对比</el-button></el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8"><el-button type="primary" @click="commercialChart">广告数据</el-button></el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    methods: {
      /**
       * 周销售额折线图
       */
      weekChart () {
        this.$router.push('/week')
      },
      contrastChart () {
        this.$router.push('/contrast')
      },
      commercialChart () {
        this.$router.push('/commercial')
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
       margin-bottom: 0;
     }
  }
  .el-col {
    border-radius: 4px;
  }
</style>