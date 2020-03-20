<template>
  <div id="players">
    <div class="columns">
      <div class="column">
        <img :src="player.image" />
      </div>
      <div class="column">
        <p>Name : {{ player.name }}</p>
        <p>Team : {{ player.team }}</p>
        <p>Age : {{ new Date().getFullYear() - player.birth_year }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerList",
  props: ["player", "data"]
};
</script>