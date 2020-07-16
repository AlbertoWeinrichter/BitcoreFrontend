<template>
  <div class="error-container">
    <div v-if="error.statusCode === 404">
      <h1 class="header-error">Error 404</h1>
      <h2>PAGINA NO ENCONTRADA</h2>
    </div>
    <div v-else-if="error.statusCode === 500">
      <h1 class="header-error">
        Internal Server Error
      </h1>
      <h2>Algo pasó</h2>
    </div>
    <b-button class="redirect-btn">
      <a href="/">
        Vuelta home
      </a>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "error",
  props: ["error"],
  layout: "blog" // you can set a custom layout for the error page,
};
</script>

<style scoped lang="scss">
.error-container {
  margin: 150px 0;
  a {
    text-decoration: none;
    color: initial;
  }
  .redirect-btn {
    background: #fad000;
    display: block;
    margin: 0 auto;
    font-weight: 700;
    border-radius: 10px;
    color: #000;
    font-size: 14px;
    padding: 8px 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    &:hover {
      background-color: darken(color("yellow"), 5);
    }
  }
  h1 {
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.01em;
    margin-bottom: 30px;
    color: #fad000;
  }
  h2 {
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.01em;
    margin-bottom: 30px;
    color: #dee2e6;
  }
}
</style>
