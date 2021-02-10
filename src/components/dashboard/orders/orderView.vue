<template>
    <div>
        <topAction title="Uw bestellingen" actionOne="Alle bestellingen" actionTwo="Nieuwe bestelling"/>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import topAction from './levelOrder.vue';

export default {
    name: "orderView",
    components: {
        topAction
    }
}
</script>
