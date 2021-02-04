<template>
    <div>
        <p>Indien u een vraag heeft over ons systeem kan U ons altijd bereiken, ook ontvangen wij graag feedback. Wij doen ons best om zo spoedig mogelijk mailtjes te beantwoorden.</p>
        <form>
            <b-field label="Naam + achternaam">
                <b-input v-model="name" placeholder="Vul hier uw naam + achternaam in..." icon="signature" icon-pack="fas"></b-input>
            </b-field>
            <b-field label="Emailadres">
                <b-input v-model="name" placeholder="Vul hier uw emailadres in..." icon="envelope" icon-pack="fas"></b-input>
            </b-field>
            <b-field label="Uw bericht">
                <b-input v-model="name" type="textarea" placeholder="Vul hier uw naam + achternaam in..."></b-input>
            </b-field>
            <p class="control">
                <b-button class="is-pulled-right" style="margin-bottom: 3vh;" label="Verzend" type="is-primary"/>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: "contentcontact"
}
</script>

