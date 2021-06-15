<template>
  <div>
    <div id="title">
      <Title :label="titleLabel"/>
    </div>
    <div id="container">
      <!--<dashboard/>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/Title/title'
  export default {
    name: 'main',
    components: { Title },
    data () {
      return {
        titleLabel: ''
      }
    },
    methods: {
      setFilePath (path) {
        console.log('path')
        if (path) {
          this.titleLabel = path
        } else {
          this.titleLabel = '空白文档'
        }
      }
    }
  }
</script>

<style scoped>

</style>