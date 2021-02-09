<template>
    <div>
        <div class="card">
            <div class="card-content">
                <openingHours/>
            </div>
        </div>
        <div class="card" style="margin-top: 2vh;">
            <div class="card-content">
                <contact/>
            </div>
        </div>
    </div>
</template>

<script>
import openingHours from './openingHours.vue'
import contact from './contact.vue'

export default {
    name: "sidebar",
    components: {
        openingHours,
        contact
    }
}
</script>
