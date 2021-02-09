<template>
    <div>
        <h1 class="title">Bestelling afronden</h1>
        <div class="card">
            <div class="card-content">
                <checkoutView/>
            </div>
        </div>
    </div>
</template>

<script>
import checkoutView from './checkoutView.vue'

export default {
    name: "checkout",
    components: {
        checkoutView
    }
}
</script>
