<template>
    <div>
        <topAction title="Producten" actionOne="Alle producten" actionTwo="Nieuw product"/>
        <router-view></router-view>
    </div>
</template>

<script>
import topAction from './levelProduct.vue';
// import products from './products.vue'

export default {
    name: "productView",
    components: {
        topAction,
        // products
    }
}
</script>
