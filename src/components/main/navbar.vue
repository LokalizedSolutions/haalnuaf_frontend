<template>
  <b-navbar wrapper-class="container" spaced shadow fixed-top>
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path : '/'}">
              <img
                  class="image is-32x32" src="https://cdn.lokalized.nl/haalnuaf-images/logo"
              >
           </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item href="#about">
          Over ons
        </b-navbar-item>
        <b-navbar-item href="#donate">
          Doneren
        </b-navbar-item>
        <b-navbar-item href="#contact">
          Contact
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button tag="router-link" :to="{ name: 'signup'}" class="button is-primary">
              <strong>Maak uw webshop</strong>
            </b-button>
            <b-button tag="router-link" :to="{ name: 'login' }" class="button is-white">
              Inloggen
            </b-button>
          </div>
        </b-navbar-item>
      </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar'
}
</script>