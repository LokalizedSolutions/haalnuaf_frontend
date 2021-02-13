<template>
  <section class="hero is-black is-medium has-background">
    <img src="https://images.pexels.com/photos/358178/pexels-photo-358178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="hero-background is-transparent">
    <div class="hero-body">
        <div class="container">
            <p class="title">
                {{ title }}
            </p>
            <p class="subtitle">
                {{ description }}
            </p>
            <b-button tag="router-link" :to="{ name : 'signup' }" type="is-primary" disabled>
                <strong>Start nu gratis</strong>
            </b-button>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'hero',
    props: {
        title: String,
        description: String
    }
}
</script>

<style scoped>
    .hero.has-background {
        position: relative;
        overflow: hidden;
    }
    .hero-background {
        position: absolute;
        object-fit: cover;
        object-position: center center;
        width: 100%;
        height: 100%;
    }
    .hero-background.is-transparent {
        opacity: 0.3;
    }
</style>