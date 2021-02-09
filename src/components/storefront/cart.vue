<template>
    <div>
        <storeNav/>
        <hero title="Winkel" description="Alvast bedankt voor uw (mogelijke) bestelling."/>
        <div class="container" style="margin-top: 2vh;">
            <div class="columns">
                <div class="column is-three-quarters">
                    <orderView/>
                </div>
                <div class="column is-one-quarter">
                    <checkout/>
                </div>
            </div>
        </div>
        <foot/>
    </div>
</template>

<script>
import storeNav from './store_nav.vue'
import hero from './hero.vue'
import orderView from './cart/orderView.vue'
import checkout from './cart/checkout.vue'
import foot from './footer.vue'

export default {
    name: "cart",
    components: {
        storeNav,
        hero,
        orderView,
        checkout,
        foot
    }
}
</script>
