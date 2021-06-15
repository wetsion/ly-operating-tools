<template>
  <div>
    <h1>广告数据分析</h1>
    <p><el-button @click="back">返回</el-button></p>
    <p>
      <input type="file" ref="pathClear"
             id="implUserExcel" @change="implUserExcel" accept=".xlsx"/>
    </p>
    <div ref="commercialChart" style="width: 100%;height: 300px" v-loading="loading"></div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'

  let Echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')

  export default {
    name: 'commercial',
    data () {
      return {
        loading: false
      }
    },
    mounted () {
      this.drawCommercialChart()
    },
    methods: {
      back () {
        this.$router.push('/dashboard')
      },
      drawCommercialChart () {
        let myChart = Echarts.init(this.$refs.commercialChart)
        myChart.setOption({
          title: {
            text: '广告数据'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: [ "衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子" ]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
      implUserExcel (e) {
        // let loading = this.openLoading()
        console.log('excel')
        let fileName = e.target.files[0]
        console.log(fileName)
        if (!fileName) {
          // this.closeLoading(loading)
          this.closeLoading()
          return
        }
        let reader = new FileReader()
        reader.readAsBinaryString(fileName)
        //onload在文件被读取时自动触发
        reader.onload = (e) => {
          this.openLoading()
          let uploadData = [];
          //workbook存放excel的所有基本信息
          const workbook = XLSX.read(e.target.result, {type: 'binary'})
          let sheetList = workbook.SheetNames
          console.log(sheetList)
          sheetList.forEach((name) => {
            let worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
            // for (let key in worksheet) {
            //     // v是读取单元格的原始值
            //     console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
            // }
            // uploadData.push(JSON.stringify(worksheet));
            uploadData.push(XLSX.utils.sheet_to_json(worksheet));
          })
          console.log(uploadData)
        }
        reader.onloadend = () => {
          this.closeLoading()
        }
      },
      openLoading () {
        console.log('open loading')
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        // return loading
        this.loading = true
      },
      closeLoading () {
        console.log('close loading')
        // loading.close();
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>