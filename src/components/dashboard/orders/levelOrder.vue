<template>
    <nav class="level">
        <div class="level-left">
            <div class="level-item">
                <h1 class="title">{{ title }}</h1>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <b-button type="is-light" icon-pack="fas" icon-right="columns" tag="router-link" :to="{ name: 'overviewOrders' }">
                    {{ actionOne }}
                </b-button>
            </div>
            <div class="level-item">
                <b-button type="is-primary" icon-pack="fas" icon-right="plus" tag="router-link" :to="{ name: 'createOrder' }">
                    {{ actionTwo }}
                </b-button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "topAction",
    props: {
        title: String,
        actionOne: String,
        actionTwo: String
    }
}
</script>
