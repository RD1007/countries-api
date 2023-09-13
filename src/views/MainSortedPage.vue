<template>
    <body>
        <SortContinents></SortContinents>
        <h5><router-link to="/">Go Back</router-link></h5>
    </body>
</template>


<script>
import SortContinents from '../components/SortContinents.vue'
export default {
    name: 'MainSortContinents',
    components: {
        SortContinents,
    }
}
</script>
<style scoped>
h5 {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-left: 45px;
}
</style>