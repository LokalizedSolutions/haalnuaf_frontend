<template>
    <div>
        <dashboardnav/>
        <hero :title="'Welkom terug, ' + username + '.'" description="Op uw dashboard voert u alle acties uit die nodig zijn om uw bestellingen en producten bij te houden."/>
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