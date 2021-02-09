<template>
    <div>
        <h1 class="title">Uw winkelwagen</h1>
        <div class="card">
            <div class="card-content">
                <orders/>
            </div>
        </div>
    </div>
</template>

<script>
import orders from './orders.vue'

export default {
    name: "orderView",
    components: {
        orders
    }
}
</script>