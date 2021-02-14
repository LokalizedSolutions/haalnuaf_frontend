<template>
    <div class="column is-one-quarter">
        <div class="card equal-height">
            <!--content-->
            <div class="card-content">
                <div class="content">
                    <h1 class="title is-5">{{ order.contactName }}</h1>
                    <div>
                        <strong>Mailadres: </strong>{{ order.contactEmail }}
                    </div>
                    <div>
                        <strong>Nummer: </strong>{{ order.contactPhone }}
                    </div>
                    <div>
                        <strong>Totaalprijs: </strong>€ {{ order.price }}
                    </div>
                    <div>
                        <strong>Order ID: </strong> {{ order.id.split('-')[0]}}
                    </div>
                    <div>
                        <strong>Afhaaltijd: </strong>Vanaf {{ new Date(order.time).toLocaleString("nl-NL", {timeZone: "Europe/Amsterdam"})}} tot {{ new Date(order.time+(60000*30)).toLocaleString("nl-NL", {timeZone: "Europe/Amsterdam"}) }}
                    </div>
                    <div>
                        <strong>Producten: </strong> Druk op 'bekijken'
                    </div>
                </div>
            </div>
            <div class="button-box">
                <a>
                    <b-button type="is-white" icon-pack="fas" icon-right="eye" @click=show()>
                        Bekijken
                    </b-button>
                    <b-button type="is-success" icon-pack="fas" icon-right="check" @click=complete() style="margin-left: 2%;">
                        Voltooi
                    </b-button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "orderCard",
    props: {
        contactName: String,
        order: Object
    },
    methods: {
        complete() {
            this.$buefy.dialog.confirm({
                title: 'Order voltooien',
                message: 'Weet u zeker dat u deze bestelling wilt <b>voltooien</b>? Het voltooien kan niet ongedaan gemaakt worden. Na het voltooien verdwijnt de bestelling uit uw overzicht.',
                confirmText: 'Voltooien',
                type: 'is-success',
                onConfirm: () => this.removeOrder()
            })
        },
        show() {
            this.$router.push({ path: 'show/' + this.order.id });
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
