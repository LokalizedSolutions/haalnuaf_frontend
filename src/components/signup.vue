<template>
    <div>
        <authnavbar/>
        <div class="container" style="margin-top: 10vh;">
            <div class="columns">
                <div class="column is-one-third is-offset-one-third">
                    <h1 class="title has-text-centered">Registreren</h1>
                    <div class="card">
                        <!--form-->
                        <div class="card-content">
                            <div class="content">
                                <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                                    <p class="has-text-danger">Hey, er zijn wat fouten opgetreden!
                                        <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                                    </p>
                                </div>
                                <form id="form" @submit.prevent="checkForm">
                                    <b-field label="Emailadres" :type="{'is-danger': true, 'is-danger': errors.has('mail')}" :message="errors.first('mail')">
                                        <b-input v-validate="'required|email'" name="mail" type="mail" v-model="mail" placeholder="Vul hier uw emailadres in..." icon="envelope" icon-pack="fas"></b-input>
                                    </b-field>

                                    <b-field label="Bedrijfsnaam" :type="{'is-danger': true, 'is-danger': errors.has('companyname')}" :message="errors.first('companyname')">
                                        <b-input v-validate="'required'" name="companyname" type="text" v-model="companyname" placeholder="Vul hier uw bedrijfsnaam in..." icon="signature" icon-pack="fas"></b-input>
                                    </b-field>

                                    <b-field label="Winkelnaam" :type="{'is-danger': true, 'is-danger': errors.has('storename')}" :message="errors.first('storename')">
                                        <b-input v-validate="{ required: true, min: 3, max: 25, regex: /^[a-z0-9\-\_]+$/ }" name="storename" type="text" v-model="storename" placeholder="Vul hier uw winkelnaam in..." icon="store" icon-pack="fas"></b-input>
                                    </b-field>

                                    <div> 
                                        <p class="has-text-danger" style="margin-bottom: 1vh;">Een winkelnaam mag alleen uit kleine letters, - en _ bestaan.</p>
                                    </div>
                                    
                                    <b-field label="Uw wachtwoord" :type="{'is-danger': true, 'is-danger': errors.has('password')}" :message="errors.first('password')"> 
                                        <b-input v-validate="{ required: true, min: 3, max: 50, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/ }" v-model="password" type="password" name="password" placeholder="Vul hier uw wachtwoord in..." icon="key" icon-pack="fas"></b-input>
                                    </b-field>

                                    <div>
                                        <p class="has-text-danger" style="margin-bottom: 1vh;">Hey, voor het wachtwoord moet U gebruik maken van minimaal één hoofdletter, kleine letter, speciaal teken en cijfer.</p>
                                    </div>
                                    <p class="control">
                                        <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Registreren" type="is-primary" native-type="submit" value="submit"/>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authnavbar from './auth_navbar.vue'

export default {
    name: "signup",
    components: {
        authnavbar
    },
    data() {
        return {
            password: '',
            mail: '',
            companyname: '',
            storename: '',
            date: '',
            key: '',
            back_errors: []
        }
    },
    methods: {
        checkForm() {
            // Set backend errors to null
            this.back_errors = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.apiCall(this.mail, this.companyname, this.storename, this.password);
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld, probeer het opnieuw.');
                }
            });
        },
        // Create user
        apiCall(mail, companyname, storename, password) {
            this.date = Date.now();
            this.key = this.apiKey();
            // Send axios request (axios is under this.$http)
            this.$http.post(process.env.VUE_APP_API + "/users/create", { key: this.key, time: this.date, email: mail, company: companyname, storename: storename, password: password })
                /* eslint-disable no-unused-vars */
                .then(async response => {
                    await this.$router.push({ name: 'login' });
                })
                .catch(error => {
                    if(error) {
                        if(error.response.data.msg !== undefined) {
                            this.back_errors.push('Bericht: ' + error.response.data.msg);
                        } else {
                            this.back_errors.push('Statuscode: ' + error.response.data.status);
                        }
                    }
                });
        }
    }
}
</script>


