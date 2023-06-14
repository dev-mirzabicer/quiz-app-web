import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MyQuizzesView from "../views/MyquizzesView.vue";
import QuizzesView from "../views/QuizzesView.vue";
import MyQuizView from "../views/MyquizView.vue";
import QuizView from "../views/QuizView.vue";
import LogoutView from "../views/LogoutView.vue";
import StudentsView from "../views/StudentsView.vue";
import StudentView from "../views/StudentView.vue";
import StudentQuizView from "../views/StudentquizView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/my-quizzes",
    name: "my-quizzes",
    component: MyQuizzesView,
  },
  {
    path: "/quizzes",
    name: "quizzes",
    component: QuizzesView,
  },
  {
    path: "/my-quizzes/:id",
    name: "my-quiz",
    component: MyQuizView,
  },
  {
    path: "/quizzes/:id",
    name: "quiz",
    component: QuizView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/students",
    name: "students",
    component: StudentsView,
  },
  {
    path: "/students/:id",
    name: "student",
    component: StudentView,
  },
  {
    path: "/students/:id/quiz/:quizId",
    name: "student-quiz",
    component: StudentQuizView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
