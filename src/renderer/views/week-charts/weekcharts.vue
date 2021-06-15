<template>
  <div>
    <h1>周销售额折线图</h1>
    <p><el-button @click="back">返回</el-button></p>
    <p>
      <el-button type="primary" @click="dialogVisible = true">选择文件</el-button>
      <el-dialog title="选择文件" :visible.sync="dialogVisible">
        <el-upload :file-list="uploadFiles" action="alert" :auto-upload="false" multiple :on-change="loadJsonFromFile">
          <el-button size="small" type="primary">Select a file</el-button>
          <div slot="tip">仅支持xlsx、xls文件</div>
        </el-upload>
        <span slot="footer">
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="loadJsonFromFileConfirmed">确认</el-button>
        </span>
      </el-dialog>
    </p>
    <p>
      <input type="file" ref="pathClear"
             id="implUserExcel" @change="implUserExcel" accept=".xlsx"/>
    </p>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: 'weekcharts',
    data () {
      return {
        // data for upload files
        uploadFilename: null,
        uploadFiles: [],
        dialogVisible: false
      }
    },
    methods: {
      back () {
        this.$router.push('/dashboard')
      },
      loadJsonFromFile (file, fileList) {
        this.uploadFilename = file.name
        this.uploadFiles = fileList
      },
      loadJsonFromFileConfirmed () {
        console.log(this.uploadFiles)
        if (this.uploadFiles) {
          for (let i = 0; i < this.uploadFiles.length; i++) {
            let file = this.uploadFiles[i]
            console.log(file.raw)
            if (!file) continue
            let reader = new FileReader()
            reader.onload = async (e) => {
              try {
                let document = JSON.parse(e.target.result)
                console.log(document)
              } catch (err) {
                console.log(`load JSON document from file error: ${err.message}`)
                this.showSnackbar(`Load JSON document from file error: ${err.message}`, 4000)
              }
            }
            reader.readAsText(file.raw)
          }
        }
        this.dialogVisible = false
      },
      implUserExcel (e) {
        console.log('excel')
        let fileName = e.target.files[0]
        console.log(fileName)
        let reader = new FileReader()
        reader.readAsBinaryString(fileName)
        //onload在文件被读取时自动触发
        reader.onload = function (e) {
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
      }
    }
  }
</script>

<style scoped>

</style>