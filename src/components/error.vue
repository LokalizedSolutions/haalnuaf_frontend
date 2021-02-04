<template>
    <section class="hero is-black is-fullheight">
        <div class="hero-body">
            <div class="container">
                <p class="title">
                    404 - Error
                </p>
                <p class="subtitle">
                    Hey. Het spijt ons maar deze pagina bestaat niet.
                </p>
                <router-link to="/">
                    <b-button type="is-primary is-large">
                        Keer terug
                    </b-button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "error"
}
</script>