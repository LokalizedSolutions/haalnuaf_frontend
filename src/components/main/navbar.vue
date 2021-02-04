<template>
  <b-navbar wrapper-class="container" spaced shadow="true" fixed-top>
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path : '/'}">
              <img
                  class="image is-32x32" src="https://cdn.ntaheij.dev/lokalized/logo_icon.png"
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
            <a class="button is-primary">
              <strong>Maak uw webshop</strong>
            </a>
            <a class="button is-white">
              Inloggen
            </a>
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