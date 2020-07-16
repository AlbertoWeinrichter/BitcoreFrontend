<template>
  <div id="auth0-lock" />
</template>

<script>
export default {
  name: "login",
        mounted() {
          const showLogin = require("~/services/lock").showLogin;
          showLogin("auth0-lock");
        }
};
</script>
