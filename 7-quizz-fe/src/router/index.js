import Vue from "vue"
import VueRouter from "vue-router"

import HomePage from "../pages/HomePage"
import GamePage from "../pages/GamePage"
import GameHistoryPage from "../pages/GameHistoryPage"
import QuizCreationPage from "../pages/QuizCreationPage"
import QuizEditPage from "../pages/QuizEditPage"
import QuizRankingPage from "../pages/QuizRankingPage"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
        name: 'Accueil',
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/game',
        name: 'Partie',
        component: GamePage
    },
    {
        path: '/history',
        name: 'Historique',
        component: GameHistoryPage
    },
    {
        path: '/create',
        name: 'Création de quiz',
        component: QuizCreationPage
    },
    {
        path: '/edit',
        name: 'Modification de quiz',
        component: QuizEditPage
    },
    {
        path: '/ranking',
        name: 'Classement',
        component: QuizRankingPage
    }
]

export default new VueRouter({
    mode: 'history',
    routes,
});