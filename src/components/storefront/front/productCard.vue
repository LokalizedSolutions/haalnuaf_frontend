<template>
    <div class="column is-one-third">
        <div class="card equal-height">
            <!--image-->
            <div class="card-image">
                <figure class="image is-4by3">
                <img :src="'https://cdn.lokalized.nl/haalnuaf-images/' + img" alt="Placeholder image">
                </figure>
                <span class="tag is-primary customtag is-medium">
                    € {{ price }}
                </span>
            </div>
            <!--content-->
            <div class="card-content">
                <div class="content">
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <h1 class="title is-4">{{ productTitle }}</h1>
                            </div>
                        </div>
                    </div>
                    <div v-if="productDescription.length < 25">
                        <p><strong>Beschrijving:</strong> {{ productDescription }}</p>
                    </div>
                    <div v-else>
                        <p><strong>Beschrijving:</strong> Druk op het oogje.</p>
                    </div>
                    <div v-if="max === -1">
                        <p class="has-text-danger"><strong>Max aantal: </strong>Uitverkocht</p>
                    </div>
                    <div v-else-if="max === 0">
                        <p><strong>Max aantal: </strong>Oneindig</p>
                    </div>
                    <div v-else>
                        <p><strong>Max aantal: </strong>{{ max }}</p>
                    </div>
                </div>
            </div>
            <div class="button-box">
                <b-button type="is-primary" icon-pack="fas" icon-right="shopping-cart" @click=addProduct()>
                    Toevoegen
                </b-button>
                <!--<b-button type="is-danger" icon-pack="fas" icon-right="trash-alt" @click=removeProduct()>
                    Verwijderen
                </b-button>-->
                <b-button v-if="productDescription.length > 24" type="is-white" icon-pack="fas" icon-right="eye" style="margin-left: 2%;" @click="showProductDescription()">
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "productCard",
    props: {
        productDescription: String,
        productTitle: String,
        price: Number,
        img: String,
        max: Number,
        id: String
    },
    methods: {
        showProductDescription() {
             this.$buefy.dialog.alert({
                title: this.productTitle,
                message: this.productDescription,
                confirmText: 'Keer terug'
            })
        },
        // add Product to cart
        async addProduct() {
            this.date = Date.now(); 
            const crypto = require('crypto');
            this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));
            
            await this.$http.get(process.env.VUE_APP_API + '/products/' + this.id, { params: { key: this.key, time: this.date }})
            .then(async response => {
                this.$store.commit('addToCart', response.data.product);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>
