import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

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
        },
        logout(state) {
            state.token = ''
        }
    },
    actions: {
        logout({commit}){
            /* eslint-disable no-unused-vars */
            return new Promise((resolve, reject) => {
              commit('logout')
              localStorage.removeItem('token')
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