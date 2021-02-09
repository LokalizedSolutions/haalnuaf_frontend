<template>
    <div>
        <storeNav/>
        <hero title="Winkel" description="Wij zijn uw leverancier voor de beste kwaliteitsgereedschappen."/>
        

    </div>
</template>

<script>
import storeNav from './store_nav.vue'
import hero from './hero.vue'

export default {
    name: "storefront",
    components: {
        storeNav,
        hero
    }
}
</script>
