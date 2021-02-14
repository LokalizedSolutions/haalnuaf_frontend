<template>
    <div>
        <dashboardnav/>
        <hero title="Producten" description="Hier houdt u alle producten bij. U kunt producten aanmaken, bekijken, verwijderen en aanpassen."/>
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