import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    schedule_id: null,
    status_login: false,
    url: 'http://localhost:8080',
    user: {
      user_name: '',
      user_id: 0,
    },
    user_menu: []
  },

  mutations: {},
  actions: {},
  modules: {},
});
