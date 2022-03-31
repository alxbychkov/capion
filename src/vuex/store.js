import Vue from 'vue';
import Vuex from 'vuex';
import { getAllStrategies } from '../core/api';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        allStrategies: [],
        userStrategies: [],
        isAuthorised: localStorage.getItem('isMetamaskConnected') ? !!localStorage.getItem('isMetamaskConnected') : false,
        userAccount: ''
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
        },

        SET_USER_ACCOUNT(state, account) {
            state.userAccount = account;
        },
    },
    actions: {
        GET_isAUTHORISED({commit}, isAuthorised) {
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
        },
        GET_USER_ACCOUNT({commit}, account) {
            commit('SET_USER_ACCOUNT', account);
        },
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
        },
        USER_ACCOUNT(state) {
            return state.userAccount;
        },
    }
});

export default store;