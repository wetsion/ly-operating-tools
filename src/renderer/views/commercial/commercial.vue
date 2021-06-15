<template>
  <div>
    <h2>广告数据分析</h2>
    <p><input type="file" ref="pathClear"
             id="implUserExcel" @change="implUserExcel" accept=".xlsx"/>
        <el-button @click="back">返回</el-button></p>
    <p>
      
    </p>
    <div ref="commercialChart" style="width: 100%;height: 600px"></div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import moment from 'moment'
  import {GridComponent} from 'echarts/components'
  let Echarts = require('echarts/lib/echarts')
  Echarts.use([GridComponent])
  require('echarts/lib/chart/bar')

  export default {
    name: 'commercial',
    data () {
      return {
        loading: false,
        dateXAxis: [ "衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子" ],
        chartData: [5, 20, 36, 10, 10, 20],
        chartSeries: []
      }
    },
    mounted () {
      this.drawCommercialChart(this.dateXAxis, this.chartSeries)
    },
    methods: {
      back () {
        this.$router.push('/dashboard')
      },
      drawCommercialChart (xAxisData, seriesData) {
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        let myChart = Echarts.init(this.$refs.commercialChart)
        myChart.setOption({
          title: {
            text: '广告数据'
          },
          width: 600,
          height: 500,
          tooltip: {},
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 30
            },
            data: xAxisData
          },
          yAxis: [
            {
              type: 'value',
              name: '曝光量',
              // min: 0,
              // max: 20000,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '点击率',
              // min: 0,
              // max: 100,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value} %'
              }
            },
            {
              type: 'value',
              name: '花费',
              position: 'right',
              offset: 40,
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '销售额',
              position: 'right',
              offset: 80,
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'ACOS',
              // min: 0,
              // max: 100,
              position: 'right',
              offset: 120,
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: seriesData
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
          const workbook = XLSX.read(e.target.result, {type: 'binary', cellDates: true})
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
          
          this.drawCommercialChart(this.buildXAxiasData(uploadData), this.buildSeriesData(uploadData))
        }
        reader.onloadend = () => {
          this.closeLoading()
        }
      },
      buildXAxiasData (uploadData) {
        if (!uploadData) {
          return
        }
        let sheet1List = uploadData[0]
        let dateArray = []
        for (var i = 0; i < sheet1List.length; i++) {
          let row = sheet1List[i]
          let date = row['日期']
          console.log(moment(date).format('YYYY-MM-DD'))
          dateArray.push(moment(date).format('YYYY-MM-DD'))
        }
        console.log(dateArray)
        return dateArray
      },
      buildSeriesData (uploadData) {
        if (!uploadData) {
          return
        }
        let sheet1List = uploadData[0]
        let baoguangliang = []
        let ctr = []
        let cost = []
        let sells = []
        let acos = []
        for (var i = 0; i < sheet1List.length; i++) {
          let row = sheet1List[i]
          baoguangliang.push(row['曝光量'])
          ctr.push(Number.parseFloat(row['点击率 (CTR)']) * 100)
          cost.push(row['花费(USD)'])
          sells.push(row['销售额(USD)'])
          acos.push(row['ACOS'])
        }
        let labelOption = {
            show: true,
            position: 'insideBottom',
            distance: 15,
            align: 'left',
            verticalAlign: 'middle',
            rotate: 90,
            formatter: '{c}  {name|{a}}',
            fontSize: 6,
            rich: {
                name: {
                    textBorderColor: '#fff'
                }
            }
        };
        let sd = [
          {
            name: '曝光量',
            type: 'bar',
            barGap: 0,
            // label: labelOption,
            data: baoguangliang
          },
          {
            name: '点击率',
            type: 'bar',
            // label: labelOption,
            yAxisIndex: 1,
            data: ctr
          },
          {
            name: '花费',
            type: 'bar',
            // label: labelOption,
            yAxisIndex: 2,
            data: cost
          },
          {
            name: '销售额',
            type: 'bar',
            // label: labelOption,
            yAxisIndex: 3,
            data: sells
          },
          {
            name: 'ACOS',
            type: 'bar',
            // label: labelOption,
            yAxisIndex: 4,
            data: acos
          }
        ]
        return sd
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