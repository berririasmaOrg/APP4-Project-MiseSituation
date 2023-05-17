<template>
  <div>
    <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
      <v-tabs-slider color="purple darken-4"></v-tabs-slider>
      <v-tab v-for="(c, i) in tabs" :key="i">
        <v-icon large>{{ c.icon }}</v-icon>
        <div class="caption py-1">{{ c.name }}</div>
      </v-tab>
      <v-tab-item>
        <v-card class="px-4">
          <v-card-text>
            <v-form>
              <quizz v-for="(q, i) in quizzList" class="ma-4" :key="i" :number="i" :quizz="q" :questForm="true"/>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="px-4">
          <v-card-text>
            <createQuizz class="ma-4" v-model="quizzID"></createQuizz>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import createQuizz from '../components/createQuizz.vue';
import Quizz from "../components/Quizz.vue";
import { getAllQuiz } from "../api-request";

export default {
  name: "QuizCreationPage",

  created() {
    this.getQuizz();
  },

  components: {
    createQuizz,
    Quizz
  },

  methods: {
    async getQuizz() {
      this.quizzList = await getAllQuiz();
      console.log(this.quizzList);
    },
  },

  data: () => ({
    correct: false,
    q: false,
    quizzID: 0,
    tab: 0,
    tabs: [
      {name:"Liste des quiz", icon:"mdi-account"},
      {name:"Créer / Modifier un quiz", icon:"mdi-account-outline"}
    ],
    quizzList: [],
  })
}
</script>

<style scoped>

</style>