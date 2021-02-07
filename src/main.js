import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import axios from 'axios'
import VeeValidate from 'vee-validate'

// Vue initialization 
Vue.use(Buefy)
Vue.use(VeeValidate)
Vue.config.productionTip = false

// Router
import router from './routes'

// Store
import store from './store/store.js'

// Axios
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = token
// Axios interceptor (If JWT is expired)
axios.interceptors.response.use(undefined, function (err) {
  // eslint-disable-next-line no-unused-vars
  return new Promise(function (resolve, reject) {
    if (err.response.data.status === 499 && err.config && !err.config.__isRetryRequest) {
      store.dispatch('logout')
      .then(() => {
        router.push('/login')
      });
    }
    throw err;
  });
});

Vue.prototype.$http = axios

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
  store,
  render: h => h(App),
}).$mount('#app')
