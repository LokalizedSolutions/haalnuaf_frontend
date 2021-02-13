<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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

.control.has-icons-left .icon,
.control.has-icons-right .icon {
  pointer-events: auto !important;
}

@media(max-width: 767px) { /* <== You can change this break point as per your  needs */
  .reverse-columns {
    flex-direction: column-reverse;
    display: flex;
  }
}
.customtag {
  position: absolute;
  top: 1.5rem;
  margin-left: 1.5rem;
}
</style>