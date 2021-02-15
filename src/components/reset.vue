<template>
    <div>
        <authnavbar/>
        <div class="container" style="margin-top: 10vh;">
            <div class="columns">
                <div class="column is-one-third is-offset-one-third">
                    <h1 class="title has-text-centered">Wachtwoord resetten</h1>
                    <div class="card">
                        <!--form-->
                        <div class="card-content">
                            <div class="content">
                                <div v-if="success.length" style="margin-bottom: 1vh;">
                                    <span class="has-text-success" v-for="succes in success" :key="succes">{{ succes }} </span>
                                </div>
                                <div v-if="back_errors.length" style="margin-bottom: 1vh;">
                                    <div class="has-text-danger">
                                        Hey, er zijn wat fouten opgetreden!
                                    </div>
                                    <span class="has-text-danger" v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
                                </div>
                                <form id="form" @submit.prevent="checkForm">
                                    <b-field label="Nieuw wachtwoord" :type="{'is-danger': true, 'is-danger': errors.has('pass')}" :message="errors.first('pass')">
                                        <b-input v-validate="{ required: true, min: 8, max: 50, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/ }" name="pass" type="password" v-model="password" placeholder="Vul hier uw nieuwe wachtwoord in..." icon="key" icon-pack="fas"></b-input>
                                    </b-field>

                                    <div>
                                        <p class="has-text-danger" style="margin-bottom: 1vh;">Voor het wachtwoord moet u gebruik maken van minimaal één hoofdletter, kleine letter, speciaal teken en cijfer.</p>
                                    </div>

                                    <p class="control">
                                        <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Wachtwoord resetten" type="is-primary" native-type="submit" value="submit"/>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <foot/>
    </div>
</template>

<script>
import authnavbar from './auth_navbar.vue'
import foot from './main/footer.vue'

export default {
    name: "reset",
    components: {
        authnavbar,
        foot
    },
    data() {
        return {
            password: '',
            success: [],
            back_errors: []
        }
    },
    mounted() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));
    
        this.$http.get(process.env.VUE_APP_API + '/users/passwordreset/' + this.$route.params.id , { params: { key: this.key, time: this.date, password: this.password }})
        .then(response => {
            console.log(response)
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
            this.$router.push('/login');
        })
    },
    methods: {
        checkForm: function() {
            // Set backend errors to null
            this.back_errors = [];
            this.success = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.apiCall();
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld, probeer het opnieuw.')
                }
            });
        },
        apiCall() {
            this.date = Date.now(); 
            const crypto = require('crypto');
            this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));
        
            this.$http.post(process.env.VUE_APP_API + '/users/passwordreset/' + this.$route.params.id + '/update', { key: this.key, time: this.date, password: this.password})
            .then(response => {
                this.success.push(response.data.msg);
            }) 
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        }
    }
}
</script>