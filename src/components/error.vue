<template>
    <section class="hero is-black is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <p class="title">
                            404 - Error
                        </p>
                        <p class="subtitle">
                            Hey. Het spijt ons maar deze pagina bestaat niet.
                        </p>
                        <b-button @click=onClick() type="is-primary is-large">
                            Keer terug
                        </b-button>
                    </div>
                    <div>
                        <img responsive rounded style="width: 256px" src="https://cdn.lokalized.nl/haalnuaf-images/notfound?v=1">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "error",
    methods: {
        onClick() {
            this.$router.go(-1);
        }
    }
}
</script>