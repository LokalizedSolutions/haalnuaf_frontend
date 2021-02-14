<template>
    <div>
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <h1 class="title is-4">Product bewerken</h1>
                        <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                            <div class="has-text-danger">
                                Hey, er zijn wat fouten opgetreden!
                            </div>
                            <span class="has-text-danger" v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                        </div>
                        <form id="form" @submit.prevent="checkForm">
                            <!--productname-->
                            <b-field label="Productnaam" :type="{'is-danger': true, 'is-danger': errors.has('productName')}" :message="errors.first('productName')">
                                <b-input v-validate="'required'" name="productName" type="text" v-model="productName" placeholder="Vul hier de productnaam in.." icon="heading" icon-pack="fas"></b-input>
                            </b-field>
                            <b-field label="Productbeschrijving (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('productDescription')}" :message="errors.first('productDescription')">
                                <b-input name="productDescription" type="textarea" v-model="productDescription" placeholder="Vul hier de productbeschrijving in.."></b-input>
                            </b-field>
                            <b-field label="Prijs (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('price')}" :message="errors.first('price')">
                                <b-input v-validate="'decimal:2|min_value:0'" name="price" type="text" v-model="price" placeholder="Prijs" icon="euro-sign" icon-pack="fas"></b-input>
                            </b-field>
                            <b-field label="Max (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('max')}" :message="errors.first('max')">
                                <b-input v-validate="'decimal:0|min_value:-1'" name="max" type="text" v-model="max" placeholder="Max"></b-input>
                            </b-field>
                            <div style="margin-bottom: 1vh;">
                                <p class="has-text-danger">
                                    Het veld max staat voor de hoeveelheid producten die u beschikbaar heeft. U kiest -1 voor status uitverkocht, 0 voor status oneindig en een ander getal om het precies aan te geven.
                                </p>
                            </div>
                            <!--upload-->
                            <b-field label="Nieuwe productfoto (optioneel)">
                                <input type="file" id="file" ref="file" name="file" v-on:change="handleFileUpload()">
                            </b-field>
                            <!--submit form-->
                            <p class="control">
                                <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Product bewerken" type="is-primary" native-type="submit" value="submit"/>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "editProduct",
    data() {
        return {
            back_errors: [],
            productName: '',
            productDescription: '',
            price: '',
            max: '',
            photoId: [],
            file: ''
        }
    },
    methods: {
        getRouteParamId() {
            return this.$route.params.id;
        },
        checkForm() {
            // Set backend errors to null
            this.back_errors = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    if(this.file) {
                        this.fileSubmit(); 
                    } else {
                        this.apiCall(this.productName, this.productDescription, this.price, this.max);
                    }
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld. Probeer het opnieuw.');
                }
            });
        },
        async submitFile() {
            this.date = Date.now();
            this.key = this.apiKey();
            let formData = new FormData(); 

            formData.append('file', this.file);

            await this.$http.post(process.env.VUE_APP_API + "/image", formData, { headers: { 'Content-Type': 'multipart/form-data'}})
            .then(async response => {
                const photo = await response.data.id; 
                this.photoId.push(photo); 
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error);
            })
        },
        async fileSubmit() {
            await this.submitFile(); 
            this.apiCall(this.productName, this.productDescription, this.price, this.max, this.photoId)
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        apiCall(productName, productDescription, price, max, photos) {
            this.date = Date.now();
            this.key = this.apiKey();

            this.$http.post(process.env.VUE_APP_API + "/products/" + this.getRouteParamId() + "/update", { key: this.key, time: this.date, name: productName, description: productDescription, price: price, max: max, photos: photos })
            // eslint-disable-next-line no-unused-vars
            .then(async response => {
                await localStorage.removeItem('products');
                this.$router.push({ name: 'overviewProduct' });
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error);
            })
        },
    },
    mounted() {
        this.date = Date.now();
        this.key = this.apiKey();

        this.$http.get(process.env.VUE_APP_API + "/products/" + this.getRouteParamId() , { params: { key: this.key, time: this.date } })
        .then(response => {
            this.productName = response.data.product.name;
            this.productDescription = response.data.product.description;
            this.price = response.data.product.price; 
            this.max = response.data.product.max;
        })
        .catch(error => {
            this.back_errors.push('Bericht: ' + error.response.data.msg);
        })
    }
}
</script>
