<template>
    <div>
        <storeNav/>
        <hero :title="store.company" :description="store.story" :img="store.banner"/>
        <div class="container" style="margin-top: 2vh;">
            <div class="columns reverse-columns">
                <div class="column is-three-quarters">
                    <products/>
                </div>
                <div class="column is-one-quarter">
                    <sidebar/>
                </div>
            </div>
        </div>
        <foot/>
    </div>
</template>

<script>
import storeNav from './store_nav.vue'
import hero from './hero.vue'
import products from './front/products.vue'
import sidebar from './front/sidebar.vue'
import foot from './footer.vue'

export default {
    name: "storefront",
    data() {
        return {
            store: Object
        }
    },
    components: {
        storeNav,
        hero,
        products,
        sidebar,
        foot
    },
    async created() {
        this.date = Date.now(); 
        const crypto = require('crypto');
        this.key = encodeURIComponent(crypto.createHash('sha256').update(this.date + "---" + process.env.VUE_APP_SALT).digest('base64'));

        await this.$http.get(process.env.VUE_APP_API + '/stores/' + this.$route.params.id, { params: { key: this.key, time: this.date }})
        .then(async response => {
            this.store = await response.data.store; 
        })
        .catch(error => {
            if(error.response.data.status === 404) {
                this.$router.push('/404');
            } else {
                this.$router.push('/404');
            }
        })
    }
}
</script>
