<template>
  <section class="hero is-black is-medium has-background">
    <img src="https://mediabank.valkenhorst.nl/imagebank/images/305/image67959/c323x1024.jpg" class="hero-background is-transparent">
    <div class="hero-body">
        <div class="container">
            <p class="title">
                {{ title }}
            </p>
            <p class="subtitle">
                {{ description }}
            </p>
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