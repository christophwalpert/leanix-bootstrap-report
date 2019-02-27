<template>
  <div id="app">
    <!-- <FactSheetTypes></FactSheetTypes>  -->
    <button @click="exportToExcel">Export</button>
    <ReportTable></ReportTable>
    
    
  </div>
</template>

<script>
// import FactSheetTypes from './components/FactSheetTypes.vue'
import ReportTable from './components/ReportTable.vue'
import Excel from 'exceljs/dist/es5/exceljs.browser'

export default {
  name: 'app',
  components: {
    // FactSheetTypes,
    ReportTable
  },
  methods: {
    exportToExcel () {
      const workbook = new Excel.Workbook()
      const worksheet = workbook.addWorksheet('My Sheet')

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'Birthdate', key: 'birthdate', width: 10 }
      ]

      const rows = [
        { id: 1, name: 'Paulo', birthdate: new Date() },
        { id: 2, name: 'John', birthdate: new Date() }
      ]

      worksheet.addRows(rows)

      workbook.xlsx.writeBuffer({ base64: true })
        .then(xls64 => {
          // build anchor tag and attach file (works in chrome)
          const a = document.createElement('a')
          const data = new Blob([xls64], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

          const url = URL.createObjectURL(data)
          a.href = url
          a.download = 'export.xlsx'
          document.body.appendChild(a)
          a.click()
          setTimeout(() => {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        }, 0)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  },
  created () {
    this.$lx.init()
      .then(() => {
        const config = {}
        this.$lx.ready(config)
      })
    }
    
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  margin-left: 50px;
}
</style>
