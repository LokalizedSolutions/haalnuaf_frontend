<template>
    <div>
        <authnavbar/>
        <div class="container" style="margin-top: 10vh;">
            <div class="columns">
                <div class="column is-one-quarter is-offset-4">
                    <h1 class="title">Inloggen</h1>
                    <div class="card">
                        <!--form-->
                        <div class="card-content">
                            <div class="content">
                                <form id="form" @submit="checkForm">
                                    <b-field label="Uw mail">
                                        <b-input v-model="mail" name="mail"></b-input>
                                    </b-field>
                                    <b-field label="Uw wachtwoord">
                                        <b-input v-model="password" type="password" name="password" password-reveal></b-input>
                                    </b-field>
                                    <p class="control">
                                        <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Inloggen" type="is-primary" native-type="submit" value="submit"/>
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
    name: "login",
    components: {
        authnavbar
    }
}
</script>
