<template>
  <div>
    <v-card>
      <v-card-title>
        <h3>{{ `Question #${number}` }}</h3>
      </v-card-title>
      <v-card-text>
        <p>{{ question.question }}</p>
        <v-checkbox
            :disabled="disable"
          v-model="response"
          v-for="(answer, i) in question.answers"
          :key="i"
          :label="answer.answer"
          :value="answer.answer"
        ></v-checkbox>
      </v-card-text>
    </v-card>
    <slot name="correction" class="flex-shrink-1"></slot>
  </div>
</template>

<script>
export default {
  name: "QuestionComponent",

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
    question: {
      type: Object,
      required: true,
    },
  },

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
