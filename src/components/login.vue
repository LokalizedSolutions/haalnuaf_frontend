<template>
    <div>
        <authnavbar/>
        <div class="container" style="margin-top: 10vh;">
            <div class="columns">
                <div class="column is-one-third is-offset-one-third">
                    <h1 class="title has-text-centered">Inloggen</h1>
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
            
                                    <b-field label="Uw wachtwoord" :type="{'is-danger': true, 'is-danger': errors.has('password')}" :message="errors.first('password')"> 
                                        <b-input v-validate="'required|min:8|max:50'" v-model="password" type="password" name="password" placeholder="Vul hier uw wachtwoord in..." icon="key" icon-pack="fas"></b-input>
                                    </b-field>

                                    <b-field grouped position="is-right">
                                        <router-link to="/wachtwoord_vergeten">
                                            <p class="control">
                                                <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Wachtwoord vergeten" type="is-white"/>
                                            </p>
                                        </router-link>
                                        <p class="control">
                                            <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Inloggen" type="is-primary" native-type="submit" value="submit"/>
                                        </p>
                                    </b-field>
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
    name: "login",
    components: {
        authnavbar
    },
    data() {
        return {
            password: '',
            mail: '',
            back_errors: []
        }
    },
    methods: {
        checkForm: function() {
            // Set backend errors to null
            this.back_errors = [];

            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$validator.reset();
                    return true;
                } else {
                    this.back_errors.push('Je hebt niet alle velden correct ingevuld, probeer het opnieuw.');
                }
            });
        },
    }
}
</script>
