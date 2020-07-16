<template>
  <div class="container-special pt-5 pb-5">
    <h1 class="text-center head">Legalidad</h1>
    <div class="row">
      <div class="static-page-tabs">
        <nuxt-link class="static-page-tab" to="legal" exact
          >Legalidad</nuxt-link
        >
        <nuxt-link class="static-page-tab" to="terms" exact
          >Términos y condiciones</nuxt-link
        >
        <nuxt-link class="static-page-tab act" to="cookies" exact
          >Sobre cookies</nuxt-link
        >
      </div>
      <div class="col-xs-12 main-container">
        <h2>
          POLÍTICA DE COOKIES
        </h2>

        <p>
          Utilización de Cookies por la web https://www.bitcoregaming.com/ de
          Bitcore Gaming, S.L., (en adelante la Web): La Web utiliza una cookie
          de tipo técnico SESSIONID y CSRFTOKEN que permite almacenar un
          identificador único por sesión a través del que es posible vincular
          datos necesarios para posibilitar la navegación en curso, y un token
          de seguridad para evitar ataques CSRF (Cross Site Reference Forgery).
        </p>
        <p>
          La Web utiliza las cookies _ga, _gid y _gat, propiedad de Google
          Analytics, persistentes durante 2 años, 24 horas y 10 minutos
          respectivamente, para habilitar la función de control de visitas
          únicas con el fin de facilitar la navegación de sus usuarios. A todo
          usuario que visita la Web se le informa del uso de estas cookies
          mediante un banner flotante, considerando que si continúa navegando
          está de acuerdo con su uso. En el caso de aceptar su uso el banner
          desaparecerá, aunque en todo momento podrá revocar el consentimiento y
          obtener más información consultando nuestra Política de cookies.
        </p>
        <p>
          La Web utiliza distintos Píxeles de Facebook. Los píxeles de Facebook
          son pequeños programas que aparecen como "puntos" prácticamente
          invisibles y del tamaño de un píxel en nuestro sitio web, y que crean
          un enlace entre su visita a nuestro sitio y Facebook. Cuando se carga
          el píxel, Facebook coloca una cookie llamada fr en su ordenador, que
          permite ofrecerle anuncios más personalizados, pero también evaluar y
          mejorar los anuncios. Esta cookie tiene una duración de 90 días. Puede
          encontrar más información sobre las cookies de Facebook en:
          https://www.facebook.com/policies/cookies/. Tenga en cuenta que, una
          vez colocada la cookie fr, Facebook podrá hacer el seguimiento de su
          patrón de navegación en otros sitios web que hayan implementado un
          píxel o un complemento social de Facebook.
        </p>
        <p>
          Cómo deshabilitar las cookies en los principales navegadores
          Normalmente es posible dejar de aceptar las cookies del navegador, o
          dejar de aceptar las cookies de un servicio en particular.
        </p>
        <p>
          Todos los navegadores modernos permiten cambiar la configuración de
          cookies. Estos ajustes normalmente se encuentran en las ¨opciones¨ o
          ¨preferencias¨ del menú de su navegador. Asimismo, puede configurar su
          navegador o su gestor de correo electrónico, así como instalar
          complementos gratuitos para evitar que se descarguen los Web Bugs al
          abrir un email.
        </p>
        <p>
          La Web ofrece orientación al Usuario sobre los pasos para acceder al
          menú de configuración de las cookies y, en su caso, de la navegación
          privada en cada uno de los navegadores principales: Internet Explorer:
          Herramientas > Opciones de Internet > Privacidad > Configuración. Para
          más información, puede consultar el soporte de Microsoft o la Ayuda
          del navegador.
        </p>
        <p>
          Firefox: Herramientas > Opciones > Privacidad > Historial >
          Configuración personalizada. Chrome: Configuración > Mostrar opciones
          avanzadas > Privacidad > Configuración de contenido. Safari:
          Preferencias > Seguridad.Para más información, puede consultar el
          soporte de Apple o la Ayuda del navegador.
        </p>
        <p>
          Sobre la recogida de datos de menores de edad: No estamos interesados
          en recopilar datos personales de menores de 14 años, por lo que en
          caso de tener constancia dichos datos han sido “recopilados” sin el
          expreso consentimiento de los padres o tutores del menor, le rogamos
          que se ponga en contacto con nosotros y nos lo comunique para proceder
          a eliminar estos datos. Al hacerlo estamos protegiendo los derechos de
          los menores, manifestando el mayor escrupuloso respeto a la ley.
          Actualizaciones y cambios en la política de privacidad / cookies.
        </p>
        <p>
          La Web puede modificar esta Política de Cookies en función de las
          exigencias legislativas, reglamentarias, o con la finalidad de adaptar
          dicha política a las instrucciones dictadas por la Agencia Española de
          Protección de Datos, por ello se aconseja a los usuarios que la
          visiten periódicamente.
        </p>
        <p>
          Cuando se produzcan cambios significativos en esta Política de
          Cookies, se comunicarán a los usuarios bien mediante la web o a través
          de correo electrónico a los usuarios registrados. Si el usuario
          configurase su navegador para rechazar todas las cookies o rechazase
          expresamente las cookies de www.bitcoregaming.com , puede que algunas
          de las funcionalidades de la Web no estén disponibles.
        </p>
        <p>
          Esta práctica de cookies puede ser modificada en función de nuevas
          exigencias legislativas, reglamentarias, o con la finalidad de adoptar
          dicha política a las instrucciones dictadas por la Agencia Española de
          Protección de Datos. Cuando se produzcan cambios significativos en
          esta política de Cookies se comunicará al usuario mediante un aviso
          informativo en la página web o a través de correo electrónico para los
          usuarios registrados.
        </p>
        <p>
          Si desea más información sobre qué uso hacemos de las cookies, puede
          enviarnos un e-mail a a.weinrichter@bitcoregaming . La presente
          política de cookies fue modificada por última vez el 27/11/2018.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cookies",
  layout: "footer"
};
</script>

<style lang="scss" scoped>
a {
  color: initial !important;
}
.static-page-tabs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  .static-page-tab {
    flex: 1;
    padding: 8px 15px;
    background: gray("800");
    border-radius: 5px 5px 0px 0px;
    border: none;
    display: block;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-right: 5px;
    text-align: center;
    max-width: 280px;
    @include transition-hover-intent();
    &.act {
      background-color: color("yellow");
      color: $black;
    }
    &:hover,
    &:focus {
      box-shadow: none;
      color: color("yellow");
      background-color: gray("700");
      text-decoration: none;
    }
  }
  @media (max-width: 991px) {
    display: flex;
    flex-direction: column;
    padding: 0px 5px;
    .static-page-tab {
      flex: 1;
      width: 100%;
      border-radius: 5px;
      margin: 0px 2.5px 5px 2.5px;
      max-width: initial;
    }
  }
}

.main-container {
  h2 {
    color: black;
  }

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
    margin: 0px;
    border-radius: 0px;
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
