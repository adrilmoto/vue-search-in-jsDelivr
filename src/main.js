import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import baseTree from '@/components/base_tree.vue'

Vue.config.productionTip = false

// utils
Vue.prototype.$log = function (...args) {
  console.log(`[${this.$options.name}]`, ...args)
}
Vue.prototype.$wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// recursive component...
Vue.component('baseTree', baseTree)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
