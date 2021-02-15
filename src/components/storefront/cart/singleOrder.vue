<template>
    <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <div>
                    <h1 class="title is-6">{{ product.name }}</h1>
                    <p>{{ product.description.slice(0, 25) }}</p>
                </div>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <p>€ {{ totalPriceProduct }}</p>
            </div>
            <div class="level-item">
                <b-button type="is-white"
                icon-right="minus" icon-pack="fas" @click="minProduct()"/>
            </div>
            <div class="level-item">
                <b-button type="is-primary"
                icon-right="plus" icon-pack="fas" @click="addProduct()"/>
            </div>
            <div class="level-item">
                <b-button type="is-danger"
                icon-right="trash-alt" icon-pack="fas" @click="removeFromCart()"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "singleOrder",
    data() {
        return {
            amount: ''
        }
    },
    props: {
        product: Object,
        ind: Number
    },
    mounted() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));
    
        this.$http.get(process.env.VUE_APP_API + '/stores/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(response => {
            if(response.data.store.storeid === this.product.storeid) {
                return true;
            } else {
                localStorage.removeItem('cart');
                localStorage.removeItem('cartCount');
                this.$router.go();
            }
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        async removeFromCart() {
            await this.$store.commit('removeFromCart', this.ind);
            this.$router.go();
        },
        async addProduct() {
            this.date = Date.now(); 
            const crypto = require('crypto');
            this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));
            
            await this.$http.get(process.env.VUE_APP_API + '/products/' + this.product.id, { params: { key: this.key, time: this.date }})
            .then(async response => {
                if(response.data.product.max === -1) {
                    this.$buefy.toast.open({
                        duration: 2000,
                        message: `Dat product is uitverkocht.`,
                        type: 'is-danger'
                    })
                } else {
                    this.$store.commit('addToCart', response.data.product);
                }
            })
            .catch(error => {
                console.log(error);
            })
            this.product.amount++; 
        },
        async minProduct() {
            await this.$store.commit('minCart', this.product, this.ind);
            await this.product.amount--;
            if(this.product.amount === 0) {
                this.$store.commit('removeFromCart', this.ind);
                this.$router.go();
            }
        }
    },
    computed: {
        totalPriceProduct() {
            let total = 0;

            total = this.product.amount * this.product.price;

            return total.toFixed(2);
        }
    }
}
</script>
