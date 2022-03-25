import Vue from 'vue';
import Vuex from 'vuex';
import { getAllStrategies } from '../core/api';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        allStrategies: [],
        userStrategies: [],
        isAuthorised: localStorage.getItem('isAuthorised') ? !!localStorage.getItem('isAuthorised') : false,
    },
    mutations: {
        SET_isAUTHORISED(state, isAuthorised) {
            state.isAuthorised = isAuthorised;
        },
        SET_USER_STRATEGIES(state, strategies) {
            state.userStrategies = [...strategies];
        },
        SET_ALL_STRATEGIES(state, strategies) {
            state.allStrategies = [...strategies];
        }
    },
    actions: {
        GET_isAUTHORISED({commit}, isAuthorised) {
            localStorage.setItem('isAuthorised', true);
            commit('SET_isAUTHORISED', isAuthorised);
        },
        GET_USER_STRATEGIES({commit}, strategy) {
            const strategies = localStorage.getItem('userStrategies') ? JSON.parse(localStorage.getItem('userStrategies')) : [];
            if (strategy) {
                if (strategies.find(s => s.id === strategy.id) === undefined) {
                    strategies.push(strategy);
                    localStorage.setItem('userStrategies', JSON.stringify(strategies));
                    commit('SET_USER_STRATEGIES', strategies);
                }
                    
            } else {
                commit('SET_USER_STRATEGIES', strategies);
                return strategies;
            }
        },
        async GET_ALL_STRATEGIES({commit}) {
            const strategies = await getAllStrategies();
            commit('SET_ALL_STRATEGIES', strategies);
            return strategies;
        }
    },
    getters: {
        isAUTHORISED(state) {
            return state.isAuthorised;
        },
        USER_STRATEGIES(state) {
            return state.userStrategies;
        },
        ALL_STRATEGIES(state) {
            return state.allStrategies;
        }
    }
});

export default store;