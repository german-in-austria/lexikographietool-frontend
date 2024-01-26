import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import reports from './reports'
import notifications from './notifications'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{

    },
    mutations:{

    },
    actions:{

    },
    modules:{
        auth,
        reports,
        notifications,
    },


})