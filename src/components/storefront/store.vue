<template>
    <div>
        <storeNav/>
        <hero title="Winkel" description="Wij zijn uw leverancier voor de beste kwaliteitsgereedschappen."/>
        <div class="container" style="margin-top: 2vh;">
            <div class="columns reverse-columns">
                <div class="column is-three-quarters">
                    <products/>
                </div>
                <div class="column is-one-quarter">
                    <sidebar/>
                </div>
            </div>
        </div>
        <foot/>
    </div>
</template>

<script>
import storeNav from './store_nav.vue'
import hero from './hero.vue'
import products from './front/products.vue'
import sidebar from './front/sidebar.vue'
import foot from './footer.vue'

export default {
    name: "storefront",
    components: {
        storeNav,
        hero,
        products,
        sidebar,
        foot
    }
}
</script>
