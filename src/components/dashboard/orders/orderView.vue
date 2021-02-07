<template>
    <div>
        <topAction title="Uw bestellingen" action="Nieuwe bestelling"/>
    </div>
</template>

<script>
import topAction from './../level.vue';

export default {
    name: "orderView",
    components: {
        topAction
    }
}
</script>
