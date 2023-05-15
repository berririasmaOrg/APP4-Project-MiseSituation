<template>
  <div>
  <v-card>
      <v-card-title>
      <h3>{{ `Question #${number}` }}</h3>
      </v-card-title>
      <v-card-text>
      <p>{{ question.text }}</p>
      <v-radio-group required v-model="val" :disabled="corrected">
        <v-radio v-for="(answer, i) in question.answers" :key="i" :label="answer.answer" :value="answer.answer"></v-radio>
      </v-radio-group>
      </v-card-text>
  </v-card>
      <div v-if=corrected>
        <span v-if="check()" style="color: green">Bravo!</span>
        <span v-else style="color: red">Too bad! La bonne réponse était {{ question.answers.find(a => a.correct).answer }}</span>
      </div></div>
</template>

<script>
export default {
name: 'QuestionComponent',

props: {
  number: {
    type: Number,
    required: true,
  },
  question: {
    type: Object,
    required: true,
  },
  corrected: {
    type: Boolean,
    default: false,
  },
},
data: () => ({
  hey: 'Hello World',
  val: false,
}),

methods: {
  check() {
    return this.question.answers.find(a => a.answer === this.val).correct
  }
},

};
</script>

<style></style>