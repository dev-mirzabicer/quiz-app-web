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
          <span v-if="quiz.status === 'none'">Start Quiz</span>
          <span v-else-if="quiz.status === 'incomplete'">Continue Quiz</span>
          <span v-else-if="quiz.status === 'complete'">View Results</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
}
</script>