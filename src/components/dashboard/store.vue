<template>
    <div>
        <dashboardnav/>
        <hero title="Uw winkel" description="In het uw winkel tabje houdt U al uw winkel instellingen bij. Bewerk uw locatie, voeg een info kopje toe of upload een mooie banner."/>
        <foot/>
    </div>
</template>

<script>
import dashboardnav from './dashboard_nav.vue'
import foot from './../main/footer.vue'
import hero from './hero.vue'

export default {
    name: "stores",
    components: {
        dashboardnav,
        foot,
        hero
    }
}
</script>