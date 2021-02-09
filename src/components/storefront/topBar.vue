<template>
    <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <h1 class="title">Producten</h1>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <b-field>
                        <b-input placeholder="Productnaam..."
                            type="search"
                            icon="search"
                            icon-pack="fas">
                        </b-input>
                        <p class="control">
                            <b-button type="is-primary" label="Zoeken" />
                        </p>
                    </b-field>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: "topBar"
}
</script>
