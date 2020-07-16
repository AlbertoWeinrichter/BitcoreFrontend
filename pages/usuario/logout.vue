<template>
  <p>Signing off...</p>
</template>

<script>
export default {
  name: "logout",
  mounted() {
    const unsetToken = require("~/services/auth").unsetToken;
    const logout = require("~/services/lock").logout;

    unsetToken();
    logout();
  }
};
</script>
