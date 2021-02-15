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
import reset from './components/reset.vue';
// Dashboard
import dashboard from './components/dashboard/dashboard.vue';
import products from './components/dashboard/products.vue';
import producten from './components/dashboard/products/products.vue';
import editProduct from './components/dashboard/products/editProduct.vue';
import createProduct from './components/dashboard/products/createProduct.vue';
import showOrder from './components/dashboard/orders/showOrder.vue';
import orders from './components/dashboard/orders.vue';
import allOrders from './components/dashboard/orders/allOrders.vue';
/*import editOrder from './components/dashboard/orders/editOrder.vue';*/
import createOrder from './components/dashboard/orders/createOrder.vue';
import settings from './components/dashboard/settings.vue';
import stores from './components/dashboard/store.vue';
// Storefront
import storefront from './components/storefront/store.vue';
import cart from './components/storefront/cart.vue'
// Algemene voorwaarden & privacy verklaring
import algemenevoorwaarden from './components/algemenevoorwaarden.vue';
import privacyverklaring from './components/privacyverklaring.vue';
// success
import success from './components/storefront/success.vue';

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
    children: [
      {
        path: 'overview',
        name: 'overviewOrders',
        component: allOrders
      },
      /*{
        path: 'edit/:id',
        name: 'editOrder',
        component: editOrder
      },*/
      { 
        path: 'create',
        name: 'createOrder',
        component: createOrder
      },
      {
        path: 'show/:id',
        name: 'showOrder',
        component: showOrder
      },
    ],
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/dashboard/products',
    name: 'dashboard_products',
    component: products,
    children: [
      {
        path: 'overview',
        name: 'overviewProduct',
        component: producten
      },
      {
        path: 'edit/:id',
        name: 'editProduct',
        component: editProduct
      },
      { 
        path: 'create',
        name: 'createProduct',
        component: createProduct
      }
    ],
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
    path: '/signup',
    name: 'signup',
    component: signup,
    meta: {
      requiresGuest: true
    } 
  },
  { 
    path: '/forgot_password', 
    name: 'forgot_password',
    component: passwordforget,
    meta: {
      requiresGuest: true
    } 
  },
  {
    path: '/reset/:id',
    name: 'reset',
    component: reset,
    meta: {
      requiresGuest: true
    }
  },
  // Store
  {
    path: '/s/:id',
    name: 'storefront',
    component: storefront
  },
  {
    path: '/s/:id/cart',
    name: 'cart',
    component: cart
  },
  // Algemene voorwaarden
  {
    path: '/algemenevoorwaarden',
    component: algemenevoorwaarden
  },
  // Privacy verklaring
  {
    path: '/privacyverklaring',
    component: privacyverklaring
  },
  // Success
  {
    path: '/success',
    component: success,
    name: 'success'
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

  if (isAuth && !loggedIn) {
    next({ name: "login" });
  } else if (isGuest && loggedIn) {
    next({ name: "dashboard" });
  } else {
    next();
  }

})
  
export default router