<template>
  <div class="quizzes">
    <div class="quiz-card" v-for:="quiz in quizzes" :key="quiz._id">
      <div class="quiz-card__header">
        <h3>{{ quiz.title }}</h3>
      </div>
      <div class="quiz-card__content">
        <p>Questions: {{ quiz.questionNum }}</p>
      </div>
      <div class="quiz-card__content">
        <button class="btn" @click="goToQuiz(quiz)">
          <span v-if="quiz.isPublished">Preview Quiz</span>
          <span v-else>Edit Quiz</span>
        </button>
      </div>
    </div>
    <button v-if="isAdmin()" class="btn" @click="addQuiz">Add Quiz</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    quizzes: {
      type: Object,
      required: true,
    },
    goToQuiz: {
      type: Function,
      required: true,
    },
  },
  methods: {
    isAdmin() {
      return (localStorage.getItem("role") === "admin");
    },
    addQuiz() {
      axios.post(
        "http://localhost:7272/api/v0.0.1/quiz/",
        {
          title: "Untitled Quiz",
          isPublished: false,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        }
      ).then((response) => {
        this.goToQuiz(response.data.data.quiz);
      }).catch((e) => {
        alert(e.response.data.message || "Internal Server Error");
      });
    }
  }
}
</script>