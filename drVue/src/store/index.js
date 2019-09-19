import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        userName: sessionStorage.getItem('userName')
    },
    mutations:{

    },
    getters:{}
})