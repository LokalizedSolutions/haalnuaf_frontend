<template>
    <div class="content">
        <h1 class="title is-4">Checkout</h1>
        <div v-if="back_errors.length" style="margin-bottom: 1vh;">
            <div class="has-text-danger">
                Hey, er zijn wat fouten opgetreden!
            </div>
            <span class="has-text-danger" v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
        </div>
        <form id="form" @submit.prevent="checkForm()">
            <b-field label="Naam + achternaam" :type="{'is-danger': true, 'is-danger': errors.has('name')}" :message="errors.first('name')">
                <b-input v-validate="'required|alpha_spaces'" v-model="name" name="name" placeholder="Naam + achternaam..."></b-input>
            </b-field>
            <b-field label="Mail" :type="{'is-danger': true, 'is-danger': errors.has('mail')}" :message="errors.first('mail')">
                <b-input v-validate="'required|email'" v-model="mail" name="mail" placeholder="Mailadres..."></b-input>
            </b-field>
            <b-field label="Telefoonnummer" :type="{'is-danger': true, 'is-danger': errors.has('contactPhone')}" :message="errors.first('contactPhone')">
                <b-input v-validate="{ required: true, regex: /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{9}$)/ }" v-model="contactPhone" name="contactPhone" type="text" placeholder="Vul hier uw telefoonnummer in..." icon-pack="fas" icon="phone"></b-input>
            </b-field>
            <b-field label="Afhaaldatum + tijd" :type="{'is-danger': true, 'is-danger': errors.has('time')}" :message="errors.first('time')">
                <b-datetimepicker
                    v-validate="'required'" name="time" v-model="time" inline placeholder="Klik om te selecteren.."
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime"
                    :timepicker="{ hourFormat: '24', incrementMinutes }">
                </b-datetimepicker>
            </b-field>
            <b-field label=""
                :type="{'is-danger': errors.has('flag-terms')}"
                :message="{'Ga akkoord met onze voorwaarden om door te gaan.' : errors.firstByRule('flag-terms', 'required')}">
                <b-checkbox v-model="flagTerms" name="flag-terms" v-validate="'required:false'">
                    Ik ga akkoord met de <router-link to="/privacyverklaring">Privacy voorwaarden</router-link> en <router-link to="/algemenevoorwaarden">Algemene voorwaarden</router-link> van haalnuaf
                </b-checkbox>
            </b-field>
            <p class="control">
                <b-button expanded label="Bestelling afronden" type="is-primary" native-type="submit" value="submit"/>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: "checkoutView",
    data() {
        const min = new Date()
            min.setDate(min.getDate())
            min.setHours(min.getHours() + 4)
        const max = new Date()
            max.setDate(max.getDate() + 7)
            max.setHours(23.59)
        return {
            name: '',
            mail: '',
            contactPhone: '',
            minDatetime: min,
            maxDatetime: max,
            incrementMinutes: 30,
            time: new Date(),
            back_errors: [],
            products: JSON.parse(localStorage.getItem('cart')),
            storeid: ''
        }
    },
    methods: {
        checkForm() {
            // Set backend errors to null
            this.back_errors = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (this.products.length) {
                        this.apiCall();
                    } else {
                        this.back_errors.push('U heeft geen producten geselecteerd.');
                    }
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld. Probeer het opnieuw.');
                }
            });
        },
        async apiCall() {
            this.date = Date.now(); 
            const crypto = require('crypto');
            this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

            await this.$http.post(process.env.VUE_APP_API + '/orders/create', { key: this.key, time: this.date, storeid: this.storeid, contactName: this.name, contactEmail: this.mail, contactPhone: this.contactPhone, products: this.products, gettime: Date.parse(this.time)})
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                localStorage.removeItem('cart');
                localStorage.removeItem('cartCount');
                this.$router.push({ name: 'success' });
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        }
    },
    mounted() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

        this.$http.get(process.env.VUE_APP_API + '/stores/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(response => {
            this.storeid = response.data.store.storeid;
        })
        .catch(error => {
            this.back_errors.push('Bericht: ' + error.response.data.msg);
        })
    },
}
</script>

