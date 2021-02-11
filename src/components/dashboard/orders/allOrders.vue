<template>
    <div>
        <div class="columns is-multiline">
            <orderCard v-for="(order, index) in orders" :key="index" :order="order"/>
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
            orders: ''
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
                console.log(response.data.orders)
            })
            .catch(error => {
                console.log(error.response.data.reason);
                console.log(this.key + 'Time: ' + this.date)
            })
        }
    }
}
</script>
