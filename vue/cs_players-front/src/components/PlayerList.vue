<template>
  <div id="players">
    <div class="columns">
      <div class="column">
        <img :src="player.image" />
      </div>
      <div class="column">
        <p>{{ player.name }}</p>
        <p>{{ player.team }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerList",
  props: ["player"]
};
</script>