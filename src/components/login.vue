<template>
    <div>
        <authnavbar/>
        <h1>Login</h1>
    </div>
</template>

<script>
import authnavbar from './auth_navbar.vue'

export default {
    name: "login",
    components: {
        authnavbar
    }
}
</script>
