<template>
    <div class="content">
        <h1 class="title is-4">Openingstijden</h1>
        <div>
            <strong>Ma: </strong><p class="is-inline-block" v-if="store.times[0].start === null">Gesloten</p><p v-else class="is-inline-block">{{ store.times[0].start + " - " + store.times[0].end }}</p>
        </div>
        <div>
            <strong>Di: </strong><p class="is-inline-block" v-if="store.times[1].start === null">Gesloten</p><p v-else class="is-inline-block">{{ store.times[1].start + " - " + store.times[1].end }}</p>
        </div>
        <div>
            <strong>Wo: </strong><p class="is-inline-block" v-if="store.times[2].start === null">Gesloten</p><p v-else class="is-inline-block">{{ store.times[2].start + " - " + store.times[2].end }}</p>
        </div>
        <div>
            <strong>Do: </strong><p class="is-inline-block" v-if="store.times[3].start === null">Gesloten</p><p v-else class="is-inline-block">{{ store.times[3].start + " - " + store.times[3].end }}</p>
        </div>
        <div>
            <strong>Vr: </strong><p class="is-inline-block" v-if="store.times[4].start === null">Gesloten</p><p v-else class="is-inline-block">{{ store.times[4].start + " - " + store.times[4].end }}</p>
        </div>
        <div>
            <strong>Za: </strong><p class="is-inline-block" v-if="store.times[5].start === null">Gesloten</p><p v-else class="is-inline-block">{{ store.times[5].start + " - " + store.times[5].end }}</p>
        </div>
        <div>
            <strong>Zo: </strong><p class="is-inline-block" v-if="store.times[6].start === null">Gesloten</p><p v-else class="is-inline-block">{{ store.times[6].start + " - " + store.times[6].end }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "openingHours",
    data() {
        return {
            store: '' 
        }
    },  
    mounted() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

        this.$http.get(process.env.VUE_APP_API + '/stores/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(async response => {
            this.store = await response.data.store; 
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>
