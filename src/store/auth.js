import RequestHandler from "@/utils/RequestHandler";
import axios from "axios";


export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        isSuperUser(state) {
            return state.token && state.user?.is_superuser
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, user) {

            state.user = user

        },


    },
    actions: {
        async setUser({commit}, user) {

            commit('SET_USER', user)
        },
        async signIn({dispatch}, register) {
            let response = await RequestHandler.login(register)
            await dispatch('attempt', response.data.token)
        },
        async register({dispatch}, register) {
            let response = await RequestHandler.register(register)
            dispatch('attempt', response.data.token)
        },
        signOut({commit}) {
            commit('SET_USER', null)
            commit('SET_TOKEN', null)
        },
        async attempt({commit, state}, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }
            if(!state.token) {
                return
            }
            try {
                let response = await axios.get('account/me/')

                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
            }
        }
    },
}