<template>
  <b-navbar wrapper-class="container" spaced shadow fixed-top>
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path : '/dashboard'}">
              <img
                  class="image is-32x32" src="https://cdn.lokalized.nl/haalnuaf-images/logo"
              >
           </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ name: 'overviewProduct' }">
          Producten
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'overviewOrders' }">
          Bestellingen
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'dashboard_store' }">
          Uw winkel
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/s/' + username }">
          Ga naar uw webshop
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-dropdown :label="username" right>
                <b-navbar-item tag="router-link" :to="{ name: 'dashboard_settings' }">
                    Instellingen
                </b-navbar-item>
                <b-navbar-item @click="logout">
                    Uitloggen
                </b-navbar-item>
            </b-navbar-dropdown>
      </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'dashboardnav',
  data() {
    return {
      username: localStorage.getItem('username') || ''
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>