<template>
    <div>
        <p>Indien u een vraag heeft over ons systeem kan U ons altijd bereiken, ook ontvangen wij graag feedback. Wij doen ons best om zo spoedig mogelijk mailtjes te beantwoorden.</p>
        <div v-if="errors.length" style="margin-bottom: 1vh;">
            <p class="has-text-danger">Hey, er zijn wat fouten opgetreden bij het verwerken van uw contactformulier!
                <span v-for="error in errors" :key="error">{{ error }} </span>
            </p>
        </div>
        <div v-if="success.length">
            <p class="has-text-success">Bedankt voor uw bericht, wij proberen zo spoedig mogelijk te antwoorden.</p>
        </div>
        <form id="form" @submit="checkForm">
            <b-field label="Naam + achternaam">
                <b-input name="name" type="text" v-model="name" placeholder="Vul hier uw naam + achternaam in..." icon="signature" icon-pack="fas"></b-input>
            </b-field>
            <b-field label="Emailadres">
                <b-input name="mail" type="mail" v-model="mail" placeholder="Vul hier uw emailadres in..." icon="envelope" icon-pack="fas"></b-input>
            </b-field>
            <b-field label="Uw bericht">
                <b-input name="message" v-model="message" type="textarea" placeholder="Vul hier uw naam + achternaam in..."></b-input>
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
            errors: [],
            name: null,
            mail: null,
            message: null,
            success: [],
            date: null,
        }
    },
    methods: {
        // Check contact form
        checkForm: function(e) {
            // Set error array to null
            this.errors = [];
            this.success = [];

            // Check if name, message and email aren't null, and are following our other requirements.
            if(!this.name) {
                this.errors.push('U heeft uw naam + achternaam niet ingevuld.');
            } else if (this.name.length < 3) {
                this.errors.push('Denk eraan om een naam van 3 of meer karakters te kiezen.')
            } 

            if(!this.message) {
                this.errors.push('U heeft geen bericht ingevuld, denk eraan om een bericht in te vullen van minimaal 50 tekens.')
            } else if (this.message.length < 50 || this.message.length > 1000) {
                this.errors.push('U kunt alleen berichten sturen die boven de 50 karakters en onder de 1000 karakters lang zijn.')
            } 

            if(!this.mail) {
                this.errors.push('U heeft geen mail ingevuld, denk eraan om een email in te vullen.')
            } else if (!this.validEmail(this.mail)) {
                this.errors.push('U heeft geen geldige email ingevuld, denk eraan om een geldige email in te vullen.')
            }

            if(!this.errors.length) {
                this.sendMail(this.name, this.mail, this.message)
                // Set everything in form back to null.
                this.name = null;
                this.mail = null;
                this.message = null;
            }

            // Prevent default
            e.preventDefault();
        },
        // Valid mail check
        validEmail: function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        // sendMail function
        sendMail: function(name, mail, message) {
            this.date = Date.now();
            this.key = this.apiKey();
            // Send axios request (axios is under this.$http)
            this.$http.post("https://dev-api.haalnuaf.nl/mail", { key: this.key, time: this.date, email: mail, name: name, message: message })
                .then(response => this.success.push('Gelukt' + response))
                .catch(error => this.errors.push('Er is iets fout gegaan met onze backend, probeer het later opnieuw. Statuscode: ' + error.response.data.status));
        }
    }
}
</script>

