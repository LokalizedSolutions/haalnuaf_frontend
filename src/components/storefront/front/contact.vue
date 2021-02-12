<template>
    <div class="content">
        <h1 class="title is-4">Contact</h1>
        <div>
            <strong>Mailadres</strong> {{ store.contactEmail ? store.contactEmail : "niet opgegeven" }}
        </div>
        <div>
            <strong>Telefoonnummer</strong> {{ store.contactPhone ? store.contactPhone : "niet opgegeven" }}
        </div>
        <br>
        <div>
            <strong>Adres</strong> {{ store.contactLocationStreet ? store.contactLocationStreet : "niet opgegeven" }}
        </div>
        <div>
            <strong>Plaatsnaam</strong> {{ store.contactLocationPlace ? store.contactLocationPlace : "niet opgegeven" }}
        </div>
        <div>
            <strong>Postcode</strong> {{ store.contactLocationZip ? store.contactLocationZip : "niet opgegeven" }}
        </div>
    </div>
</template>

<script>
export default {
    name: "contact",
    data() {
        return {
            store: ''
        }
    },
    mounted() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

        this.$http.get(process.env.VUE_APP_API + '/stores/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(async response => {
            this.store = await response.data.store; 
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>