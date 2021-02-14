<template>
    <div>
        <dashboardnav/>
        <hero title="Instellingen" description="Hier kan u uw instellingen wijzigen. Zo past u gemakkelijk uw bedrijfsnaam en andere dingen aan."/>
        <div class="container" style="margin-top: 2vh;">
            <settingsView/>
        </div>
        <foot/>
    </div>
</template>

<script>
import dashboardnav from './dashboard_nav.vue'
import foot from './../main/footer.vue'
import hero from './hero.vue'
import settingsView from './settings/settingsView.vue'

export default {
    name: "settings",
    components: {
        dashboardnav,
        foot,
        hero,
        settingsView
    }
}
</script>