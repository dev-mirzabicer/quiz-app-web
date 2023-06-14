<template>
  <div class="quiz">
    <div class="question" v-for="(question, index) in questions" :key="question._id">
      <div class="question__title">
        <h2>{{ index + 1 }}) {{ question.title }}</h2>
      </div>
      <div class="question__answers">
        <div v-for="(answer, index) in question.answers" :class="((this.quiz.status === 'complete') ?
        (answer.correct ? (answer.given ? 'correct' : 'correctOne') : (answer.given ? 'incorrect' : 'empty')) :
        (answer.given ? 'given' : 'non-selected')) + ' question__answer'" :key="answer._id"
          @click="selectAnswer(question._id, answer._id)">
          <h3 class="choice">{{ alphabet[index] }})&nbsp;</h3>
          <h3 class="answer">{{ answer.title }}</h3>
        </div>
      </div>
    </div>
    <div v-if="this.quiz.status !== 'complete'" class="quiz__submit">
      <button class="btn" @click="submitQuiz(true)">Submit Quiz</button>
    </div>
    <div v-else class="quiz__score">
      <h2>Your score: {{ this.quiz.score }}/100</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyquizView",
  data() {
    return {
      published: false,
      quiz: {},
      questions: [],
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    };
  },
  created() {
    this.getQuizAndQuestions();
  },
  methods: {
    getQuizAndQuestions() {
      axios
        .get(`http://localhost:7272/api/v0.0.1/solved-quiz/my/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        }).then((response) => {
          this.quiz = response.data.data.solvedQuiz;
          if (this.quiz.isComplete === true) this.quiz.status = 'complete';
          else if (this.quiz.isComplete === false) this.quiz.status = 'incomplete';
          this.questions = response.data.data.solvedQuiz.answers.map(a => {
            return {
              _id: a.question._id,
              title: a.question.title,
              answers: a.question.answers.map(ans => {
                return {
                  _id: ans._id,
                  title: ans.title,
                  given: a.answer?._id === ans._id,
                  correct: ((this.quiz.status === "complete") ? ans.correct : undefined),
                };
              }),
            }
          });
        });
    },
    selectAnswer(q, a) {
      if (this.quiz.status === "complete") return;
      const question = this.questions.find((e) => e._id === q);
      question.answers.forEach(ans => {
        if (ans._id === a) ans.given = true;
        else ans.given = false;
      })
    },
    submitQuiz(isComplete = true) {
      const quizToSubmit = {
        quiz: this.quiz.quiz._id,
        isComplete: isComplete,
        answers: this.questions.map(q => {
          const a = q.answers.find(a => a.given === true)?._id;
          if (a)
            return {
              question: q._id,
              answer: a,
            };
          else return {
            question: q._id,
            answer: null,
          };
        })
      }
      axios
        .patch(`http://localhost:7272/api/v0.0.1/solved-quiz/my/${this.quiz._id}`, quizToSubmit, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        })
        .then(() => {
          this.published = true;
          if (isComplete) this.$router.push("/my-quizzes");
        })
        .catch(e => {
          alert(e.response.data.message || "Internal Server Error");
          console.log(e);
        });
    }
  },
  beforeRouteLeave() {
    if (!this.published && this.quiz.status !== "complete" && !this.quiz.isPublished) this.submitQuiz(false);
  }
}
</script>

<style>
.quiz {
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #474350;
}

.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2.5px solid #474350;
  margin: 10px;
  padding: 0.6rem 3rem;
  border-radius: 10px;
}

.question__answer {
  display: flex;
  flex-direction: row;
  border: 1px solid #474350;
  margin: 1rem;
  border-radius: 10px;
  padding: 0 0.6rem;
}

.question__answer:hover {
  background-color: #474350;
  color: white;
}

.given {
  background-color: #474350;
  color: white;
}

.correct,
.correct:hover {
  background-color: #6A8E7F;
  color: white;
  border: 0;
}

.correctOne,
.correctOne:hover {
  background-color: #3fe09d;
  color: white;
  border: 0;
}

.incorrect,
.incorrect:hover {
  background-color: #e33f3f;
  color: white;
  border: 0;
}

.empty:hover {
  background-color: white;
  color: #474350;
  border: 1px solid #474350;
}

.answer {
  margin: 0;
  padding: 0;
}

.choice {
  margin: 0;
  padding: 0;
}
</style>