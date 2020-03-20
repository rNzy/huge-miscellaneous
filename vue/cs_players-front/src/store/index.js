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
        team: "Dignitas"
      },
      {
        id: 1,
        name: "Olofmeister",
        image: require("@/assets/img/olofmeister.jpg"),
        team: "Faze"
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
