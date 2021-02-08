<template>
    <div>
        <div class="columns is-multiline">
            <div v-if="back_errors.length" class="column">
                <p class="has-text-danger">Hey, er zijn wat fouten opgetreden tijdens het inladen van de producten!
                    <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                </p>
            </div>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <b-button @click=apiCall()>Test</b-button>
        </div>
    </div>
</template>

<script>
import productCard from './productCard.vue'

export default {
    name: "producten", 
    data() {
        return {
            key: '',
            date: '',
            back_errors: []
        }
    },
    components: {
        productCard
    },
    mounted() {
        this.apiCall();
    },
    methods: {
        apiCall() {
            this.date = Date.now();
            this.key = this.apiKey();

            let userId = localStorage.getItem('id');
            this.$http.get(process.env.VUE_APP_API + "/users/" + userId + "/products", { params: { key: this.key, time: this.date } })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg)
            })
        }
    }
}
</script>
