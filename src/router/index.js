import {createRouter, createWebHistory} from 'vue-router'
import InfoPage from '../views/InfoPage'
import HomePage from '../views/HomePage'
import MainSortContinents from '../views/MainSortedPage'

const routes = [
    {
        path: '/info/:countryName',
        name: 'InfoPage',
        component: InfoPage
    },
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/main/:continentSelected',
        name: 'MainSortedPage',
        component: MainSortContinents
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;