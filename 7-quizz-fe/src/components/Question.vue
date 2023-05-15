<template>
    <v-card>
        <v-card-title>
        <h3>{{ `Question #${number}` }}</h3>
        </v-card-title>
        <v-card-text>
        <p>{{ question.body }}</p>
        </v-card-text>
    </v-card>
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
  },
  data: () => ({
    hey: 'Hello World',
  }),
};
</script>

<style></style>