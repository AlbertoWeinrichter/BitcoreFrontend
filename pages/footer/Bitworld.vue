<template>
  <div class="container-special pt-5 pb-5">
    <h1 class="text-center head">Bitworld</h1>
    <div class="row">
      <div class="col-xs-12 main-container">
        <p>
          Apenas un puñado de viejas reliquias como yo recordamos cómo era la
          vida en la Era Analógica. Y no es que nadie haya tratado de
          ocultarlo...la información está ahí, alimentándose del polvo en las
          enormes bibliotecas de la gran Arcadia. Millones de libros, de
          registros, de relatos, condenados al olvido allá donde nadie volverá a
          mirar nunca, salvo quizá los “retros”, y sólo de vez en cuando.
        </p>
        <p>
          Nadie sabe muy bien cómo ni cuándo se produjo el cambio, pero yo creo
          que fue algo pausado, casi imperceptible. El movimiento de un péndulo
          demasiado grande para ser registrado por el ojo humano. Pero un día
          nos despertamos y el mundo había cambiado, había tenido lugar una
          silenciosa guerra a muerte donde nadie se la esperaba, y sólo un
          contendiente quedaba en pie. Y aquella mañana, en que la Era Analógica
          tocaba a su fin, los videojuegos se alzaban como emperadores del
          entretenimiento, como guías indiscutibles de la sociedad, dispuestos a
          regir los destinos de los seres conscientes. Fuimos muchos los que
          celebramos aquella victoria.
        </p>
        <p>
          Sobra casi decir que todo el mundo quiso su trozo del pastel. Los que
          estaban mejor posicionados lo tuvieron fácil: energéticas, grandes
          corporaciones del entretenimiento, gigantes de la conectividad, todos
          ellos llevaban tiempo tejiendo los hilos de un imperio demasiado
          grande para ser obviado por los mal llamados líderes del mundo libre:
          hicieron presión, y fueron escuchados. Y donde antes había
          representantes, ahora sólo quedaban títeres.
        </p>
        <p>
          Los ciudadanos de a pie se entregaron en cuerpo y alma al cambio.
          Desde los estoicos supervivientes del Erial hasta los refinados
          ocupantes de los Resorts Aéreos, todos gozan del entretenimiento rey.
          En el mundo virtual, la clase social, las mutaciones genéticas o la
          procedencia a menudo no son más que detalles superficiales. Y la
          sociedad cristalizó en nuevas e interesantes formas, estructuras nunca
          vistas en tiempos anteriores.
        </p>
        <p>
          Desde entonces, en mi nave han viajado individuos excepcionales:
          mutantes con formas y aptitudes sólo soñadas por la raza humana,
          psíquicos capaces de desnudar los rincones más escondidos de la mente,
          inteligencias artificiales enamoradas de su propia existencia,
          híbridos de hombre y máquina. Todos conectados de un modo u otro,
          todos jugadores.
        </p>
        <p>
          La frágil tregua que llegó a nuestras vidas con esta nueva era está
          empezando a romperse. Ya no es suficiente con tener un trozo
          equitativo del pastel… ahora parece que todo el mundo tiene hambre.
          Los ciudadanos, acunados por una nana de diversión y despreocupación,
          están comenzando a despertarse. Se acabó el aceptar las reglas, las
          cuotas abusivas y las prácticas deshonestas. No son estos tiempos de
          asentir y agachar la cabeza. Y de este descontento, de este grito alto
          y claro a favor de un medio con infinitas posibilidades, ha nacido La
          Resistencia.
        </p>
        <p>
          …Me ha tocado vivir tiempos interesantes.
        </p>
        <p>
          Extracto del diario personal del Capitán Don Load, líder de La Bahía
          de los Piratas
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bitworld",
  layout: "footer"
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
      margin-top: 0;
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
    a {
      color: $black;
      text-decoration: none;
    }
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
