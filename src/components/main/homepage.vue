<template>
  <div class="homepage">
    <navbar/>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import navbar from './navbar.vue'

export default {
  name: 'homepage',
  props: {
    msg: String
  },
  components: {
    navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* empty */
</style>
