<template>
    <div>
        <div class="columns is-multiline">
            <div v-if="back_errors.length" class="column">
                <p class="has-text-danger">Hey, er zijn wat fouten opgetreden tijdens het inladen van de producten!
                    <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                </p>
            </div>
            <productCard :productTitle="products[40].name" :productDescription="products[40].description" :price="products[40].price" :img="products[40].photos[0]"/>
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
            back_errors: [],
            products: ''
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
                this.products = response.data.products;
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg)
            })
        }
    }
}
</script>
