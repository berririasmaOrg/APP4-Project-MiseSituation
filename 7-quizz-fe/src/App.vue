<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        
      </div>

    </v-app-bar>

    <v-main>
      <div id="app">
        <v-app>
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
        </v-app>
    </div>
      <!--<createQuizz class="ma-4" v-model="quizzID"></createQuizz>
      <v-btn color="primary" @click="q = true">+</v-btn>

      <createQuestion :questForm="q" :quizzID="quizzID"></createQuestion>-->

      <!--<credentials></credentials>-->

      <!--<v-btn color="primary" @click="">Créer Quizz</v-btn>-->
      <!--<v-form>
        <question v-for="(q, i) in questions" class="ma-4" :key="i" :number="i" :question="q" :corrected="corrected" />
        <v-btn color="primary" @click="correct = true">Valider</v-btn>
      </v-form>-->

    </v-main>
  </v-app>
</template>

<script>
//import Question from './components/Question';
//import credentials from './components/credentials.vue';
import createQuizz from './components/createQuizz.vue';
//import createQuestion from './components/createQuestion.vue';
//import {getAllQuiz} from "./api-request"
import Quizz from "./components/Quizz.vue";
import { getAllQuiz } from "./api-request"

export default {
  name: 'App',

  created() {
    this.getQuizz();
  },

  components: {
    //Question,
    //credentials,
    createQuizz,
    //createQuestion,
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
    /*questions: [{
      text: "Comment je m'appelle ?",
      answers: [{
        answer: "Dimitri",
        correct: false
      },{
        answer: "Antoine",
        correct: true
      },{
        answer: "Mamady",
        correct: false
      },{
        answer: "Abdré",
        correct: false
      },]
    },{
      text: "Quel est mon âge ?",
      answers: [{
        answer: "20",
        correct: false
      },{
        answer: "21",
        correct: true
      },{
        answer: "22",
        correct: false
      },{
        answer: "23",
        correct: false
      },]
    },{
      text: "Quel est mon plat préféré ?",
      answers: [{
        answer: "Pizza",
        correct: true
      },{
        answer: "Pâte",
        correct: false
      },{
        answer: "Poulet",
        correct: false
      },{
        answer: "Riz",
        correct: false
      },]
    }]*/
  }),

  computed: {
    corrected() {
      return this.correct
    }
  },

};
</script>
