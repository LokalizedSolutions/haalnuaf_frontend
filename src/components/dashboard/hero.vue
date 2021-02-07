<template>
  <section class="hero is-black">
    <div class="hero-body">
        <div class="container" style="margin-top: 2vh;">
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