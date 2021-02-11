<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-4">Nieuwe bestelling toevoegen</h1>
                    <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                        <p class="has-text-danger">Hey, er zijn wat fouten opgetreden!
                            <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                        </p>
                    </div>
                    <form id="form" @submit.prevent="checkForm">
                        <!--product loading-->
                        <b-field label="Voeg producten toe">
                            <b-select placeholder="Select a character" expanded v-model="selected">
                                <option disabled value="">Kies een product uit</option>
                                <option v-for="(product, index) in productArray" :key="index" :value="product">{{ product.name }}</option>
                            </b-select>
                            <p class="control">
                                <b-button class="button is-black" @click=addProduct()>Toevoegen</b-button>
                            </p>
                        </b-field>
                        <div> 
                            <p class="has-text-danger" style="margin-bottom: 1vh;">U bevestigd de hoeveelheid producten door op het groene vinkje te drukken. Kijk ook voor het verzenden altijd goed na of de producten en aantallen kloppen.</p>
                        </div>
                        <div v-if="selectedProducts.length">
                            <selectedProductsLevel v-for="(product, index) in selectedProducts" :key="index" :productName="product.name" :price="product.price" :baseArray="product"/>
                        </div>
                        <!--contact fields-->
                        <!--submit form-->
                        <p class="control">
                            <b-button class="is-pulled-right" style="margin-bottom: 3vh; margin-top: 2vh;" label="Bestelling aanmaken" type="is-primary" native-type="submit" value="submit"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import selectedProductsLevel from './selectedProductsLevel.vue'

export default {
    name: "createOrder",
    // Components
    components: {
        selectedProductsLevel
    },
    // Data
    data() {
        return {
            productArray: '',
            selected: '',
            selectedProducts: [],
            back_errors: [],
            blob: [],
            amount: 0
        }
    },
    // On component creation
    mounted() {
        this.date = Date.now();
        this.key = this.apiKey(); 
        this.id = localStorage.getItem('id');

        this.$http.get(process.env.VUE_APP_API + '/users/' + this.id + '/products', { params: { key: this.key , time: this.date } })
        .then(async response => {
            this.productArray = await response.data.products; 
        })
        .catch(error => {
            this.back_errors.push('Bericht: ' + error.response.data.msg);
        })
    },
    // Methods
    methods: {
        // Check form
        checkForm() {
            this.apiCall();
        },
        // Add product
        addProduct() {
            if(this.selected) {
                this.back_errors = [];
                if(this.selectedProducts.findIndex(x => x.name === this.selected.name) === -1) {
                    this.selectedProducts.push(this.selected);
                } else {
                    this.back_errors.push('U kan niet 2x hetzelfde product toevoegen.');
                }
            } else {
                this.back_errors.push('U heeft geen product geselecteerd.');
            }
        },
        setTotalPrice(amount) {
            this.amount = this.amount + amount;
        },
        apiCall() {
            this.date = Date.now();
            this.key = this.apiKey();
            this.id = localStorage.getItem('id');

            this.$http.post(process.env.VUE_APP_API + '/orders/create', { key: this.key, time: this.date, storeid: this.id, contactName: "Justian", contactEmail: "justiandev@gmail.com", contactPhone: "0618048010", products: this.blob, price: 1000, gettime: 1612979000})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response.data.msg);
            })
        }
    }
}
</script>