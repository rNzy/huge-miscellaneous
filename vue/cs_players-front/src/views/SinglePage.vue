<template>
  <div class="container">
    <h1 class="is-size-1">Welcome to CS Players !</h1>
    <h2 class="is-size-2">Players</h2>
    <PlayerList v-for="player in players" :key="player.id" :player="player"></PlayerList>
  </div>
</template>

<script>
import PlayerList from "../components/PlayerList.vue";
export default {
  name: "SinglePage",
  components: { PlayerList },
  computed: {
    players() {
      return this.$store.state.players;
    }
  }
};
</script>