<template>
    <div class="content">
        <h1 class="title is-4">Geselecteerde producten</h1>
        <div v-if="products.length"> 
            <singleOrder v-for="(product, index) in products" :key="index " :product="product" />
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <!--empty slot-->
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <strong>Totaal prijs:</strong>
                    </div>
                    <div class="level-item">
                        <strong>€ {{ totalPrice }}</strong>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="has-text-danger">Geen producten gevonden in uw winkelwagen. {{ totalPrice }}</p>
        </div>
    </div>
</template>

<script>
import singleOrder from './singleOrder.vue'

export default {
    name: "orders",
    components: {
        singleOrder
    },
    data() {
        return {
            products: JSON.parse(localStorage.getItem('cart')) || ''
        }
    },
    computed: {
        totalPrice() {
            let total = 0;

            for (let item of this.$store.state.cart) {
                total += item.totalPrice;
            }

            return total.toFixed(2);
        }
    }
}
</script>

