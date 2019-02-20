<template>
  <hot-table :settings="hotSettings" />
  
</template>

<script>
import { HotTable } from '@handsontable/vue'

export default {
  name: 'ReportTable',
  components: { 
    HotTable
   },
  data () {
    return {
      hotSettings: {
        data: [],
        columns: [
					{ data: 'applicationName', type: 'text', editor: false },
					{ data: 'kioId', type: 'text', editor: false },
          { data: 'ownerName', type: 'text', editor: false },
          { data: 'sapId', type: 'text', editor: false }      
        ],
        colHeaders: ['App Name', 'App KIOid', 'Owner Name', 'Owner SAP ID'],
        colWidths: [300, 300, 300, 120],
        rowHeaders: false,
        strechH: 'all',
				disableVisualSelection: true,
				columnSorting: true
      }
    }
  },
  methods: {
    fetchApplicationData () {
      return new Promise((resolve, reject) => {
          const query = `{
                          allFactSheets(factSheetType: Application) {
                            edges {
                              node {
                                ... on Application {
                                  name
                                  kioId {
                                    externalId
                                  }
                                  relApplicationToOwner {
                                    edges {
                                      node {
                                        factSheet {
                                          name
                                          ... on UserGroup {
                                            externalId {
                                              externalId
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }`
          this.$lx.showSpinner()
          this.$lx.executeGraphQL(query)
            .then(res => {
              this.$lx.hideSpinner()
							let factSheets = res.allFactSheets.edges
								.map(edge => edge.node)
								.map(obj => {
									let temp = { applicationName: obj.name, kioId: null, ownerName: null, sapId: null}
									if (obj.kioId != null) {
										temp.kioId = obj.kioId.externalId
									}
									if (obj.relApplicationToOwner.edges[0] != null) {
										temp.ownerName = obj.relApplicationToOwner.edges[0].node.factSheet.name
                  }
                  if (obj.relApplicationToOwner.edges[0] != null) {
                    temp.sapId = obj.relApplicationToOwner.edges[0].node.factSheet.externalId.externalId
                  }
									return temp
								})
							resolve(factSheets)
						}, {})
						.catch(err => {
							this.$lx.hideSpinner()
							reject(err)
						})
      })
    },
    exportToExcel() {
      let workbook = new $excel.Workbook()
      let sheet = workbook.addWorkSheet

    }
  },
  computed: {
    recipients () {
      return this.application && Array.isArray(this.application.recipients) ? this.application.recipients : []
    }
  },
  created () {
		this.fetchApplicationData()
			.then(factSheets => { this.hotSettings.data = factSheets })
			// eslint-disable-next-line 
			.catch(err => { console.error(err) })
	}
}
</script>

<style scoped>
@import '~handsontable/dist/handsontable.full.css';
</style>
