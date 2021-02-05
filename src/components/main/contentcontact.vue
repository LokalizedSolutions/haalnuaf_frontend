<template>
    <div>
        <p>Indien u een vraag heeft over ons systeem kan U ons altijd bereiken, ook ontvangen wij graag feedback. Wij doen ons best om zo spoedig mogelijk mailtjes te beantwoorden.</p>
        <div v-if="back_errors.length" style="margin-bottom: 1vh;">
            <p class="has-text-danger">Hey, er zijn wat fouten opgetreden bij het verwerken van uw contactformulier!
                <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
            </p>
        </div>
        <div v-if="success.length" style="margin-bottom: 1vh;">
            <p class="has-text-success">Dank voor uw bericht, we gaan er zo spoedig mogelijk mee aan de slag.</p>
        </div>
        <form id="form" @submit.prevent="checkForm">
            <b-field label="Naam + achternaam" :type="{'is-danger': true, 'is-danger': errors.has('name')}" :message="errors.first('name')">
                <b-input class="is-input" v-validate="'required|min:3'" name="name" type="text" v-model="name" placeholder="Vul hier uw naam + achternaam in..." icon="signature" icon-pack="fas"></b-input>
            </b-field>
            
            <b-field label="Emailadres" :type="{'is-danger': true, 'is-danger': errors.has('mail')}" :message="errors.first('mail')">
                <b-input v-validate="'required|email'" name="mail" type="mail" v-model="mail" placeholder="Vul hier uw emailadres in..." icon="envelope" icon-pack="fas"></b-input>
            </b-field>
            
            <b-field label="Uw bericht" :type="{'is-danger': true, 'is-danger': errors.has('message')}" :message="errors.first('message')">
                <b-input v-validate="'required|min:50|max:1000'" name="message" v-model="message" type="textarea" placeholder="Vul hier uw naam + achternaam in..."></b-input>
            </b-field>

            <p class="control">
                <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Verzend" type="is-primary" native-type="submit" value="submit"/>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: "contentcontact",
    data() {
        return{
            name: '',
            mail: '',
            message: '',
            back_errors: [],
            success: []
        }
    },
    methods: {
        // Check contact form
        checkForm() {
            // Set backend success / errors to null
            this.back_errors = [];
            this.success = []; 

            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.sendMail(this.name, this.mail, this.message);
                    this.$validator.reset();
                    this.name = '';
                    this.mail = '';
                    this.message = '';
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld, probeer het opnieuw.')
                }
            });
        },
        // sendMail function
        sendMail(name, mail, message) {
            this.date = Date.now();
            this.key = this.apiKey();
            // Send axios request (axios is under this.$http)
            this.$http.post("https://dev-api.haalnuaf.nl/mail", { key: this.key, time: this.date, email: mail, name: name, message: message })
                .then(response => this.success.push('Gelukt' + response))
                .catch(error => this.back_errors.push('Er is iets fout gegaan met onze backend, probeer het later opnieuw. Statuscode: ' + error.response.data.status));
        }
    }
}
</script>

