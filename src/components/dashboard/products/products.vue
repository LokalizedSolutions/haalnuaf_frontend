<template>
    <div>
        <div v-if="parsedProducts">
            <div class="columns is-multiline">
                <productCard v-for="(product, index) in limitedItems" :key="index" :productTitle="product.name" :productDescription="product.description" :price="product.price" :img="product.photos[0]" :id="product.id"/>
            </div>
            <div v-if="!(limitNumber > parsedProducts.length)">
                <b-button type="is-primary is-pulled-right" @click="limitNumber += 6">Laad meer items</b-button>
            </div>
        </div>
        <div v-else>
            <p class="has-text-danger">Hey, er zijn wat fouten opgetreden bij het inladen van de producten!
                <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
            </p>
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
            products: '',
            parsedProducts: JSON.parse(localStorage.getItem('products')) || '',
            limitNumber: 16
        }
    },
    components: {
        productCard
    },
    mounted() {
        this.apiCall();
        this.limitNumber = 16;
    },
    methods: {
        apiCall() {
            if(!this.parsedProducts.length) {
                this.date = Date.now();
                this.key = this.apiKey();

                let userId = localStorage.getItem('id');
                this.$http.get(process.env.VUE_APP_API + "/users/" + userId + "/products", { params: { key: this.key, time: this.date } })
                .then(async response => {
                    this.products = await localStorage.setItem('products', JSON.stringify(response.data.products.reverse()));
                    this.parsedProducts = await JSON.parse(localStorage.getItem('products'));
                })
                .catch(error => {
                    this.back_errors.push('Bericht: ' + error.response.data.msg);
                })
            }
        }
    },
    computed: {
        limitedItems() {
            return this.parsedProducts.slice(0,this.limitNumber)
        }
    }
}
</script>
