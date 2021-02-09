<template>
    <div>
        <topBar/>
        <div class="columns is-multiline">
            <productCard productTitle="Blauwekaas" productDescription="De lekkersteblauwe kaas van Nederland." price=20.00 img="0bd97215-4c19-44de-ac62-8c00b59ec8d5"/>
            <productCard productTitle="Schimmelkaas" productDescription="Schimmelkaas met een lekker pikante smaak." price=10.00 img="f2451f3b-2989-4e9d-80c8-228cccbb0886"/>
            <productCard productTitle="Chocoladekaas" productDescription="Chocoladekaas, kaas met een zoet tintje." price=27.50 img="9eb74248-246d-42fe-8265-3dc04831d329"/>
            <productCard productTitle="Aardbeienkaas" productDescription="Aardbeienkaas, kaas met een rode uitslag." price=4.50 img="b4809aee-c574-4817-9299-dfecfb323f33"/>
            <productCard productTitle="Kaasplankje" productDescription="Kom de avondklok goed door met deze avondkaasjes." price=15.50 img="49f57b5b-5160-4b6f-a77a-f2808870a688"/>
            <productCard productTitle="Mes" productDescription="Het perfecte mes om een stukje kaas te snijden." price=7.50 img="8541d536-72d3-4935-aebb-4b638c8e7018"/>
        </div>
        <b-button type="is-primary is-pulled-right">Laad meer items</b-button>
    </div>
</template>

<script>
import topBar from './topBar.vue'
import productCard from './productCard.vue'

export default {
    name: "products",
    components: {
        topBar,
        productCard
    }
}
</script>
