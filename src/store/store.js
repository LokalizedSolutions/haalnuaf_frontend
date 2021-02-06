import Vuex from 'vuex'
import Vue from 'vue'

// Vue use
Vue.use(Vuex)

// New store
const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        setToken(state, token) {
            state.token = localStorage.setItem('token', token); 
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token; 
        }
    }
}); 

export default store