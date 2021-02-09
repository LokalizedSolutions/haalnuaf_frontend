<template>
    <div>
        <storeNav/>
        <hero title="Winkel" description="Alvast bedankt voor uw (mogelijke) bestelling."/>
    </div>
</template>

<script>
import storeNav from './store_nav.vue'
import hero from './hero.vue'

export default {
    name: "cart",
    components: {
        storeNav,
        hero
    }
}
</script>
