<template>
  <div class="container">
    <h1 class="is-size-1">Welcome to CS Players !</h1>
    <h2 class="is-size-2">Players</h2>
    <PlayerList v-for="player in players" :key="player.id" :player="player"></PlayerList>
  </div>
</template>

<script>
import PlayerList from "../components/PlayerList.vue";
import { mapState } from "vuex";
export default {
  name: "SinglePage",
  components: { PlayerList },

  computed: mapState(["players"])
};
</script>