<template>
  <div class="students">
    <div class="student-card" v-for:="student in students" :key="student._id">
      <div class="student-card__header">
        <h3>{{ student.name }}</h3>
      </div>
      <div class="student-card__content">
        <p>Solved Quizzes: {{ student.solvedQuizzes }}</p>
      </div>
      <div class="student-card__content">
        <button class="btn" @click="goToStudent(student._id)">
          View Student
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentsView",
  data() {
    return {
      students: []
    };
  },
  async created() {
    await this.getStudents();
  },
  methods: {
    async getStudents() {
      axios.get("http://localhost:7272/api/v0.0.1/user/student/", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("authToken")}`
        }
      }).then(response => {
        this.students = response.data.data.users;
      }).catch(e => {
        alert(e.response.data.message || "Internal Server Error");
      });
    },
    goToStudent(id) {
      this.$router.push("/students/" + id);
    }
  }
};
</script>

<style>
.students {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

.student-card {
  background-color: #FCFFEB;
  display: flex;
  flex-direction: column;
  width: 35%;
  overflow: hidden;
  border-radius: .5em;
  text-decoration: none;
  margin: 1em;
}

.student-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #474350;
  color: #FCFFEB;
}

.student-card__content {
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
}
</style>
