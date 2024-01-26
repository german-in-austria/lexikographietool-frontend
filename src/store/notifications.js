export default {
    namespaced: true,
    state:{
        notifications: null
    },
    getters:{
        notifications: state =>{
            return state.notifications
        }
    },
    mutations:{
        SET_NOTIFICATIONS (state, notifications){
            state.notifications = notifications
        }
    },
    actions:{
        setNotifications({ commit}, value){
            commit('SET_NOTIFICATIONS',value)
        }
    }
}