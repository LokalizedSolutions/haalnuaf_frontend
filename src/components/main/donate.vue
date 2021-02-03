<template>
    <section class="section" id="donate">
        <div class="container">
            <h1 class="title">Doneren</h1>
            <div class="columns">
                <card/>
            </div>
        </div>
    </section>
</template>

<script>
import card from './card.vue'

export default {
    name: "donate",
    components: {
        card
    }
}
</script>