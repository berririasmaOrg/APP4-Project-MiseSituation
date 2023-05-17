<template>
  <div>
    <div>Page d'accueil</div>
    <v-btn @click="toHistory()">Historique</v-btn>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  methods: {
    toHistory() {
      this.$router.push({path: '/history'})
    }
  }
}
</script>

<style scoped>

</style>