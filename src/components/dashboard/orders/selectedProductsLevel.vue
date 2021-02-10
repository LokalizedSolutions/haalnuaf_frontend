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
                icon-right="trash-alt" icon-pack="fas" @click=removeProduct() />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "selectedProductsLevel",
    // data
    data() {
        return {
            index: ''
        }
    },
    // props
    props: {
        productName: String,
        price: Number,
        arrayIndex: Number
    },
    // methods
    methods: {
        // removeProduct
        removeProduct() {
            this.index = this.$parent.selectedProducts.findIndex(x => x.name === this.productName);
            if(this.index > -1) {
                this.$parent.selectedProducts.splice(this.index, 1);
            }
        }
    }
}
</script>
