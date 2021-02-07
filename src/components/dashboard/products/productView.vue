<template>
    <div>
        <topAction title="Uw producten" action="Nieuw product"/>
        <products/>
    </div>
</template>

<script>
import topAction from './../level.vue';
import products from './products.vue'

export default {
    name: "productView",
    components: {
        topAction,
        products
    }
}
</script>
