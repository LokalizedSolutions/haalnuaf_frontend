<template>
    <b-navbar wrapper-class="container" spaced shadow fixed-top>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/s/' + id }">
                <img
                    class="image is-32x32" src="https://cdn.lokalized.nl/haalnuaf-images/logo"
                >
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-item tag="div">
            <div class="buttons">
                <b-button tag="router-link" :to="{ path: '/s/' + id + '/cart' }" class="button is-primary" icon-right="shopping-cart" icon-pack="fas">
                    Uw winkelmand € {{ totalPrice }}
                </b-button>
            </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: "storeNav",
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        totalPrice() {
            let total = 0;

            for (let item of this.$store.state.cart) {
                total += item.totalPrice;
            }

            return total.toFixed(2);
        }
    }
}
</script>
