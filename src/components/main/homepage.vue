<template>
  <div class="homepage">
    <navbar/>
    <hero title="Haalnuaf" description="Haalnuaf.nl is het platform waarmee U als winkeleigenaar de lockdown doorkomt, wij bieden een compleet webshop systeem aan waar U gemakkelijk uw product in invoert en waarmee u de klant de mogelijkheid geeft om ze te bestellen."/>
    <about/>
    <donate/>
    <contact/>
    <foot/>
  </div>
</template>

<script>
import navbar from './navbar.vue'
import hero from './hero.vue'
import foot from './footer.vue'
import about from './about.vue'
import donate from './donate.vue'
import contact from './contact.vue'

export default {
  name: 'homepage',
  components: {
    navbar,
    hero,
    about,
    donate,
    contact,
    foot
  }
}
</script>
