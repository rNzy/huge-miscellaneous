import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [
      {
        id: 0,
        name: "GeT_RiGhT",
        image: require("@/assets/img/get_right.jpg"),
        team: "Dignitas",
        birth_year: 1990
      },
      {
        id: 1,
        name: "Olofmeister",
        image: require("@/assets/img/olofmeister.jpg"),
        team: "Faze",
        birth_year: 1992
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    playerById: state => id => {
      const filtered = state.players.filter(p => p.id === id);
      return filtered.length > 0 ? filtered[0] : state.players[0];
    }
  }
});
