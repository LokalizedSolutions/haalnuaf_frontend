<template>
    <section class="section" id="about">
        <div class="container" id="cardgen">
            <h1 class="title">Over haalnuaf.nl</h1>
            <div class="columns">
                <div v-for="(item, index) in items" :key="index" class="column">
                    <card :title="item.title" :description="item.description" :link="item.link" :icon="item.icon" :pack="item.pack" :button="item.button"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import card from './card.vue'
export default {
    name: "about",
    components: {
        card
    },
    data() {
        return {
            items: [
                { title: 'Over haalnuaf.nl', description: 'Vanaf 10 februari is het weer mogelijk om als winkel de deuren te openen, dit echter alleen voor ophaalservice. Wij bieden een systeem aan waarmee u gemakkelijk een online winkeltje beheert en mensen hun bestellingen kan laten doen. U krijgt de bestellingen in een duidelijk dagoverzicht en kan zo toch deze pandemie doorkomen met uw eigen online webwinkeltje gericht op ophalen.', link: 'https://www.youtube.com', pack: 'fab', icon: 'youtube', button: 'Kijk de video' },
                { title: 'Functies', description: 'Wij hebben diverse functies in ons systeem verwerkt, zo kan u uw eigen winkel layout kiezen. Deze winkel is dan te bereiken via winkelnaam.haalnuaf.nl of haalnuaf.nl/s/winkelnaam. Verder kunt u ook producten beheren, openingstijden wijzigen, bestellingen bekijken, zelf bestellingen handmatig toevoegen en nog veel meer.', link: 'https://www.youtube.com', pack: 'fab', icon: 'youtube', button: 'Ontdek meer via youtube' },
                { title: 'Wie zijn wij?', description: 'Wij zijn Noah Taheij en Justian Spijkerbosch, beide hobbymatig programmeur en student. Wij hebben haalnuaf.nl gebouwd om de lokale ondernemer te steunen en om hun een makkelijke technische oplossing te bieden op alle afhaalproblematiek.', icon: 'external-link-alt', pack: 'fas', link: 'https://lokalized.nl/', button: 'Wie zijn wij?'}
            ]
            
        }
    }
}
</script>

