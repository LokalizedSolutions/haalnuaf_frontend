<template>
    <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <p class="title">
                            Dank voor uw bestelling.
                        </p>
                        <p class="subtitle">
                            U ontvangt zo spoedig mogelijk een mailtje van ons met alle informatie over uw bestelling ter bevestiging.
                        </p>
                        <b-button @click=onClick() type="is-black is-large">
                            Keer terug naar de winkelpagina.
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
    name: "success",
    methods: {
        onClick() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
    .hero {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>