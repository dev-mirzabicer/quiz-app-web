<template>
  <h3 class="logout-text">Logging Out...</h3>
</template>

<script>
import axios from "axios";

export default {
  name: "LogoutView",
  beforeMount() {
    axios.post("https://quiz-app-web-seven.vercel.app/api/v0.0.1/user/logout", {}, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("authToken")}`,
      },
    }).then(() => {
      this.$cookies.remove("authToken");
      localStorage.removeItem("role");
      this.$router.push("/");
    }).catch(e => {
      alert(e.response.data.message || "Internal Server Error");
    })

  }
}
</script>

<style>
.logout-text {
  margin-top: 15vh;
}
</style>