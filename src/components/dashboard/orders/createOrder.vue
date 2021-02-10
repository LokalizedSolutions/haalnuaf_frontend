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
                        <div v-if="selectedProducts.length">
                            <selectedProductsLevel v-for="(product, index) in selectedProducts" :key="index" :productName="product.name" :price="product.price"/>
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
            back_errors: []
        }
    },
    // On component creation
    mounted() {
        this.date = Date.now();
        this.key = this.apiKey(); 
        this.id = localStorage.getItem('id');
        this.userName = localStorage.getItem('username');

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
            // console.log(this.productArray);
        },
        // Add product
        addProduct() {
            this.selectedProducts.push(this.selected);
        }
    }
}
</script>