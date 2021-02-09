<template>
    <div>
        <h1 class="title">Account instellingen</h1>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-4">Instellingen aanpassen</h1>
                    <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                        <p class="has-text-danger">Hey, er zijn wat fouten opgetreden!
                            <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                        </p>
                    </div>
                    <form id="form" @submit.prevent="checkForm">
                        <b-field label="Bedrijfsnaam" :type="{'is-danger': true, 'is-danger': errors.has('company')}" :message="errors.first('company')">
                            <b-input v-validate="{ required: true, min: 3, max: 25, regex: /^[a-z0-9\-\_]+$/ }" v-model="company" name="company" type="text" placeholder="Vul hier uw nieuwe winkelnaam in..." icon="store" icon-pack="fas"></b-input>
                        </b-field>
                        <b-field label="Mailadres" :type="{'is-danger': true, 'is-danger': errors.has('contactMail')}" :message="errors.first('contactMail')">
                            <b-input v-validate="'email'" v-model="contactMail" name="contactMail" type="text" placeholder="Vul hier uw mailadres in..." icon-pack="fas" icon="envelope"></b-input>
                        </b-field>
                        <b-field label="Nieuw wachtwoord" :type="{'is-danger': true, 'is-danger': errors.has('password')}" :message="errors.first('password')"> 
                            <b-input v-validate="{ min: 8, max: 50, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/ }" v-model="password" type="password" name="password" placeholder="Vul hier uw nieuwe wachtwoord in..." icon="key" icon-pack="fas"></b-input>
                        </b-field>
                        <div>
                            <p class="has-text-danger" style="margin-bottom: 1vh;">Hey, voor het wachtwoord moet U gebruik maken van minimaal één hoofdletter, kleine letter, speciaal teken en cijfer.</p>
                        </div>
                        <p class="control">
                            <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Instellingen updaten" type="is-primary" native-type="submit" value="submit"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        <div class="card" style="margin-top: 2vh;">
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-4">Account verwijderen</h1>
                    <div v-if="back_errors_delete.length" style="margin-bottom: 1vh;">
                        <p class="has-text-danger">Hey, er zijn wat fouten opgetreden!
                            <span v-for="back_error in back_errors_delete" :key="back_error">{{ back_error }} </span>
                        </p>
                    </div>
                    <form id="delete" @submit.prevent="deleteAccount">
                        <div>
                            <p class="has-text-danger" style="margin-bottom: 1vh;">Indien U uw account met alle bijbehorende gegevens wil verwijderen kan dat met deze functie, ben er bewust van dat deze beslissing NIET terug gedraaid kan worden.</p>
                        </div>
                        <p class="control">
                            <b-button expanded class="is-pulled-right" style="margin-bottom: 3vh;" label="Account verwijderen" type="is-danger" native-type="submit" value="submit"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "settingsView",
    data() {
        return {
            back_errors: [],
            back_errors_delete: [],
            company: '',
            contactMail: '',
            password: ''
        }
    },
    methods: {
        checkForm() {
            // Set backend errors to null
            this.back_errors = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (this.password === '') {
                        this.editAccount(this.contactMail, this.company);
                    } else {
                        this.editAccount(this.contactMail, this.company, this.password);
                    }
                    this.editAccount(); 
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld, probeer het opnieuw.');
                }
            });
        },
        deleteAccount() {
           this.$buefy.dialog.confirm({
                title: 'Product verwijderen',
                message: 'Bent u er zeker van dat u uw account wil <b>verwijderen</b>? Het verwijderen kan niet ongedaan gemaakt worden.',
                confirmText: 'Verwijder',
                type: 'is-danger',
                onConfirm: () => this.remove()
            })
        },
        apiCall() {
            this.date = Date.now();
            this.key = this.apiKey();

            this.$http.get(process.env.VUE_APP_API + '/users/' + this.id + '' , { params: { key: this.key, time: this.date } })
            .then(response => {
                this.company = response.data.user.company;
                this.contactMail = response.data.user.email;
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        },
        editAccount(contactMail, company, password) {
            this.date = Date.now();
            this.key = this.apiKey();

            this.$http.post(process.env.VUE_APP_API + '/users/' + this.id + '/update', { key: this.key, time: this.date, password: password, company: company, email: contactMail })
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                this.$router.go();
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        },
        async remove() {
            this.back_errors_delete = [];
            this.date = Date.now();
            this.key = this.apiKey();
            localStorage.removeItem('username');
            localStorage.removeItem('products');
            await this.$http.post(process.env.VUE_APP_API + "/users/" + localStorage.getItem('id') + "/delete", { key: this.key, time: this.date })
            // eslint-disable-next-line no-unused-vars
            .then(async response => {
                // nothing
            })
            .catch(error => {
                this.back_errors_delete.push('Bericht: ' + error.response.data.msg);
            }) 
            localStorage.removeItem('token');
            await localStorage.removeItem('id');
            this.$router.go(); 
        }
    },
    mounted() {
        this.id = localStorage.getItem('id');
        this.userName = localStorage.getItem('username');
        this.apiCall(); 
    }
}
</script>
