export default {
    namespaced: true,
    state:{
        amountReports: 0
    },
    getters:{
        amountReports: state =>{
            return state.amountReports
        }
    },
    mutations:{
        decreaseAmountReports (state) {
            state.amountReports --
        },
        incrementAmountReports (state) {
            state.amountReports ++
        },
        SET_AMOUNT_REPORTS (state, number){
            state.amountReports = number
        }
    },
    actions:{
        updateAmountReports({ commit }, value){
            if(value)
                commit('incrementAmountReports')
            else
                commit('decreaseAmountReports')
        },
        setAmountReports({ commit}, value){
            commit('SET_AMOUNT_REPORTS',value)
        }
    }
}