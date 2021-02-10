<template>
    <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <h1 class="title is-6">{{ productName }}</h1>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <p>€ {{ price }}</p>
            </div>
            <div class="level-item">
                <b-field>
                    <b-input placeholder="Hoeveelheid"
                        type="number"
                        min="1"
                        max="99"
                        value="1">
                    </b-input>
                </b-field>
            </div>
            <div class="level-item">
                <b-button type="is-danger"
                icon-right="trash-alt" icon-pack="fas"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "selectedProductsLevel",
    // props
    props: {
        productName: String,
        price: String
    }
}
</script>
