<template>
    <section class="section" id="donate">
        <div class="container">
            <h1 class="title">Doneren</h1>
            <div class="columns">
                <div v-for="item in items" :key="item" class="column">
                    <card :title="item.title" :description="item.description" :link="item.link" :icon="item.icon" :pack="item.pack" :button="item.button"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import card from './card.vue'

export default {
    name: "donate",
    components: {
        card
    },
    data() {
        return {
            items: [
                { title: 'Doneren', description: 'Als platform zitten wij vast aan hoge kosten, o.a. voor de hosting van onze applicatie maar ook voor bijvoorbeeld het opslaan van alle data. Wij willen graag onze service gratis (blijven) aanbieden voor ondernemers die in zwaar weer zitten en zoeken naar een mooie technische oplossing voor het afhalen. Dit is echter alleen niet mogelijk zonder donaties, met elke donatie zijn we blij. Dus bent u bereid om ons te (financieel) te steunen in het onderhouden van ons platform? Dit kan door een eenmalige gift via buymeacoffee.' },
                { title: 'Buymeacoffee', description: 'Via Buymeacoffee kunt u gemakkelijk een gewenst bedrag doneren, dit kan via onderstaande link. Doneren is voor nu alleen mogelijk met PayPal.', link: 'https://www.buymeacoffee.com/haalnuafnl', pack: 'fab', icon: 'paypal', button: 'Buymeacoffee' }
            ]
        }
    }
}
</script>