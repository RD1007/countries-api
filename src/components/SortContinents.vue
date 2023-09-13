<template>
    <body>
        <div class="header">
            <h1>{{this.$route.params.continentSelected}}</h1>
        </div>
        <div>
            <h3>
                <ul>
                    <div class="links">
                        <li v-for="(item, index) in sortedNames" :key="index">
                            <router-link :to="`/info/${encodeURIComponent(item)}`">{{ item }}</router-link>
                        </li>
                    </div>
                </ul>
            </h3>
        </div>
    </body>
</template>

<script>
export default {
    name: 'SortContinents',
    data(){
        return {
            countryNames: [],
        }
    },
    mounted() {
        this.getCountryNameList();
    },
    methods: {
        getCountryNameList() {
            fetch(`https://restcountries.com/v3.1/region/${this.$route.params.continentSelected}`)
            .then(response => response.json())
            .then(data => {
                this.countryNames = data.map(item => item.name.common);
            });
        },
    },
    computed: {
        sortedNames() {
        return this.countryNames.slice().sort((a, b) => {
            const nameA = a.toLowerCase();
            const nameB = b.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return b.length - a.length;
            });
        }
    },
}
</script>
<style scoped>
.header {
    margin-left: 45px;
}
ul {
    list-style-type: none;
    color: inherit;
    text-decoration: none;
    cursor: text;
    display: block;
}
</style>