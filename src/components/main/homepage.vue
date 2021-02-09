<template>
  <div class="homepage">
    <navbar/>
    <hero title="Haalnuaf" description="Haalnuaf.nl is het platform waarmee u als winkeleigenaar deze verschrikkelijke lockdown doorkomt. Wij bieden een compleet webshop systeem aan gericht op afhalen. In een paar simpele stappen heeft u uw eigen webshop in elkaar gezet. U voegt producten toe, en bent klaar voor uw lockdown-opening. Klanten kunnen de producten bestellen en zeggen wanneer ze deze willen afhalen. De klant en u ontvangen allebei een mailtje over de bestelling. Als de bestelling is behandeld vinkt u dit aan, en wordt de bestelling automatisch uit ons systeem verwijderd zodat er niemand last heeft van privacy schending. En het beste van dit alles? Het is compleet gratis!"/>
    <about/>
    <screen/>
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
import screen from './screen.vue'

export default {
  name: 'homepage',
  components: {
    navbar,
    hero,
    about,
    donate,
    contact,
    foot,
    screen
  }
}
</script>
