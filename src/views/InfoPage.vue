<template>
    <body>
        <InfoCollection></InfoCollection>
        <h5><router-link to="/">Go Back</router-link></h5>
    </body>
</template>


<script>
import InfoCollection from '../components/InfoCollection.vue'
export default {
    name: 'InfoPage',
    components: {
        InfoCollection,
    }
}
</script>
<style scoped>
h5 {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-left: 55px;
}
</style>