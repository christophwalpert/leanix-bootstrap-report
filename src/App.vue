<template>
  <div id="app">
    <!-- <FactSheetTypes></FactSheetTypes>  -->
    <ReportTable></ReportTable>
    
  </div>
</template>

<script>
// import FactSheetTypes from './components/FactSheetTypes.vue'
import ReportTable from './components/ReportTable.vue'

export default {
  name: 'app',
  components: {
    // FactSheetTypes,
    ReportTable
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
