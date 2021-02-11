<template>
    <div>
        <h1>{{ this.start }}</h1>
        <h1>{{ end }}</h1>
    </div>
</template>

<script>
export default {
    name: "openingHours",
    props: {
        start: String,
        end: String
    }
}
</script>