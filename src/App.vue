<template>
  <div id="app">
    <homepage/>
  </div>
</template>

<script>
import homepage from './components/main/homepage.vue'

export default {
  name: 'App',
  components: {
    homepage
  }
}
</script>

<style lang="scss">
/*colors*/
$primary: #6D28D9;
$link: $primary;
$black: #1F2937;

/*navbar*/
$navbar-item-hover-background-color: none;
$navbar-box-shadow-size: 0 2px 0px 0; 

@import "/node_modules/bulma/sass/utilities/_all";
@import "/node_modules/bulma";
@import "/node_modules/buefy/src/scss/buefy";
</style>