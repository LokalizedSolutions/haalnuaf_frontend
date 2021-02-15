<template>
    <div style="height: 100%">
        <div class="card equal-height">
            <div class="card-content">
                <div class="content">
                    <h3 class="subtitle">{{ title }}</h3>
                    <p>{{ description }}</p>
                </div>
            </div>
            <div v-if="link" class="button-box">
                <a :href="link">
                    <b-button type="is-primary">
                        <strong>{{ button }}</strong>
                        <template v-if="pack">
                            <b-icon :pack="pack" :icon="icon"></b-icon>
                        </template>
                    </b-button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "card",
    props: {
        title: String,
        description: String,
        link: String,
        pack: String,
        icon: String,
        button: String
    }
}
</script>
