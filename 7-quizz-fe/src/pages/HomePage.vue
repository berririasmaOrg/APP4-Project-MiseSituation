<template>
  <div>
    <div>Page d'accueil</div>
    <v-btn @click="toGame()">Historique</v-btn>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  methods: {
    toHistory() {
      this.$router.push({path: '/history'})
    },
    toGame() {
      this.$router.push({path: '/game'})
    }
  }
}
</script>

<style scoped>

</style>