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
// import own scss utitily file
@import "./assets/scss/style.scss";
// import scss files (buefy and bulma)
@import "/node_modules/bulma/sass/utilities/_all";
@import "/node_modules/bulma";
@import "/node_modules/buefy/src/scss/buefy";

/*cards*/
.equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.equal-height .card-content {
  flex: auto;
}

.button-box {
  margin-bottom: 3vh;
  padding-left: 1.5rem;
}
</style>