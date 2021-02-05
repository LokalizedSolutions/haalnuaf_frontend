<template>
    <h1 class="title">Dashboard</h1>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "dashboard",
    methods: {
        ...mapGetters(["isLoggedIn"]),
    }
}
</script>