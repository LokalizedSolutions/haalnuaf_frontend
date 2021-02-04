import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Routing
import dashboard from './components/dashboard/dashboard.vue';
import homepage from './components/main/homepage.vue';
import error from './components/error.vue';

const routes = [
  { path: '/', component: homepage },
  { path: '/dashboard', component: dashboard },
  { path: '*', name: '404', component: error }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
  
export default router