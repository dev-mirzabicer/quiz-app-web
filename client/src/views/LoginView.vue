<template>
    <div class="login__page">
        <h2 class="login-title">Log In</h2>
        <div class="login-form">
            <form @submit.prevent="handleSubmit" class="login">
                <div class="login__field">
                    <input v-model="username" class="login__input" type="text" placeholder="Username" />
                </div>

                <div class="login__field">
                    <input v-model="password" class="login__input" type="password" placeholder="Password" />
                </div>

                <div class="login__submit">
                    <button action="submit" class="btn">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "LoginView",
    beforeMount() {
        if (this.$cookies.isKey("authToken")) {
            this.$router.push("/");
        }
    },

    data() {
        return {
            username: "",
            password: "",
        };
    },

    methods: {
        handleSubmit() {
            axios
                .post("http://localhost:7272/api/v0.0.1/user/login", {
                    username: this.username,
                    password: this.password,
                })
                .then(({ data }) => {
                    this.$cookies.set("authToken", data.data.token);
                    localStorage.setItem("role", data.data.user.role);
                    this.$router.push("/");
                })
                .catch((e) => {
                    alert(e.response.data.message || "Internal Server Error");
                });
        },
    }
};
</script>

<style>
.login__page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    max-width: 100%;
    margin-top: 15vh;
}

.login-title {
    font-size: 1.5em;
    font-weight: bold;
}

.login-form {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 50%;
    min-width: 50%;
    margin: 0 auto;
    border-style: solid;
    border-color: #6A679E;
    border-radius: 15px;
}

.login {
    width: 30%;
    padding: 30px;
}

.login__field {
    padding: 20px 0px;
    position: relative;
}

.login__input {
    border: none;
    border-bottom: 2px solid #D1D1D4;
    background: none;
    padding: 10px;
    padding-left: 24px;
    font-weight: 700;
    width: 75%;
    transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
    outline: none;
    border-bottom-color: #6A679E;
}

.login__submit {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>