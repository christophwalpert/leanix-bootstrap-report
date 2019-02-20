import Vue from 'vue'
import App from './App.vue'
import '@leanix/reporting'
import Excel from '../node_modules/exceljs'

/* global lx */
Vue.prototype.$lx = lx
Object.defineProperty(Vue.prototype, '$excel', { value: Excel})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
