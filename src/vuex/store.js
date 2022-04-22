import Vue from 'vue';
import Vuex from 'vuex';
import { getAllStrategies, getUserStrategy } from '../core/api';
import { STRATEGIES } from '../core/config';

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
        async GET_USER_STRATEGIES({commit}, obj) {
            const strategies = localStorage.getItem('userStrategies') ? JSON.parse(localStorage.getItem('userStrategies')) : [];
            if (typeof obj === 'object' && obj.strategy) {
                if (strategies.find(s => s.id === obj.strategy.id) === undefined) {
                    strategies.push(obj.strategy);
                    strategies[0].risk_factor = STRATEGIES[0].risk_factor;
                    strategies[0].apy = STRATEGIES[0].apy;
                    strategies[0].totalInvestment = STRATEGIES[0].totalInvestment;
                    strategies[0].portfolioShare = STRATEGIES[0].portfolioShare;
                    localStorage.setItem('userStrategies', JSON.stringify(strategies));
                    commit('SET_USER_STRATEGIES', strategies);
                }   
            } else if (typeof obj === 'object' && obj.account) {
                const userStrategy = await getUserStrategy(obj.account);
                if (userStrategy.length) {
                    userStrategy[0].risk_factor = STRATEGIES[0].risk_factor;
                    userStrategy[0].apy = STRATEGIES[0].apy;
                    userStrategy[0].totalInvestment = STRATEGIES[0].totalInvestment;
                    userStrategy[0].portfolioShare = STRATEGIES[0].portfolioShare;
                }
                commit('SET_USER_STRATEGIES', userStrategy);
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