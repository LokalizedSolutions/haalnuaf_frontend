<template>
    <div class="content">
        <h1 class="title is-4">Openingstijden</h1>
        <div>
            <strong>Ma: </strong>{{ store.times[0] ? store.times[0].start + " - " + store.times[0].end : "gesloten" }}
        </div>
        <div>
            <strong>Di: </strong>{{ store.times[1] ? store.times[1].start + " - " + store.times[1].end : "gesloten" }}
        </div>
        <div>
            <strong>Wo: </strong>{{ store.times[2] ? store.times[2].start + " - " + store.times[2].end : "gesloten" }}
        </div>
        <div>
            <strong>Do: </strong>{{ store.times[3] ? store.times[3].start + " - " + store.times[3].end : "gesloten"}}
        </div>
        <div>
            <strong>Vr: </strong>{{ store.times[4] ? store.times[4].start + " - " + store.times[4].end : "gesloten" }}
        </div>
        <div>
            <strong>Za: </strong>{{ store.times[5] ? store.times[5].start + " - " + store.times[5].end : "gesloten" }}
        </div>
        <div>
            <strong>Zo: </strong>{{ store.times[6] ? store.times[6].start + " - " + store.times[6].end : "gesloten" }}
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
