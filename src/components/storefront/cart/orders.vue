<template>
    <div class="content">
        <h1 class="title is-4">Geselecteerde producten</h1>
        <singleOrder/>
        <singleOrder/>
        <singleOrder/>
        <singleOrder/>
        <singleOrder/>
        <div class="level">
            <div class="level-left">
                <div class="level-item">

                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <strong>Totaal prijs:</strong>
                </div>
                <div class="level-item">
                    <strong>€ 250.00</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import singleOrder from './singleOrder.vue'

export default {
    name: "orders",
    components: {
        singleOrder
    }
}
</script>

