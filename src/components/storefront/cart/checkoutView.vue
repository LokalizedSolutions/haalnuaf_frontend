<template>
    <div class="content">
        <h1 class="title is-4">Checkout</h1>
        <form id="form">
            <b-field label="Naam + achternaam">
                <b-input v-model="name" placeholder="Naam + achternaam..."></b-input>
            </b-field>
            <b-field label="Mail">
                <b-input v-model="mail" placeholder="Mailadres..."></b-input>
            </b-field>
            <b-field label="Telefoonnummer">
                <b-input v-model="mail" placeholder="Telefoonnummer..."></b-input>
            </b-field>
            <b-field label="Afhaaldatum + tijd">
                <b-datetimepicker
                    v-model="time" inline placeholder="Click to select..."
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime"
                    :timepicker="{ hourFormat: '24', incrementMinutes }">
                </b-datetimepicker>
            </b-field>
            <p class="control">
                <b-button expanded label="Bestelling afronden" type="is-primary" native-type="submit" value="submit"/>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: "checkoutView",
    data() {
        const min = new Date()
            min.setDate(min.getDate())
            min.setHours(min.getHours() + 4)
        const max = new Date()
            max.setDate(max.getDate() + 7)
            max.setHours(23.59)
        return {
            name: '',
            mail: '',
            minDatetime: min,
            maxDatetime: max,
            incrementMinutes: 30,
            time: new Date()
        }
    }
}
</script>

