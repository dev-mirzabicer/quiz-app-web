<template>
  <div class="student">
    <div class="student__header">
      <h1>{{ student.name + "'s Quizzes" }}</h1>
    </div>
    <div class="student-quiz-card" v-for:="quiz in quizzes" :key="quiz._id">
      <div class="student-quiz-card__header">
        <h3 @click="goToQuiz(quiz._id)">{{ quiz.quiz.title }}</h3>
      </div>
      <div class="student-quiz-card__content">
        <p>Score:
          <span :class="getScoreClass(quiz.score)">
            {{ quiz.score > -1 ? quiz.score : "Not evaluated" }}
          </span>
        </p>
      </div>
      <div class="student-quiz-card__content">
        <button class="btn" @click="goToQuiz(quiz._id)">View Results</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentView",
  data() {
    return {
      student: {},
      quizzes: [],
    };
  },
  created() {
    this.getStudent();
    this.getQuizzes();
  },
  methods: {
    getStudent() {
      axios.get("https://quiz-app-web-seven.vercel.app/api/v0.0.1/user/student/" + this.$route.params.id, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("authToken")}`
        }
      }).then(response => {
        this.student = response.data.data.user;
      }).catch(e => {
        alert(e.response.data.message || "Internal Server Error");
      });
    },
    getQuizzes() {
      axios.get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/?userId=${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("authToken")}`
        }
      }).then(response => {
        this.quizzes = response.data.data.solvedQuizzes;
      }).catch(e => {
        alert(e.response.data.message || "Internal Server Error");
      });
    },
    goToQuiz(id) {
      this.$router.push(`/students/${this.$route.params.id}/quiz/${id}`);
    },
    getScoreClass(score) {
      if (score < 0) return "unknown";
      if (score < 50) return "fail";
      if (score < 75) return "pass";
      return "good";
    },
  }
}
</script>

<style>
.student {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

.student-quiz-card {
  background-color: #FCFFEB;
  display: flex;
  flex-direction: column;
  width: 35%;
  overflow: hidden;
  border-radius: .5em;
  text-decoration: none;
  margin: 1em;
}

.student-quiz-card__content {
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
}

.student-quiz-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #474350;
  color: #FCFFEB;
}

.student-quiz-card__header h3 {
  cursor: pointer;
}

.student-quiz-card__header:hover {
  color: #779CAB;
}
</style>