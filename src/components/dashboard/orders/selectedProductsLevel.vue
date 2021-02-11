<template>
    <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <h1 class="title is-6">{{ productName }}</h1>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <p>€ {{ getTotalPrice() }}</p>
            </div>
            <div class="level-item">
                <b-field>
                    <b-input v-model="amount" placeholder="Hoeveelheid"
                        type="number"
                        min="1"
                        max="99"
                        value="1">
                    </b-input>
                    <b-button type="is-success"
                    icon-right="check" icon-pack="fas" @click=changeAmount() />
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
            index: '',
            indexTwo: '',
            amount: 0
        }
    },
    // props
    props: {
        productName: String,
        price: Number,
        arrayIndex: Number,
        baseArray: Object
    },
    // methods
    methods: {
        // removeProduct
        removeProduct() {
            this.index = this.$parent.selectedProducts.findIndex(x => x.name === this.productName);
            this.indexTwo = this.$parent.blob.findIndex(x => x.name === this.productName);
            if(this.index > -1) {
                this.$parent.selectedProducts.splice(this.index, 1);
                this.$parent.setTotalPrice(-this.getTotalPrice());
            }
            if(this.$parent.blob.length) {
                if(this.indexTwo > -1) {
                    this.$parent.blob.splice(this.indexTwo, 1);
                }
            }
        },
        // Get total price
        getTotalPrice() {
            return this.price * this.amount;
        },
        // changeAmount
        changeAmount() {
            var add = {};
            var productID = "amount";
            var amount = parseInt(this.amount);
            add[productID] = amount;
            this.$parent.blob.push(Object.assign(this.baseArray, add))
            this.$parent.setTotalPrice(this.getTotalPrice());
        }
    }
}
</script>
