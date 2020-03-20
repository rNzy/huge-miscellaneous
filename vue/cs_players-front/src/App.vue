<template>
  <div id="app">
    <router-view v-if="loaded" />
    <div v-else>
      <progress :value="loadingPercentage" max="100" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data: function() {
    return {
      loaded: false,
      loadingPercentage: 0
    };
  },
  mounted() {
    axios.get("http://localhost:5000/players").then(response => {
      this.data = response.data;
      this.dataLength = this.data.meta.count;

      for (let i = 0; i < this.dataLength; i++) {
        this.loadingPercentage = (i * 100) / (this.dataLength - 1);
      }
      this.loaded = true;
    });
  }
};
</script>

<style lang="sass">
@import "bulma"

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

h1
  text-align: center

h2
  text-align: left
</style>

