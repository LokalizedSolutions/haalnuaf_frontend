<template>
    <div>
        <topBar/>
        <div class="columns is-multiline">
            <productCard v-for="(product, index) in products" :key="index" :productTitle="product.name" :productDescription="product.description" :price="product.price" :img="product.photos[0]"/>
        </div>
        <b-button type="is-primary is-pulled-right">Laad meer items</b-button>
    </div>
</template>

<script>
import topBar from './topBar.vue'
import productCard from './productCard.vue'

export default {
    name: "products",
    components: {
        topBar,
        productCard
    },
    data() {
        return {
            storeId: '',
            products: []
        }
    },
    async created() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

        await this.$http.get(process.env.VUE_APP_API + '/stores/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(async response => {
            this.storeId = await response.data.store.storeid; 
            await this.loadProducts(); 
        })
        .catch(error => {
            if(error.response.data.status === 404) {
                this.$router.push('/404');
            } else {
                this.$router.push('/404');
            }
        })
    },
    methods: {
        async loadProducts() {
            this.date = Date.now(); 
            const crypto = require('crypto');
            this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

            this.$http.get(process.env.VUE_APP_API + "/users/" + this.storeId + "/products", { params: { key: this.key, time: this.date } })
            .then(async response => {
                this.products = response.data.products.reverse();
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        }
    }
}
</script>
