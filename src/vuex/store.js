import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAuthorised: localStorage.getItem('isAuthorised') ? !!localStorage.getItem('isAuthorised') : false,
    },
    mutations: {
        SET_isAUTHORISED(state, isAuthorised) {
            state.isAuthorised = isAuthorised;
        },
    },
    actions: {
        GET_isAUTHORISED({commit}, isAuthorised) {
            localStorage.setItem('isAuthorised', true);
            commit('SET_isAUTHORISED', isAuthorised);
        },
    },
    getters: {
        isAUTHORISED(state) {
            return state.isAuthorised;
        }
    }
});

export default store;