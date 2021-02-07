<template>
    <div>
        <dashboardnav/>
        <hero title="Producten" description="In ons producten tabje houdt U al uw producten bij. Zie het overzicht van alle producten, voeg nieuwe producten toe, bewerk producten of verwijder producten."/>
        <div class="container">
            <productView style="margin-top: 2.5vh;" />
        </div>
        <foot/>
    </div>
</template>

<script>
import dashboardnav from './dashboard_nav.vue'
import foot from './../main/footer.vue'
import hero from './hero.vue'
import productView from './products/productView.vue'

export default {
    name: "products",
    components: {
        dashboardnav,
        foot,
        hero,
        productView
    }
}
</script>