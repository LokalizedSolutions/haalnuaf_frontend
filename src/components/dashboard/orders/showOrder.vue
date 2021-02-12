<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <h1 class="title is-4">Bestelling van {{ order.contactName }}</h1>
                <div>
                    <p><strong>Mailadres: </strong> {{ order.contactEmail }}</p>
                </div>
                <div>
                    <p><strong>Nummer: </strong> {{ order.contactPhone }}</p>
                </div>
                <div>
                    <p><strong>Order ID: </strong> {{ order.id.split('-')[0]}}</p>
                </div>
                <div>
                    <p><strong>Totaalprijs: </strong> € {{ order.price }}</p>
                </div>
                <div>
                    <strong>Afhaaltijd: </strong>Vanaf {{ new Date(order.time).toLocaleString("nl-NL", {timeZone: "Europe/Amsterdam"})}} tot {{ new Date(order.time+(60000*30)).toLocaleString("nl-NL", {timeZone: "Europe/Amsterdam"}) }}
                </div>
                <h1 style="margin-bottom: 1vh;" class="title is-5">Bestelde producten:</h1>
                <div v-for="(product, index) in products" :key="index">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="level-item">
                                <strong>Productnaam: </strong>
                            </div>
                            <div class="level-item">
                                {{ product.name }}
                            </div>
                            <div class="level-item">
                                <strong>Prijs per stuk: </strong>
                            </div>
                            <div class="level-item">
                                € {{ product.price }}
                            </div>
                            <div class="level-item">
                                <strong>Hoeveelheid besteld: </strong>
                            </div>
                            <div class="level-item">
                                {{ product.amount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-button type="is-success" icon-pack="fas" icon-right="check" @click=complete() style="margin-left: 2%; margin-bottom: 2vh;">
            Voltooi bestelling
        </b-button>
    </div>
</template>

<script>
export default {
    name: "showOrder",
    data() {
        return {
            products: [],
            order: ''
        }
    },
    mounted() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

        this.$http.get(process.env.VUE_APP_API + '/orders/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(response => {
            this.products = response.data.order.products; 
            this.order = response.data.order;
            console.log(this.products);
        })
        .catch(error => {
            if(error.response.data.status === 400) {
                this.$router.go(-1);
            }
        })
    },
    methods: {
        complete() {
            this.$buefy.dialog.confirm({
                title: 'Order voltooien',
                message: 'Bent u er zeker van dat u deze order wil <b>voltooien</b>? Het voltooien kan niet ongedaan gemaakt worden. Na het voltooien verdwijnt de order uit uw overzicht.',
                confirmText: 'Voltooien',
                type: 'is-success',
                onConfirm: () => this.removeOrder()
            })
        },
        removeOrder() {
            this.date = Date.now(); 
            this.key = this.apiKey();

            this.$http.post(process.env.VUE_APP_API + '/orders/' + this.order.id + '/delete', { key: this.key, time: this.date })
            .then(() => {
                this.$router.go();
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg)
            })
        }
    }
}
</script>