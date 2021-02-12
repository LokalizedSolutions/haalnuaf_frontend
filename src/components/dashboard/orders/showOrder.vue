<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <h1 class="title is-4">Bestelling van {{ order.contactName }}</h1>
                <div>
                    <p><strong>Mailadres: </strong> {{ order.contactEmail }}</p>
                </div>
                <div>
                    <p><strong>Nummer: </strong> {{ order.contactPhone }}</p>
                </div>
                <div>
                    <p><strong>Totaalprijs: </strong> € {{ order.price }}</p>
                </div>
                <h1 style="margin-bottom: 1vh;" class="title is-5">Bestelde producten:</h1>
                <div v-for="(product, index) in products" :key="index">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="level-item">
                                <strong>Productnaam: </strong>
                            </div>
                            <div class="level-item">
                                {{ product.name }}
                            </div>
                            <div class="level-item">
                                <strong>Prijs per stuk: </strong>
                            </div>
                            <div class="level-item">
                                € {{ product.price }}
                            </div>
                            <div class="level-item">
                                <strong>Hoeveelheid besteld: </strong>
                            </div>
                            <div class="level-item">
                                {{ product.amount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "showOrder",
    data() {
        return {
            products: [],
            order: ''
        }
    },
    mounted() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

        this.$http.get(process.env.VUE_APP_API + '/orders/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(response => {
            this.products = response.data.order.products; 
            this.order = response.data.order;
            console.log(this.products);
        })
        .catch(error => {
            if(error.response.data.status === 400) {
                this.$router.go(-1);
            }
        })
    }
}
</script>