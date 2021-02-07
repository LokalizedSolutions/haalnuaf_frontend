<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-4">Nieuw product toevoegen</h1>
                    <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                        <p class="has-text-danger">Hey, er zijn wat fouten opgetreden!
                            <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                        </p>
                    </div>
                    <form id="form" @submit.prevent="checkForm">
                        <!--productname-->
                        <b-field label="Productnaam" :type="{'is-danger': true, 'is-danger': errors.has('productName')}" :message="errors.first('productName')">
                            <b-input v-validate="'required'" name="productName" type="text" v-model="productName" placeholder="Vul hier uw productnaam in" icon="heading" icon-pack="fas"></b-input>
                        </b-field>
                        <b-field label="Productbeschrijving (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('productDescription')}" :message="errors.first('productDescription')">
                            <b-input name="productDescription" type="textarea" v-model="productDescription" placeholder="Vul hier uw productbeschrijving in"></b-input>
                        </b-field>
                        <b-field label="Prijs (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('price')}" :message="errors.first('price')">
                            <b-input v-validate="'decimal:2'" name="price" type="text" v-model="price" placeholder="Prijs" icon="euro-sign" icon-pack="fas"></b-input>
                        </b-field>
                        <!--upload-->
                        <b-field label="Productfoto (optioneel)">
                            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
                        </b-field>
                        <!--submit form-->
                        <p class="control">
                            <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Product aanmaken" type="is-primary" native-type="submit" value="submit"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "createProduct",
    data() {
        return {
            back_errors: [],
            productName: '',
            productDescription: '',
            file: '',
            price: ''
        }
    },
    methods: {
        checkForm() {
            if(this.$refs.file.files) {
                let formData = new FormData(); 
                formData.append('file', this.file);
                console.log(formData);
            }
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        }
    }
}
</script>
