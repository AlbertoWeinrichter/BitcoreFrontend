<template>
  <no-ssr>
    <calendar />
  </no-ssr>
</template>

<script>
import NoSsr from "vue-no-ssr";
import Calendar from "~/components/publication/Calendar";

export default {
  name: "lanzamientos",
  components: {
    "no-ssr": NoSsr,
    Calendar
  }
};
</script>

<style lang="scss"></style>
