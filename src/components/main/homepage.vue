<template>
  <div class="homepage">
    <navbar/>
    <hero title="Haalnuaf" description="Haalnuaf.nl is het platform waarmee U als winkeleigenaar de lockdown doorkomt, wij bieden een compleet webshop systeem aan waar U gemakkelijk uw product in invoert en waarmee u de klant de mogelijkheid geeft om ze te bestellen."/>
  </div>
</template>

<script>
import navbar from './navbar.vue'
import hero from './hero.vue'

export default {
  name: 'homepage',
  components: {
    navbar,
    hero
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* empty */
</style>
