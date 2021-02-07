<template>
    <div class="column is-one-quarter">
        <div class="card equal-height">
            <!--image-->
            <div class="card-image">
                <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
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
                    <p>{{ productDescription }}</p>
                </div>
            </div>
            <div class="button-box">
                <a>
                    <b-button type="is-white" icon-pack="fas" icon-right="pencil-alt">
                        Bewerken
                    </b-button>
                    <b-button type="is-danger" icon-pack="fas" icon-right="trash-alt" style="margin-left: 2%;">
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
        price: String
    }
}
</script>
