<script>
import NavbarView from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    NavbarView,
  },
  beforeMount() {
    if (!localStorage.getItem("authToken")) {
      this.$router.push("/login");
    }
  },
};
</script>

<template>
  <navbar-view :key="$route.fullPath"></navbar-view>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
