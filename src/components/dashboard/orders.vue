<template>
    <div>
        <dashboardnav/>
        <hero title="Bestellingen" description="In ons bestellingen tabje houdt U al uw bestellingen bij. Zie het overzicht van alle bestellingen, voeg nieuwe bestellingen toe, bewerk bestellingen of voltooi bestellingen."/>
        <div class="container">
            <orderView style="margin-top: 2.5vh;" />
        </div>
        <foot/>
    </div>
</template>

<script>
import dashboardnav from './dashboard_nav.vue'
import foot from './../main/footer.vue'
import hero from './hero.vue'
import orderView from './orders/orderView.vue'

export default {
    name: "orders",
    components: {
        dashboardnav,
        foot,
        hero,
        orderView
    }
}
</script>
