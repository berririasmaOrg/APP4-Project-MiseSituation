<template>
  <div>
  <div>{{ quiz.name }}</div>
    <question-component v-for="(question, i) in quiz.questions" :key="question._id" :number="i"></question-component>
  </div>
</template>

<script>
import { getQuestionsByQuizId } from "../api-request"
import QuestionComponent from "../components/Question"

export default {
  name: "GamePage",

  components: {
    QuestionComponent,
  },

  data: () => ({
    quiz: null,
  }),

  async mounted() {
    this.quiz = await getQuestionsByQuizId("64636437d9f80cd04712ec8c");
  }
}
</script>

<style scoped>

</style>