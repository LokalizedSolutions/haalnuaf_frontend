<template>
    <div>
        <div class="columns is-multiline">
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving. Dit is een test of de cards wel meeschalen." price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
            <productCard productTitle="Voorbeeldnaam" productDescription="Voorbeeld omschrijving" price="50.00"/>
        </div>
    </div>
</template>

<script>
import productCard from './productCard.vue'

export default {
    name: "products", 
    components: {
        productCard
    }
}
</script>
