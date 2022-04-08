<template>
    <div class="business_box f_d_a_i">
        <Header :curIndex="2" />
        <div>

        </div>
		<Footer msg="Welcome to Your Vue.js App" />
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "securities",
    data() {
        return {};
    },
    components: {
        Header,
        Footer
    },
    methods: {},
};
</script>
<style lang="scss" scope>
    
</style>