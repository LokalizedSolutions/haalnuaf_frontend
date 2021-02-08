<template>
    <div>
        <div class="columns is-multiline">
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving. Dit is een test of de cards wel meeschalen." price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <b-button @click=apiCall()>Test</b-button>
        </div>
    </div>
</template>

<script>
import productCard from './productCard.vue'

export default {
    name: "producten", 
    components: {
        productCard
    },
    methods: {
        apiCall() {
            this.date = Date.now();
            this.key = this.apiKey();

            let userId = localStorage.getItem('id');
            this.$http.get(process.env.VUE_APP_API + "/users/" + userId + "/products", { key: this.key, time: this.date })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response.data.msg);
                console.log(this.date);
                console.log(this.key);
            })
        }
    }
}
</script>
