<template>
  <div v-if="editable" class="question__add-form" :key="reloadForm">
    <div class="add-form__header">
      <h2>Add a question</h2>
    </div>
    <div class="add-form__question__title">
      <input class="add-form__question__input" type="text" v-model="questionToAdd.title" placeholder="Question" />
    </div>
    <div class="add-form__question__answers">
      <div class="add-form__question__answers__inputs" v-for="(answer, index) in questionToAdd.answers" :key="index">
        <input class="add-form__question__correct" type="radio" :value="index" v-model="questionToAdd.pickedAnswer">
        <input class="add-form__question__answer" type="text" v-model="answer.title" :placeholder="alphabet[index]">
      </div>
      <button v-if="alphabet[questionToAdd.answerAmount]" @click="addChoice" class="btn">{{
          `Add Choice (${alphabet[questionToAdd.answerAmount]})`
      }}</button>
    </div>
    <div class="add-form__question__submit">
      <button class="btn" @click="addQuestion">Add Question</button>
    </div>
  </div>
  <div v-if="editable" class="add-form__publish-quiz">
    <button class="btn" @click="publishQuiz">Publish Quiz</button>
    <button class="btn" @click="deleteQuiz">Delete Quiz</button>
  </div>
  <div class="quiz__container" :key="reloadMain">
    <div class="quiz__header">
      <input v-if="editable" class="quiz__header-input" type="text" v-model="quiz.title" placeholder="Quiz Title" />
      <h2 v-else>{{ quiz.title }}</h2>
    </div>
    <div class="quiz__questions">
      <div v-for="(question, index) in quiz.questions" class="question" :key="question._id">
        <div class="question__title">
          <h2>{{ index + 1 }}) {{ question.title }}</h2>
        </div>
        <div class="question__answers">
          <div v-for="(answer, index) in question.answers" :class="`${answer.correct && 'correct'} question__answer`"
            :key="answer._id">
            <h3 class="choice">{{ alphabet[index] }})&nbsp;</h3>
            <h3 class="answer">{{ answer.title }}</h3>
          </div>
        </div>
        <div v-if="editable" class="question__delete">
          <button class="btn" @click="deleteQuestion(question._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuizView",
  beforeMount() {
    if (localStorage.getItem("role") === "student")
      this.$router.push("/");
  },
  created() {
    this.getQuiz();
  },
  data() {
    return {
      deleted: false,
      quiz: {},
      reloadMain: 1,
      reloadForm: -1,
      questionToAdd: {
        pickedAnswer: 0,
        title: "",
        answerAmount: 4,
        answers: [{ title: "", correct: false }, { title: "", correct: false }, { title: "", correct: false }, { title: "", correct: false }],
      },
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", false],
    }
  },
  computed: {
    editable() {
      return (!this.quiz.isPublished && localStorage.getItem("role") === 'admin');
    }
  },
  methods: {
    async getQuiz() {
      try {
        this.quiz = (await axios.get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        })).data.data.quiz;
      } catch (e) {
        this.$router.push("/");
        alert(e.response.data.message || "Internal Server Error");
      }
    },
    async addQuestion() {
      const newQuestion = {
        title: this.questionToAdd.title,
        answers: this.questionToAdd.answers.map((ans, index) => {
          return {
            title: ans.title,
            correct: index === this.questionToAdd.pickedAnswer,
          }
        })
      }
      this.quiz.questions.push(newQuestion);

      await this.updateQuiz();

      this.reloadMain++;

      this.questionToAdd = {
        pickedAnswer: 0,
        title: "",
        answerAmount: 4,
        answers: [{ title: "", correct: false }, { title: "", correct: false }, { title: "", correct: false }, { title: "", correct: false }],
      };

      this.reloadForm--;
    },
    async deleteQuestion(id) {
      this.quiz.questions = this.quiz.questions.filter((q => q._id !== id))
      await this.updateQuiz();
    },
    async addChoice() {
      this.questionToAdd.answers.push({ title: "", correct: "false" })
      this.questionToAdd.answerAmount++;
      this.reloadForm--;
    },
    async updateQuiz(isPublished = false) {
      const newQuiz = {
        title: this.quiz.title,
        isPublished,
        questions: this.quiz.questions.map(q => {
          return {
            title: q.title,
            answers: q.answers,
          }
        })
      }
      try {
        this.quiz = (await axios.patch(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/${this.$route.params.id}`, newQuiz, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("authToken")}`,
          },
        })).data.data.quiz;
      } catch (e) {
        alert(e.response.data.message || "Internal Server Error");
      }
    },
    async publishQuiz() {
      if (this.quiz.title === "Untitled Quiz") {
        alert("Please give your quiz a title");
        return;
      }
      await this.updateQuiz(true);
      this.reloadMain++;
      this.reloadForm--;
    },
    async deleteQuiz() {
      if (confirm("Are you sure you want to delete this quiz?")) {
        this.deleted = true;
        try {
          await axios.delete(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/${this.$route.params.id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("authToken")}`,
            },
          });
          this.$router.push("/");
        } catch (e) {
          alert(e.response.data.message || "Internal Server Error");
        }
      }
    },
  },
  async beforeRouteLeave() {
    if (this.deleted) return;
    if (this.quiz.title === "Untitled Quiz") {
      alert("Please give your quiz a title");
      return false;
    }
    await this.updateQuiz();
  }
}
</script>

<style>
.quiz__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #474350;
}

.question__add-form {
  display: flex;
  flex-direction: column;
  margin-top: 15vh;
  align-items: center;
  justify-content: center;
  border: 5px solid #474350;
  border-radius: 2rem;
}

.question__add-form .btn,
.quiz__container .btn {
  margin: 0.5rem auto;
  width: auto;
  padding: 0.6rem 1rem;
}

.add-form__question__answer {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  border: 2px solid #474350;
  background: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 0.5rem;
}

.add-form__question__input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  border: 2px solid #474350;
  background: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 0.5rem;
  font-weight: 600;
  font-size: large;
}

.quiz__header-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  border: 2px solid #474350;
  background: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 0.5rem;
  font-weight: 600;
  font-size: large;
}

.add-form__question__answers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  border: 2px solid #474350;
  background: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 0.5rem;
}

.add-form__publish-quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  width: auto;
}

.quiz__header h2 {
  margin-top: 15vh;
}
</style>