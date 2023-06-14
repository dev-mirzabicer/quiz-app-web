<template>
  <QuizzesStudent :goToQuiz="goToQuizStudent" :quizzes="quizzes" v-if="role === 'student'" />
  <QuizzesOther :goToQuiz="goToQuizOther" :quizzes="quizzes" v-else />
</template>

<script>
import axios from "axios";
import QuizzesStudent from "@/components/QuizzesStudent.vue";
import QuizzesOther from "@/components/QuizzesOther.vue";

export default {
  name: "MyquizzesView",
  components: {
    QuizzesStudent,
    QuizzesOther,
  },
  data() {
    return {
      quizzes: [],
      role: "",
    };
  },
  created() {
    this.role = localStorage.getItem("role");
    this.getQuizzes();
  },
  methods: {
    getQuizzes() {
      axios
        .get("http://localhost:7272/api/v0.0.1/quiz/", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          this.quizzes = response.data.data.quizzes;
          if (this.role === "student") {
            this.quizzes.forEach(async (quiz, index) => {
              let isComplete = false;
              let isSolved = false;
              let solveds;
              try {
                solveds = (await axios.get(
                  `http://localhost:7272/api/v0.0.1/solved-quiz/my?quizId=${quiz._id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${this.$cookies.get("authToken")}`,
                    },
                  }
                )).data.data.solvedQuizzes;
              } catch (e) {
                alert(e.response.data.message || "Internal Server Error");
              }
              if (solveds.length > 0) {
                isComplete = solveds[0].isComplete;
                isSolved = true;
              }
              if (isSolved && isComplete) {
                this.quizzes[index].status = "complete";
              } else if (isSolved) {
                this.quizzes[index].status = "incomplete";
              } else {
                this.quizzes[index].status = "none";
              }
            });
          }
        })
        .catch((e) => {
          alert(e.response.data.message || "Internal Server Error");
        });
    },
    async goToQuizStudent(quiz) {
      if (quiz.status !== "none") {
        let solveds;
        try {
          solveds = (await axios.get(
            `http://localhost:7272/api/v0.0.1/solved-quiz/my?quizId=${quiz._id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("authToken")}`,
              },
            }
          )).data.data.solvedQuizzes;
        } catch (e) {
          alert(e.response.data.message || "Internal Server Error");
        }
        if (solveds.length > 0) {
          return this.$router.push("/my-quizzes/" + solveds[0]._id);
        }
      }
      let newSolved;
      try {
        newSolved = (await axios.post(
          "http://localhost:7272/api/v0.0.1/solved-quiz/",
          {
            quiz: quiz._id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("authToken")}`,
            },
          }
        )).data.data.solvedQuiz._id;
      } catch (e) {
        alert(e.response.data.message || "Internal Server Error");
      }
      return this.$router.push("/my-quizzes/" + newSolved);
    },
    async goToQuizOther(quiz) {
      return this.$router.push("/quizzes/" + quiz._id);
    },
  }
};
</script>

<style>
.quizzes {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

.quiz-card {
  background-color: #FCFFEB;
  display: flex;
  flex-direction: column;
  width: 35%;
  overflow: hidden;
  border-radius: .5em;
  text-decoration: none;
  margin: 1em;
}

.quiz-card__content {
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
}

.quiz-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #474350;
  color: #FCFFEB;
}

.quiz-card__header h3 {
  cursor: pointer;
}

.quiz-card__header:hover {
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