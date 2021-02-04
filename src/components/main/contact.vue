<template>
    <section class="section" id="contact">
        <div class="container">
            <h1 class="title">Contact</h1>
            <div class="columns">
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <div class="content">
                                <contentcontact/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import contentcontact from './contentcontact.vue'

export default {
    name: "contact",
    components: {
        contentcontact
    }
}
</script>