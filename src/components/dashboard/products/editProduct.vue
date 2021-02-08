<template>
    <h1 class="title">
        User {{ getRouteParamId() }}
    </h1>
</template>

<script>
export default {
    name: "editProduct",
    methods: {
        getRouteParamId() {
            return this.$route.params.id;
        }
    }
}
</script>
