import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [
      {
        id: 0,
        name: "GeT_RiGhT",
        image: "../assets/img/get-right.jpg"
      },
      {
        id: 1,
        name: "Olofmeister",
        image: "../assets/img/olofmeister.jpg"
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
