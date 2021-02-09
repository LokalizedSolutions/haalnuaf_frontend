<template>
    <div class="content">
        <h1 class="title is-4">Checkout</h1>
        <form id="form">
            <b-field label="Naam + achternaam">
                <b-input v-model="name" placeholder="Naam + achternaam..."></b-input>
            </b-field>
            <b-field label="Mail">
                <b-input v-model="mail" placeholder="Mailadres..."></b-input>
            </b-field>
            <b-field label="Telefoonnummer">
                <b-input v-model="mail" placeholder="Telefoonnummer..."></b-input>
            </b-field>
            <p class="control">
                <b-button expanded label="Bestelling afronden" type="is-primary" native-type="submit" value="submit"/>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: "checkoutView",
    data() {
        return {
            name: '',
            mail: ''
        }
    }
}
</script>

