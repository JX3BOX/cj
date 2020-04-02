<template>
    <main class="c-main m-cj-index">
        <Sidebar :general="1"/>
        <Info/>
    </main>
</template>

<script>
    import Sidebar from '@/components/Sidebar.vue';
    import Info from '@/components/Info.vue';

    const axios = require("axios");

    export default {
        name: 'Home',
        props: [],
        data: function () {
            return {
                achievements: null,
            }
        },
        computed: {},
        methods: {
        },
        mounted: function () {
        },
        components: {
            Info,
            Sidebar
        }
    }
</script>