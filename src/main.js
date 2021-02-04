import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'

// Vue initialization 
Vue.use(Buefy)
Vue.config.productionTip = false

import router from './routes'

// Mount app component to vue
new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
