<template>
  <div class="container-special pt-5 pb-5">
    <h1 class="text-center">Manifiesto Bitcore</h1>
    <div class="row">
      <div class="col-xs-12 main-container">
        <p class="title">
          100% MANIFIESTO Bienvenido a la Resistencia del Gaming
        </p>
        <p>
          ¿Por qué añadir una página sobre videojuegos más a un mercado ya
          sobresaturado? Porque creemos que todavía quedan caminos inexplorados,
          nuevas formas de hacer las cosas y de relacionarse con los lectores.
        </p>
        <p>
          Vivimos en un momento en que el público está siendo más exprimido que
          nunca por las grandes compañías: los DLCs, season pass, loot boxes,
          microtransacciones y otras prácticas de monetización pre y post venta
          han pasado de ser criaturas de fantasía a convertirse en prácticas
          habituales, muchas veces abusivas, y contra las que el jugador tiene
          poca o ninguna protección, más allá del negarse a consumir. Creemos
          que el deber de los medios de comunicación del sector es no sólo
          señalar con el dedo y denunciar estas malas prácticas, sino dejarse la
          piel en unirse con otros actores afines para influir de manera
          determinante en su cambio.
        </p>
        <p>
          Por otra parte, los videojuegos tienen una forma única, interactiva e
          inmersiva, de comunicarse con sus usuarios. Esa característica ha
          quedado prácticamente desterrada de sus medios de comunicación,
          desaprovechando oportunidades para conectar con la comunidad a través
          de lo que más nos gusta: jugar. Por eso, debajo de las capas de
          análisis, noticias y artículos, en Bitcore Gaming hay un mundo
          alternativo en el que pasar de lector a Miembro de la Resistencia, en
          el que evolucionar, tomar parte en las decisiones e influir en su
          futuro. ¡Bienvenido al Bitworld! [enlace a Bitworld]
        </p>
        <p>
          Queremos también con esta aventura aportar nuestro granito de arena
          para crear un sector más vivo, más fuerte, más interconectado. Prestar
          nuestra voz a todos aquellos (escuelas, desarrolladoras, publishers,
          medios de comunicación, asociaciones, profesionales…) que ya trabajan
          de manera incansable para crear una comunidad hispanohablante capaz de
          competir en calidad y producción con los gigantes internacionales del
          videojuego.
        </p>
        <p>
          Como apasionados de los videojuegos, intentamos buscar siempre lo
          mejor para el sector y, sobre todo, lo mejor para los jugadores.
        </p>
        <p>
          Por lo tanto, en Bitcore creemos que la comunicación en el mundo de
          los videojuegos debe ser:
        </p>
        <p>
          100% independiente. La información más veraz sobre un juego es aquella
          que su publisher o desarrollador no te ha pagado por producir.
        </p>
        <p>
          100% transparente. Cada euro tiene un destino, y los lectores deben
          conocerlos todos.
        </p>
        <p>
          100% de calidad. Desde el diseño de la web, pasando por la
          comprobación de las fuentes de las que recibimos información hasta,
          por supuesto, el contenido, cuidando hasta el último detalle.
        </p>
        <p>
          100% dedicada. Sólo videojuegos, sólo para amantes de los videojuegos.
        </p>
        <p>
          100% colaborativa. Sin nuestra comunidad, sólo somos unos locos
          gritando en medio del bosque.
        </p>
        <p>
          100% divertida. Porque, al final, todos somos jugadores.
        </p>
        <p>
          ¿Quieres formar parte de la Resistencia del Gaming? Primero, deberás
          aceptar este juramento (prometemos no espiarte para ver si lo has
          pronunciado en alto, pero nos hará mucha ilusión si lo haces):
        </p>
        <p class="title">
          JURAMENTO
        </p>
        <p>
          <button class="static-page-button" @click="acceptManifesto()">
            Aceptar
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manifiesto",
  methods: {
    acceptManifesto() {
      this.$axios
        .get("/accept_manifesto")
        .then(() => {
          this.$toast.success("Has aceptado el manifiesto!");
        })
        .catch(() => {
          this.$toast.success("Error");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  font-family: "Merriweather", serif;
  font-weight: 300;
  font-size: 15px;
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
      margin-top: 0px;
    }
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
  .static-page-button {
    appearance: none;
    outline: none;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $black;
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
