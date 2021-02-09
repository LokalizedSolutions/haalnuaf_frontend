<template>
    <div>
        <h1 class="title">Winkel eigenschappen</h1>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-4">Instellingen</h1>
                    <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                        <p class="has-text-danger">Hey, er zijn wat fouten opgetreden!
                            <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                        </p>
                    </div>
                    <form id="form" @submit.prevent="checkForm">
                        <b-field label="Winkelnaam" :type="{'is-danger': true, 'is-danger': errors.has('storename')}" :message="errors.first('storename')">
                            <b-input v-validate="{ required: true, min: 3, max: 25, regex: /^[a-z0-9\-\_]+$/ }" v-model="storename" name="storename" type="text" placeholder="Vul hier uw nieuwe winkelnaam in..." icon="store" icon-pack="fas"></b-input>
                        </b-field>
                        <div> 
                            <p class="has-text-danger" style="margin-bottom: 1vh;">Een winkelnaam mag alleen uit kleine letters, - en _ bestaan.</p>
                        </div>
                        <b-field label="Winkel beschrijving" :type="{'is-danger': true, 'is-danger': errors.has('story')}" :message="errors.first('story')">
                            <b-input v-validate="'required|min:3|max:200'" v-model="story" name="story" type="textarea" placeholder="Vul hier uw winkel beschrijving in..."></b-input>
                        </b-field>
                        <div style="margin-bottom: 1vh;">
                            <p class="has-text-danger">
                                Alle contactgegevens zijn in te zien via uw online winkel, vul dus <strong>nooit</strong> contactgegevens in die niet openbaar mogen worden onder een van de contactvelden.
                            </p>
                        </div>
                        <b-field label="Contact - Mailadres (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('contactMail')}" :message="errors.first('contactMail')">
                            <b-input v-validate="'email'" v-model="contactMail" name="contactMail" type="text" placeholder="Vul hier uw mailadres in..." icon-pack="fas" icon="envelope"></b-input>
                        </b-field>
                        <b-field label="Contact - Telefoonnummer (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('contactPhone')}" :message="errors.first('contactPhone')">
                            <b-input v-validate="{ regex: /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{9}$)/ }" v-model="contactPhone" name="contactPhone" type="text" placeholder="Vul hier uw telefoonnummer in..." icon-pack="fas" icon="phone"></b-input>
                        </b-field>
                        <b-field label="Contact - Straat + nummer (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('contactStreet')}" :message="errors.first('contactStreet')">
                            <b-input v-model="contactStreet" name="contactStreet" type="text" placeholder="Vul hier de straat + nummer van uw winkel in..." icon-pack="fas" icon="road"></b-input>
                        </b-field>
                        <b-field label="Contact - Postcode (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('contactZip')}" :message="errors.first('contactZip')">
                            <b-input v-model="contactZip" name="contactZip" type="text" placeholder="Vul hier de postcode van uw winkel in..." icon-pack="fas" icon="map-marker"></b-input>
                        </b-field>
                        <b-field label="Contact - Land" :type="{'is-danger': true, 'is-danger': errors.has('contactCountry')}" :message="errors.first('contactCountry')">
                            <b-input v-validate="'alpha'" v-model="contactCountry" name="contactCountry" type="text" placeholder="Vul hier het land in waar uw winkel gelokaliseerd is..." icon-pack="fas" icon="flag"></b-input>
                        </b-field>
                        <b-field label="Contact - Plaats (optioneel)" :type="{'is-danger': true, 'is-danger': errors.has('contactPlace')}" :message="errors.first('contactPlace')">
                            <b-input v-validate="'alpha'" v-model="contactPlace" name="contactPlace" type="text" placeholder="Vul hier de plaats in waar uw winkel is..." icon-pack="fas" icon="location-arrow"></b-input>
                        </b-field>
                        <b-field label="Banner (optioneel)">
                            <input type="file" id="file" ref="file" name="file" v-on:change="handleFileUpload()">
                        </b-field>
                        <p class="control">
                            <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Winkel instellingen updaten" type="is-primary" native-type="submit" value="submit"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "storeOverview",
    data() {
        return {
            userName: '',
            contactMail: '',
            contactCountry: '',
            contactPlace: '',
            contactStreet: '',
            contactZip: '',
            contactPhone: '',
            story: '',
            banner: '',
            storename: '',
            back_errors: [],
            file: '',
            img: [],
            userId: localStorage.getItem('id')
        }
    },
    mounted() {
        this.userName = localStorage.getItem('username');
        this.apiCall(); 
    },
    methods: {
        checkForm() {
            // Set backend errors to null
            this.back_errors = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    if(this.file) {
                        this.fileSubmit(); 
                    } else {
                        this.apiUpdate(this.storename, this.story, this.contactStreet, this.contactZip, this.contactPlace, this.contactCountry, this.contactPhone, this.contactMail);
                    }
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld, probeer het opnieuw.');
                }
            });
        },
        apiCall() {
            this.date = Date.now();
            this.key = this.apiKey();

            this.$http.get(process.env.VUE_APP_API + '/stores/' + this.userName + '' , { params: { key: this.key, time: this.date } })
            .then(async response => {
                if(response) {
                    console.log(response);
                    await this.setVariables(response); 
                }
            })
            .catch(error => {
                console.log(error);
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        },
        setVariables(response) {
            this.contactMail = response.data.store.contact.email; 
            this.contactCountry = response.data.store.contact.location.country;
            this.contactPlace = response.data.store.contact.place;
            this.contactStreet = response.data.store.contact.street;
            this.contactZip = response.data.store.contact.zip; 
            this.contactPhone = response.data.store.contact.phone;
            this.story = response.data.store.story;
            this.banner = response.data.store.banner; 
            this.storename = response.data.store.storename;
        },
        async submitFile() {
            this.date = Date.now();
            this.key = this.apiKey();
            let formData = new FormData(); 

            formData.append('file', this.file);

            await this.$http.post(process.env.VUE_APP_API + "/image", formData, { headers: { 'Content-Type': 'multipart/form-data'}})
            .then(async response => {
                const photo = await response.data.id; 
                this.img.push(photo); 
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        },
        async fileSubmit() {
            await this.submitFile(); 
            this.apiUpdate(this.storename, this.story, this.contactStreet, this.contactZip, this.contactPlace, this.contactCountry, this.contactPhone, this.contactMail, this.img);
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        apiUpdate(storename, story, street, zip, place, country, mail, phone, banner) {
            this.date = Date.now();
            this.key = this.apiKey();

            this.$http.post(process.env.VUE_APP_API + '/users/' + this.userId + '/update', { 
                key: this.key, 
                time: this.date, 
                storename: storename, 
                banner: banner, 
                story: story, 
                contact: {
                    location: {
                        street: street,
                        place: place,
                        zip: zip,
                        country: country
                    },
                    email: mail,
                    phone: phone
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>
