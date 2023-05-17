<template>
  <div v-if="quiz">
    <h1 class="ma-3">{{ quizInfo.quizName }}</h1>
    <div v-if="corrected" class="text-center font-weight-bold">Votre score et de {{ `${correction.filter(a => a).length}/${correction.length}` }}</div>
    <question-component
        :disable="corrected"
        class="ma-5"
        v-model="selected[i]"
        v-for="(question, i) in quiz.questions"
        :key="question._id"
        :question="question"
        :number="i">
      <template v-slot:correction v-if="corrected">
        <span v-if="correction[i]" class="mx-5 green--text">Bravo! C'est la bonne réponse.</span>
        <span v-else class="mx-5 red--text">Dommage! La bonne réponse était: {{ question.answers.filter(a => a.correct).map(a => a.answer) }}</span>
      </template>
    </question-component>
    <div class="d-flex flex-row">
      <v-spacer></v-spacer>
      <v-btn v-if="!corrected" class="primary mx-5" @click="corriger()" :disabled="!isComplete">Valider</v-btn>
      <v-btn v-else class="primary mx-5">Enregistrer</v-btn>
    </div>
  </div>
</template>

<script>
import QuestionComponent from "../components/Question"
import { mapState } from "vuex"

export default {
  name: "GamePage",

  components: {
    QuestionComponent,
  },

  data: () => ({
    corrected: false,
    selected: [[]],
    correction: [],
  }),

  computed: {
    ...mapState({
      quizInfo: state => state.currentQuizInfo,
      quiz: state => state.currentQuizData,
    }),
    isComplete() {
      return this.selected.length === this.quiz.questions.length
    }
  },

  methods: {
    compareTable(tab1, tab2) {
      if(tab1.length !== tab2.length) return false;
      return tab1.every(e => tab2.includes(e));
    },
    corriger() {
      for(const i in this.selected) {
        const val = this.quiz.questions[i].answers.filter(a => a.correct).map(a => a.answer);
        this.correction.push(this.compareTable(val, this.selected[i]))
      }
      this.corrected = true;
    }
  },
}
</script>

<style scoped>

</style>