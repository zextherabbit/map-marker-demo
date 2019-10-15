import Vue from 'vue'
import App from './App.vue'
import store from './state-management/store'

Vue.config.productionTip = process.env.production;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
