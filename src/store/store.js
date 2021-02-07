import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

// Vue use
Vue.use(Vuex)

// New store
const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || '',
        id: localStorage.getItem('id') || ''
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