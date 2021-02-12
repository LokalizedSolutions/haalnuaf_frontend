<template>
    <div class="column is-one-third">
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
                                <span class="tag is-light">
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
                <b-button type="is-primary" icon-pack="fas" icon-right="shopping-cart" @click=edit()>
                    Toevoegen
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "productCard",
    props: {
        productDescription: String,
        productTitle: String,
        price: Number,
        img: String,
        max: Number
    }
}
</script>
