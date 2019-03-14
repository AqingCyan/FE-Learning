import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getter'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)
const state = {
    isAuthenticated: false
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})