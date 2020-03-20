<template>
  <div id="app">
    <Nav />
    <SinglePage version="v0.1.0" />
  </div>
</template>

<script>
import SinglePage from "./views/SinglePage.vue";

export default {
  name: "App",
  components: {
    SinglePage
  }
};
</script>

<style lang="sass">
@import "bulma"

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>

