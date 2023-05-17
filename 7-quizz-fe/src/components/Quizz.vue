<template>
    <div>
      <v-card>
        <v-card-title>
          <h3>{{ `Quiz #${number} ` }}: {{ quizz.quizName }}</h3>
        </v-card-title>
        <v-card-text>
            <div v-if=questForm>
                <v-btn color="primary">Jouer</v-btn>
            </div>
            <div v-if=!questForm>
                <v-btn color="primary" @click="question = true">Ajouter question</v-btn>
                <v-dialog v-model="question">
                    <createQuestion v-model="question" :quizzID="quizz._id"></createQuestion>
                </v-dialog>
            </div>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  import createQuestion from '../components/createQuestion.vue';

  export default {
    name: "QuizzComponent",

    components: {
        createQuestion,
    },

    methods: {
        closeWindow() {
            this.$emit("close");
        },
    },
  
    props: {
      value: {
        default: () => [],
      },
      disable: {
        type: Boolean,
        default: false,
      },
      number: {
        type: Number,
        required: true,
      },
      quizz: {
        type: Object,
        required: true,
      },
      questForm: {
          type: Boolean,
          default: false,
      }
    },

    data: () => ({
        question: false,
    }),
  
    computed: {
      response: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit("input", value);
        },
      },
    }
  };
  </script>
  
  <style></style>
