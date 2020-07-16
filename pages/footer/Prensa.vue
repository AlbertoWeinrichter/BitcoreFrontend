<template>
  <div class="bc-container-fluid pt-5 pb-5">
    <h1 class="text-center head">Prensa</h1>
    <div class="main-container">
      <p>
        ¡Bienvenido a la zona de prensa de Bitcore!
      </p>
      <p>
        Aquí encontrarás nuestro kit de diseños corporativos, en el improbable
        caso de que quieras referirnos en otros medios, así como todas las
        comunicaciones internas emitidas desde las profundidades del
        Departamento de Comunicación.
      </p>
      <p>
        Si no encuentras lo que necesitas, puedes pedírnoslo
        <nuxt-link to="/footer/contacto" exact>aquí</nuxt-link>
      </p>
      <p class="title">
        PRESSKIT
      </p>
      <p>
        <button class="static-page-button">
          <a
            href="https://s3.eu-central-1.amazonaws.com/bitcore-static/presskit_bitcore.zip"
            >DESCARGAR</a
          >
        </button>
      </p>
      <p class="title">
        NOTAS DE PRENSA
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "mediakit"
};
</script>

<style lang="scss" scoped>
.main-container {
  font-family: "Merriweather", serif;
  font-weight: 300;
  font-size: 15px;
  margin: 50px auto;
  max-width: 1200px;
  line-height: 28px;
  color: $black;
  letter-spacing: 0.02em;
  background: gray("200");
  border-radius: 2px;
  padding: 60px;

  @media (max-width: 767px) {
    padding: 20px;
    font-size: 14px;
    margin: 0;
    border-radius: 0;
  }
  p {
    margin-bottom: 15px;
    &.press-note {
      margin-bottom: 0;
      .date {
        margin-right: 10px;
      }
    }
  }
  .title {
    color: $black;
    font-size: 24px;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0.05em;
    font-weight: 700;
    margin-top: 25px;
    &.no-top-margin {
      margin-top: 0;
    }
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
  .static-page-button {
    outline: none;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    a {
      color: $black;
      text-decoration: none;
    }

    background: color("yellow");
    border: none;
    border-radius: 10px;
    padding: 5px 20px;
    @include transition-hover-intent();
    &:hover,
    &:active,
    &:focus {
      background: darken(color("yellow"), 10);
    }
  }
  a {
    color: color("blue");
  }
}
</style>
