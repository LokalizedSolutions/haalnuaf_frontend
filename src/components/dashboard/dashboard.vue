<template>
    <div>
        <dashboardnav/>
        <hero :title="'Welkom, ' + username + '.'" description="Op uw dashboard voert U alle acties uit die nodig zijn om uw bestellingen bij te houden. Producten te plaatsen, verwijderen of bewerken. Of om uw winkel details te wijzigen."/>
        <foot/>
    </div>
</template>

<script>
import foot from './../main/footer.vue'
import dashboardnav from './dashboard_nav.vue'
import hero from './hero.vue'

export default {
    name: "dashboard",
    data() {
        return {
            username: localStorage.getItem('username') || ''
        }
    },
    components: {
        foot,
        dashboardnav,
        hero
    }
}
</script>