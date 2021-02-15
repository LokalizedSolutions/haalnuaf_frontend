import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');

// Vue use
Vue.use(Vuex)

// New store
const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || '',
        id: localStorage.getItem('id') || '',
        cart: cart ? JSON.parse(cart) : [],
        cartCount: cartCount ? parseInt(cartCount) : 0,
    },
    mutations: {
        setToken(state, token) {
            state.token = localStorage.setItem('token', token);
        },
        setUsername(state, username) {
            state.username = localStorage.setItem('username', username);
        },
        setId(state, id) {
            state.id = localStorage.setItem('id', id);
        },
        logout(state) {
            state.token = '';
            state.username = '';
            state.id = '';
        },
        addToCart(state, item) {
            let found = state.cart.find(x => x.name == item.name);

            if (found) {
                found.amount ++;
                found.totalPrice = found.amount * found.price;
            } else {
                state.cart.push(item);

                Vue.set(item, 'amount', 1);
                Vue.set(item, 'totalPrice', item.price);
            }
            state.cartCount++;
            this.commit('saveCart');
        },
        removeFromCart(state, ind) {
            state.cart.splice(ind, 1);
            this.commit('saveCart');
        },
        saveCart(state) {
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('cartCount', state.cartCount);
        }
    },
    actions: {
        logout({commit}){
            /* eslint-disable no-unused-vars */
            return new Promise((resolve, reject) => {
              commit('logout')
              localStorage.removeItem('token')
              localStorage.removeItem('username')
              localStorage.removeItem('id')
              localStorage.removeItem('products')
              delete axios.defaults.headers.common['Authorization']
              resolve()
            })
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token; 
        }
    }
}); 

export default store