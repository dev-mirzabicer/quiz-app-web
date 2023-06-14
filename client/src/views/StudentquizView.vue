<template>
  <div class="quiz">
    <div class="quiz__header">
      <h2>{{ quiz.quiz.title }}</h2>
    </div>
    <div class="question" v-for="(answeredQuestion, index) in quiz.answers" :key="answeredQuestion._id">
      <div class="question__title">
        <h2>{{ index + 1 }}) {{ answeredQuestion.question.title }}</h2>
      </div>
      <div class="question__answers">
        <div v-for="(answer, index) in answeredQuestion.question.answers"
          :class="(answer.correct ? 'correct' : (answer._id === answeredQuestion.answer._id) ? 'incorrect' : 'empty') + ' question__answer'"
          :key="answer._id">
          <h3 class="choice">{{ alphabet[index] }})&nbsp;</h3>
          <h3 class="answer">{{ answer.title }}</h3>
        </div>
      </div>
    </div>
    <div class="quiz__score">
      <h2>{{ quiz.user.name }}'s score: {{ this.quiz.score }}/100</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentquizView",
  data() {
    return {
      quiz: {},
      questions: [],
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    }
  },
  async created() {
    await this.getQuiz();
  },
  methods: {
    async getQuiz() {
      try {
        this.quiz = (await axios.get(`http://localhost:7272/api/v0.0.1/solved-quiz/${this.$route.params.quizId}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        })).data.data.solvedQuiz;
      } catch (e) {
        alert(e.response.data.message || "Internal Server Error");
      }
    },
  }
}
</script>
