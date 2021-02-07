<template>
    <div>
        <dashboardnav/>
        <hero title="Instellingen" description="Via dit tabje kan U uw account instellingen wijzigen, uw wachtwoord, mail en meer."/>
        <foot/>
    </div>
</template>

<script>
import dashboardnav from './dashboard_nav.vue'
import foot from './../main/footer.vue'
import hero from './hero.vue'

export default {
    name: "settings",
    components: {
        dashboardnav,
        foot,
        hero
    }
}
</script>