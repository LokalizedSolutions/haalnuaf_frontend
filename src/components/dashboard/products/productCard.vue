<template>
    <div class="column is-one-quarter">
        <div class="card equal-height">
            <!--image-->
            <div class="card-image">
                <figure class="image is-4by3">
                <img :src="'https://cdn.lokalized.nl/haalnuaf-images/' + img" alt="Placeholder image">
                </figure>
            </div>
            <!--content-->
            <div class="card-content">
                <div class="content">
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <h1 class="title is-4">{{ productTitle }}</h1>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <span class="tag is-primary">
                                    € {{ price }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p><strong>Beschrijving:</strong> {{ productDescription }}</p>
                    </div>
                    <div v-if="max === -1">
                        <p class="has-text-danger"><strong>Voorraad: </strong>Uitverkocht</p>
                    </div>
                    <div v-else-if="max === 0">
                        <p><strong>Voorraad: </strong>Oneindig</p>
                    </div>
                    <div v-else>
                        <p><strong>Voorraad: </strong>{{ max }}</p>
                    </div>
                </div>
            </div>
            <div class="button-box">
                <a>
                    <b-button type="is-white" icon-pack="fas" icon-right="pencil-alt" @click=edit()>
                        Bewerken
                    </b-button>
                    <b-button type="is-danger" icon-pack="fas" icon-right="trash-alt" @click=popUp() style="margin-left: 2%;">
                        Verwijderen
                    </b-button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "productCard",
    props: {
        productTitle: String,
        productDescription: String,
        price: Number,
        img: String,
        id: String,
        max: Number
    },
    methods: {
        edit() {
            this.$router.push({ path: "edit/" + this.id })
        },
        popUp() {
            this.$buefy.dialog.confirm({
                title: 'Product verwijderen',
                message: 'Bent u er zeker van dat u dit product wil <b>verwijderen</b>? Het verwijderen kan niet ongedaan gemaakt worden.',
                confirmText: 'Verwijder',
                type: 'is-danger',
                onConfirm: () => this.remove()
            })
        },
        remove() {
            this.date = Date.now();
            this.key = this.apiKey();

            this.$http.post(process.env.VUE_APP_API + "/products/" + this.id + "/delete", { key: this.key, time: this.date, id: localStorage.getItem('id') })
            // eslint-disable-next-line no-unused-vars
            .then(async response => {
                await localStorage.removeItem('products');
                this.$router.go();
            })
            .catch(error => {
                console.log(error.response.data);
            }) 
        }
    }
}
</script>
