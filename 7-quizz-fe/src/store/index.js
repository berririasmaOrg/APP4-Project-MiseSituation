import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: {},
        currentGame: {},
        currentQuizInfo: {},
        currentQuizData: {},
    },

    mutations: {
        SET_USER(state, payload) {
            state.currentUser = payload;
        },
        SET_GAME(state, payload) {
            state.currentGame = payload;
        },
        SET_QUIZ_INFO(state, payload) {
            state.currentQuizInfo = payload;
        },
        SET_QUIZ_DATA(state, payload) {
            state.currentQuizData = payload;
        }
    },

    actions: {
        setUser({commit}, user) {
            commit("SET_USER", user);
        },
        setGame({commit}, game) {
            commit("SET_Game", game);
        },
        setQuizInfo({commit}, quiz) {
            commit("SET_QUIZ_INFO", quiz);
        },
        setQuizData({commit}, quiz) {
            commit("SET_QUIZ_DATA", quiz);
        }
    }
})