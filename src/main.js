// eslint-disable-next-line
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueApexCharts from 'vue-apexcharts'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2);
Vue.use(VueApexCharts)
Vue.prototype.$eventBus = new Vue();

Vue.component('apexchart-component', VueApexCharts)

require('./icons')


new Vue({
  render: 
  h => h(App),
  store
}).$mount('#app')
