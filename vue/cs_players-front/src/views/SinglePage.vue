<template>
  <div class="container">
    <h1 class="is-size-1">Welcome to CS Players ! {{ version }}</h1>
    <h2 class="is-size-2">Players</h2>
  </div>
</template>

<script>
export default {
  name: "SinglePage",
  props: {
    version: String
  }
};
</script>

<style lang="sass"></style>