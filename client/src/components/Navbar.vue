<template>
  <div class="navbar">
    <div class="navbar__head">
      <div class="navbar__logo">
        <router-link to="/">
          <img alt="logo" src="../assets/logo.png" />
        </router-link>
      </div>
      <div class="navbar__title-div">
        <router-link to="/" class="navbar__title">
          Quiz App
        </router-link>
      </div>
    </div>
    <div class="navbar__menu">
      <div class="navbar__item" v-for="item in items" :key="item.title">
        <router-link :to="item.route" class="navbar__link" active-class="active-page">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarView",
  data() {
    switch (localStorage.getItem("role")) {
      case "admin":
        return {
          items: [
            { title: "Home", route: "/" },
            { title: "Quizzes", route: "/quizzes" },
            { title: "Logout", route: "/logout" },
          ],
        }
      case "teacher":
        return {
          items: [
            { title: "Home", route: "/" },
            { title: "Quizzes", route: "/quizzes" },
            { title: "Students", route: "/students" },
            { title: "Logout", route: "/logout" },
          ],
        }
      case "student":
        return {
          items: [
            { title: "Home", route: "/" },
            { title: "My Quizzes", route: "/my-quizzes" },
            { title: "Quizzes", route: "/quizzes" },
            { title: "Logout", route: "/logout" },
          ],
        }
      default:
        return {
          items: [
            { title: "Home", route: "/" },
            { title: "Login", route: "/login" },
          ],
        }
    }
  },
};
</script>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #474350;
  height: 10vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin-bottom: 10%;
  border-radius: 0 0 1rem 1rem;
}

.navbar__head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 5%;
}

.navbar__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  height: 15%;
}

.navbar__logo img {
  width: 40px;
}

.navbar__title-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
}

.navbar__title {
  text-decoration: none;
  color: #FCFFEB;
  margin-left: 1em;
  font-size: 1.5em;
  font-weight: bold;
}

.active-page {
  /* color: #faffdf !important; */
  font-weight: bolder !important;
}

.navbar__link {
  text-decoration: none;
  color: #FCFFEB;
  font-size: 1.2em;
  font-weight: normal;
  margin-left: 1em;
}

.navbar__link:hover {
  color: #779CAB;
}

.navbar__menu {
  float: right;
  position: fixed;
  right: 5%;
  max-width: 50%;
  display: flex;
}
</style>