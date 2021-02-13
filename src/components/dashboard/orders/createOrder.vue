<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-4">Nieuwe bestelling toevoegen</h1>
                    <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                        <div class="has-text-danger">
                            Hey, er zijn wat fouten opgetreden!
                        </div>
                        <span class="has-text-danger" v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
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
                        <b-field label="Naam + achternaam" :type="{'is-danger': true, 'is-danger': errors.has('contactName')}" :message="errors.first('contactName')">
                            <b-input v-validate="'required'" name="contactName" type="text" v-model="contactName" placeholder="Vul hier naam + achternaam in..." icon="heading" icon-pack="fas"></b-input>
                        </b-field>
                        <b-field label="Mailadres" :type="{'is-danger': true, 'is-danger': errors.has('contactMail')}" :message="errors.first('contactMail')">
                            <b-input v-validate="'required|email'" name="contactMail" type="text" v-model="contactMail" placeholder="Vul hier het mailadres in..." icon="heading" icon-pack="fas"></b-input>
                        </b-field>
                        <b-field label="Telefoonnummer" :type="{'is-danger': true, 'is-danger': errors.has('contactPhone')}" :message="errors.first('contactPhone')">
                            <b-input v-validate="{ required: true, regex: /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{9}$)/ }" v-model="contactPhone" name="contactPhone" type="text" placeholder="Vul hier uw telefoonnummer in..." icon-pack="fas" icon="phone"></b-input>
                        </b-field>
                        <!--afhaaltijd-->
                        <b-field label="Selecteer afhaaldatum + tijd">
                            <b-datetimepicker inline v-model="datetime"
                                placeholder="Click to select..."
                                :min-datetime="minDatetime"
                                :max-datetime="maxDatetime"
                                :timepicker="{hourFormat: '24'}">
                            </b-datetimepicker>
                        </b-field>
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
        const min = new Date()
            min.setDate(min.getUTCDate())
            min.setMinutes(-780)
            min.setSeconds(0)
        const max = new Date()
            max.setDate(max.getUTCDate() + 7)
            max.setMinutes(659)
        return {

            productArray: '',
            selected: '',
            selectedProducts: [],
            back_errors: [],
            blob: [],
            contactName: '',
            contactMail: '',
            contactPhone: '',
            minDatetime: min,
            maxDatetime: max,
            datetime: new Date()
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
            // Set backend errors to null
            this.back_errors = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (this.blob.length) {
                        this.apiCall();
                    } else {
                        this.back_errors.push('U heeft geen producten toegevoegd aan de bestelling of de hoeveelheid niet bevestigd, probeer het opnieuw.');
                    }
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld, probeer het opnieuw.');
                }
            });
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
        apiCall() {
            this.date = Date.now();
            this.key = this.apiKey();
            this.id = localStorage.getItem('id');

            this.$http.post(process.env.VUE_APP_API + '/orders/create', { key: this.key, time: this.date, storeid: this.id, contactName: this.contactName, contactEmail: this.contactMail, contactPhone: this.contactPhone, products: this.blob, gettime: Date.parse(this.datetime)})
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                this.$router.push({ name: 'overviewOrders' });
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        }
    }
}
</script>