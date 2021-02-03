<template>
  <section class="hero is-black">
    <div class="hero-body">
        <div class="container">
            <p class="title">
                {{ title }}
            </p>
            <p class="subtitle">
                {{ description }}
            </p>
            <b-button type="is-primary">
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