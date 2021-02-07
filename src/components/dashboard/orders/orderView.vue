<template>
    <div>
        <topAction title="Uw bestellingen" action="Nieuwe bestelling"/>
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
