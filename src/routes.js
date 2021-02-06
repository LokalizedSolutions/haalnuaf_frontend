import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store.js'

Vue.use(VueRouter)

// Routing
import dashboard from './components/dashboard/dashboard.vue';
import homepage from './components/main/homepage.vue';
import error from './components/error.vue';
// Routing AUTH
import login from './components/login.vue';
import passwordforget from './components/passwordforget.vue';
import signup from './components/signup.vue';

const routes = [
  // MAIN routes
  { 
    path: '/',
    name: 'home', 
    component: homepage,
  },
  { 
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
  
export default router