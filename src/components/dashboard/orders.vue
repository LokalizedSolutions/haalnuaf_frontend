<template>
    <div>
        <dashboardnav/>
        <hero title="Bestellingen" description="In ons bestellingen tabje houdt U al uw bestellingen bij. Zie het overzicht van alle bestellingen, voeg nieuwe bestellingen toe, bewerk bestellingen of voltooi bestellingen."/>
        <foot/>
    </div>
</template>

<script>
import dashboardnav from './dashboard_nav.vue'
import foot from './../main/footer.vue'
import hero from './hero.vue'

export default {
    name: "orders",
    components: {
        dashboardnav,
        foot,
        hero
    }
}
</script>
