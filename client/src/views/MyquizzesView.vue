<template>
  <div class="my-quizzes">
    <div class="my-quiz-card" v-for:="quiz in quizzes" :key="quiz._id">
      <div class="my-quiz-card__header">
        <h3 @click="goToQuiz(quiz)">{{ quiz.quiz.title }}</h3>
      </div>
      <div class="my-quiz-card__content">
        <p>Score:
          <span :class="getScoreClass(quiz.score)">
            {{ quiz.score > -1 ? quiz.score : "Not evaluated" }}
          </span>
        </p>
        <p :class="quiz.isComplete ? 'complete' : 'incomplete'">
          {{ quiz.isComplete ? "Complete" : "Incomplete" }}
        </p>
      </div>
      <div class="my-quiz-card__content" v-if="!quiz.isComplete">
        <button class="btn" @click="goToQuiz(quiz)">Continue Quiz</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyquizzesView",
  data() {
    return {
      quizzes: [],
    };
  },
  beforeMount() {
    if (localStorage.getItem("role" !== "student")) {
      this.$router.push("/");
    }
    this.getQuizzes();
  },
  methods: {
    getQuizzes() {
      axios
        .get("https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/my", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          this.quizzes = response.data.data.solvedQuizzes;
        })
        .catch((e) => {
          alert(e.response.data.message || "Internal Server Error");
        });
    },
    getScoreClass(score) {
      if (score < 0) return "unknown";
      if (score < 50) return "fail";
      if (score < 75) return "pass";
      return "good";
    },
    goToQuiz(quiz) {
      return this.$router.push("/my-quizzes/" + quiz._id);
    },
  }
}
</script>

<style>
.my-quizzes {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

.my-quiz-card {
  background-color: #FCFFEB;
  display: flex;
  flex-direction: column;
  width: 35%;
  overflow: hidden;
  border-radius: .5em;
  text-decoration: none;
  margin: 1em;
}

.my-quiz-card__content {
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
}

.my-quiz-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #474350;
  color: #FCFFEB;
}

.my-quiz-card__header h3 {
  cursor: pointer;
}

.my-quiz-card__header:hover {
  color: #779CAB;
}

.fail {
  color: rgb(244, 91, 91);
}

.pass {
  color: rgb(105, 166, 237);
}

.good {
  color: rgb(61, 184, 61);
}

.unknown {
  color: rgb(122, 122, 122);
}

.complete {
  color: rgb(61, 184, 61);
}

.incomplete {
  color: rgb(122, 122, 122);
}

.btn {
  display: block;
  width: 25%;
  text-align: center;
  padding: 0.5rem 0;
  border: none;
  border-radius: 8px;
  background-color: #474350;
  color: #FCFFEB;
  margin-bottom: 3.5%;
  cursor: pointer;
  width: auto;
  padding: 0.6rem 1rem;
}

.btn:hover {
  background-color: #333139;
  color: #779CAB;
}
</style>