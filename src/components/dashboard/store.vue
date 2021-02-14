<template>
    <div>
        <dashboardnav/>
        <hero title="Uw winkel" description="Hier houdt u alle winkel instellingen bij. Zo kunt u uw winkelnaam aanpassen, locatie toevoegen en meer."/>
        <div class="container" style="margin-top: 2vh;">
            <storeOverview/>
        </div>
        <foot/>
    </div>
</template>

<script>
import dashboardnav from './dashboard_nav.vue'
import foot from './../main/footer.vue'
import hero from './hero.vue'
import storeOverview from './store/storeOverview.vue'

export default {
    name: "stores",
    components: {
        dashboardnav,
        foot,
        hero,
        storeOverview
    }
}
</script>