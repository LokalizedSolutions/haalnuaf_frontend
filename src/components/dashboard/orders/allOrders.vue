<template>
    <div>
        <div v-if="orders.length">
            <div class="columns is-multiline">
                <orderCard v-for="(order, index) in orders" :key="index" :order="order"/>
            </div>
        </div>
        <div v-else>
            <p class="has-text-danger">Er zijn op dit moment geen orders om in te laden.
                <span v-for="back_error in back_errors" :key="back_error">{{ back_error }} </span>
            </p>
        </div>
    </div>
</template>

<script>
import orderCard from './orderCard.vue'

export default {
    name: "allOrders",
    components: {
        orderCard
    },
    data() {
        return {
            orders: '',
            back_errors: []
        }
    },
    mounted() {
        this.apiCall();
    },
    methods: {
        apiCall() {
            this.date = Date.now(); 
            const crypto = require('crypto');
            this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));
            this.id = localStorage.getItem('id');

            this.$http.get(process.env.VUE_APP_API + '/users/' + this.id + '/orders', { params: { key: this.key, time: this.date, id: this.id }})
            .then(response => {
                this.orders = response.data.orders.reverse();
            })
            .catch(error => {
                this.back_errors.push('Bericht: ' + error.response.data.msg);
            })
        }
    }
}
</script>
