<template>
    <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <div>
                    <h1 class="title is-6">{{ product.name }}</h1>
                    <p>{{ product.description }}</p>
                </div>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <p>€ {{ product.price }}</p>
            </div>
            <div class="level-item">
                <b-field>
                    <b-input placeholder="Hoeveelheid"
                        type="number"
                        min="1"
                        max="99">
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
    name: "singleOrder",
    data() {
        return {
            amount: ''
        }
    },
    props: {
        product: Object
    },
    mounted() {
        console.log(this.product);
    }
}
</script>
