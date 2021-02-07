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
import stores from './components/dashboard/store.vue';

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
    component: dashboard,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/dashboard/settings',
    name: 'dashboard_settings',
    component: settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/orders',
    name: 'dashboard_orders',
    component: orders,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/dashboard/products',
    name: 'dashboard_products',
    component: products,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/dashboard/store',
    name: 'dashboard_store',
    component: stores,
    meta: {
      requiresAuth: true
    }
  },
  // AUTH routes
  { 
    path: '/login', 
    name: 'login',
    component: login,
    meta: {
      requiresGuest: true
    } 
  },
  { 
    path: '/registreren',
    name: 'signup',
    component: signup,
    meta: {
      requiresGuest: true
    } 
  },
  { 
    path: '/wachtwoord_vergeten', 
    name: 'forgot_password',
    component: passwordforget,
    meta: {
      requiresGuest: true
    } 
  },
  // 404 generation for each none declared route
  { 
    path: '*', 
    name: '404', 
    component: error 
  }
]

// Handle unauthorized access
// Vuex store file import
/* eslint-disable no-unused-vars */
import store from './store/store.js'

// Declare router
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isLoggedIn; 
  const isAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isGuest = to.matched.some((record) => record.meta.requiresGuest);
  
  if(isAuth && !loggedIn) {
    next({ name: "login" });
  } else if(isGuest && loggedIn) {
    next({ name: "dashboard" });
  } else {
    next();
  }

})
  
export default router