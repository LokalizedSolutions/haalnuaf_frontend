import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import axios from 'axios'
import VeeValidate from 'vee-validate'

// Vue initialization 
Vue.use(Buefy)
Vue.use(VeeValidate)
Vue.prototype.$http = axios
Vue.config.productionTip = false

// Router
import router from './routes'

// Api
import hash from './api'
Vue.prototype.$hash = hash

// Mixin
Vue.mixin({
  methods: {
    // Api mixin (makes the apiKey() function available to every component)
    apiKey: function() {
      this.date = Date.now(); 
      const crypto = require('crypto');
      var hash = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));
      return hash;
    }
  }
})

// Mount app component to vue
new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
