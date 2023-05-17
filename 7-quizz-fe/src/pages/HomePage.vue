<template>
  <div class="text-center">
    <h1 class="text-center">Bienvenue dans 7Quizz</h1>
    <div><v-btn @click="$router.push({path: '/create'})">Voir les quiz</v-btn></div>
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