import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Routing
import homepage from './components/main/homepage.vue';
import error from './components/error.vue';
// Routing AUTH
import login from './components/login.vue';
import passwordforget from './components/passwordforget.vue';
import signup from './components/signup.vue';
// Dashboard
import dashboard from './components/dashboard/dashboard.vue';
import products from './components/dashboard/products.vue';
import orders from './components/dashboard/orders.vue';
import settings from './components/dashboard/settings.vue';
import store from './components/dashboard/store.vue';

const routes = [
  // MAIN routes
  { 
    path: '/',
    name: 'home', 
    component: homepage
  },
  // DASHBOARD routes
  { 
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  { 
    path: '/dashboard_settings',
    name: 'dashboard_settings',
    component: settings
  },
  {
    path: '/dashboard_orders',
    name: 'dashboard_orders',
    component: orders
  },
  { 
    path: '/dashboard_products',
    name: 'dashboard_products',
    component: products
  },
  { 
    path: '/dashboard_store',
    name: 'dashboard_store',
    component: store
  },
  // AUTH routes
  { 
    path: '/login', 
    name: 'login',
    component: login 
  },
  { 
    path: '/registreren',
    name: 'signup',
    component: signup 
  },
  { 
    path: '/wachtwoord_vergeten', 
    name: 'forgot_password',
    component: passwordforget 
  },
  // 404 generation for each none declared route
  { 
    path: '*', 
    name: '404', 
    component: error 
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
  
export default router