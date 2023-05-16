<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <question :disable="correction.length === questions.length"
        v-for="(question, i) in questions"
        v-model="values[i]"
        class="ma-4"
        :key="i"
        :number="i"
        :question="question"
      >
        <template v-slot:correction v-if="correct">
          <span v-if="correction[i]" class="green--text">Bravo! C'est la bonne réponse</span>
          <span v-else class="red--text">Dommage! La bonne réponse était {{ correctAnswers(question) }}</span>
        </template>
      </question>
      <div class="d-flex flex-row mx-4">
        <v-spacer></v-spacer>
      <v-btn v-show="!correct" class="primary" @click="correctQuizz()" :disabled="!values.every(v => v.length > 0)">Valider</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Question from './components/Question';
import credentials from './components/credentials.vue';

export default {
  name: "App",

  components: {
    Question,
    credentials,
  },

  data: () => ({
    correct: false,
    hey: 'Hello World',
    questions: [{
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
    }],
    values: [[]],
    correction: []
  }),

  methods: {
    isCorrect(answers, selected) {
      if (answers.length !== selected.length) return false;
      for (const choice of selected)
        if (!answers.includes(choice)) return false;
      return true;
    },

    correctAnswers(question) {
      return question.answers.filter((a) => a.correct).map((a) => a.answer);
    },

    correctQuizz() {
      for (const i in this.values) {
        this.correction.push(
          this.isCorrect(this.correctAnswers(this.questions[i]), this.values[i])
        );
      }
      this.correct=true;
    },
  },

};
</script>
