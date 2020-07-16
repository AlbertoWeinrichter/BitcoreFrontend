<template>
  <div class="container-special pt-5 pb-5">
    <h1 class="text-center head">This is test</h1>
    <h1 class="text-center head">Equipo Bitcore</h1>
    <div class="row">
      <div class="col-xs-12 main-container">
        <p>
          ¿Así que quieres conocer a los locos que andan detrás de todo esto?
          Pues este es el mejor lugar.
        </p>
        <p>
          Reunidos por IdleKnight a finales de 2016, y con unas ideas muy claras
          en mente, los cuatro miembros fundadores sentaron las bases de lo que
          se convertiría en la auténtica Resistencia del Gaming. Poco a poco más
          miembros se fueron uniendo a la familia, hasta conformar el equipo
          actual.
        </p>
        <p>
          Si quieres saber cuales son los valores de Bitcore Gaming, puedes leer
          (y sumarte) a
          <nuxt-link to="/footer/manifiesto" exact>Manifiesto</nuxt-link>
        </p>
        <div class="team-members row">
          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1536779429063_crop.jpeg"
              />
            </div>
            <div class="team-member-name">IdleKnight</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://www.facebook.com/idleknight.bitcore.3"
              >
                <fa :icon="faFacebookF" />
              </a>
              <a
                class="team-member-social-link"
                href="https://twitter.com/KnightIdle/"
              >
                <fa :icon="faTwitter" />
              </a>
            </div>
            <div class="team-member-bio">
              Cabeza de las fuerzas de asalto y perturbado teócrata. Con perfil
              de ADE, actúa como guardián de puño llameante frente a la cámara
              del tesoro. Cruzado en pos de la justicia videojueguil.
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1536777415028_crop.jpeg"
              />
            </div>
            <div class="team-member-name">The_OraCore</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://www.facebook.com/cassandrums"
              >
                <fa :icon="faFacebookF" />
              </a>
              <a
                class="team-member-social-link"
                href="https://www.instagram.com/cassandrumss/"
              >
                <fa :icon="faInstagram" />
              </a>
              <a
                class="team-member-social-link"
                href="https://twitter.com/cassandrumss"
              >
                <fa :icon="faTwitter" />
              </a>
            </div>
            <div class="team-member-bio">
              La conexión del equipo directivo con el resto de seres humanos.
              Experta en estrategia de comunicación digital y batería de
              Duendelirium. Sectaria de los clásicos literarios, la gastronomía
              gourmet y los mundos distópicos.
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1536781730664_crop.jpeg"
              />
            </div>
            <div class="team-member-name">Zeteticus Volknner</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://www.facebook.com/profile.php?id=100010756897780"
              >
                <fa :icon="faFacebookF" />
              </a>
            </div>
            <div class="team-member-bio">
              Especializado en la nigromancia más oscura (Hacking y
              Cyber-Seguridad), nuestro Archimago utiliza sus poderes para
              mantener nuestra turbina girando eternamente. Ostenta el cargo
              honorifico de “Director de asuntos Mongoles”
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1535453901069_crop.jpeg"
              />
            </div>
            <div class="team-member-name">SRG3000</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://twitter.com/Ardulcio"
              >
                <fa :icon="faTwitter" />
              </a>
              <a
                class="team-member-social-link"
                href="https://www.instagram.com/sergiogmpm/"
              >
                <fa :icon="faInstagram" />
              </a>
            </div>
            <div class="team-member-bio">
              El hombre para todo del departamento de comunicación es también un
              ávido redactor de noticias y análisis. Diseñador 3D con
              experiencia dentro y fuera del mundo de los videojuegos, es
              fánatico del buen cine y del buceo y escritor de relatos cortos.
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1543343468602_crop.jpeg"
              />
            </div>
            <div class="team-member-name">Dorilean</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://twitter.com/TheDorilean"
              >
                <fa :icon="faTwitter" />
              </a>
              <a
                class="team-member-social-link"
                href="https://www.instagram.com/dorileand"
              >
                <fa :icon="faInstagram" />
              </a>
              <a
                class="team-member-social-link"
                href="https://www.facebook.com/dorilean.enpersona"
              >
                <fa :icon="faFacebookF" />
              </a>
            </div>
            <div class="team-member-bio">
              El único analista capaz de mirarle a los ojos al abismo y regresar
              con la misma cordura con la que partió (aunque no sea mucha).
              Especialista en maquillaje de efectos especiales y modelado,
              amante del terror y la comedia, y devorador de cine y cómics.
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1543343655853_crop.jpeg"
              />
            </div>
            <div class="team-member-name">Merric</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://twitter.com/@trocolomocolo"
                ><i class="fa fa-twitter"></i
              ></a>
              <a
                class="team-member-social-link"
                href="https://www.facebook.com/guillermo.gutierrez.568"
                ><i class="fa fa-facebook"></i
              ></a>
            </div>
            <div class="team-member-bio">
              Nuestro navegante por los océanos del indie es escritor y
              filósofo, e imparte cursos de escritura. El anime, el cine, la
              gastronomía y la geopolítica (además de la literatura) son sus
              principales obsesiones.
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1543401491945_crop.jpeg"
              />
            </div>
            <div class="team-member-name">Harry</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://twitter.com/martaharry2"
                ><i class="fa fa-twitter"></i
              ></a>
              <a
                class="team-member-social-link"
                href="https://www.instagram.com/martaharry"
              >
                <fa :icon="faInstagram" />
              </a>
              <a
                class="team-member-social-link"
                href="https://www.facebook.com/martaharry"
                ><i class="fa fa-facebook"></i
              ></a>
            </div>
            <div class="team-member-bio">
              Guardiana de las palabras y látigo implacable de la corrección
              estilística, es además una adicta al cine de robots gigantes,
              terror y serie B, al rock y la electrónica cañera y siente
              verdadera predilección por la década de los 90.
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1543342343447_crop.jpeg"
              />
            </div>
            <div class="team-member-name">Oner</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://www.instagram.com/omar__oner/"
              >
                <fa :icon="faInstagram" />
              </a>
            </div>
            <div class="team-member-bio">
              Su extensa trayectoria en el mundo del diseño despega desde el
              graffiti hasta aterrizar en el diseño creativo publicitario. Se le
              puede ver dibujando, yendo al cine y escuchando rap.
            </div>
          </div>

          <div class="team-member-item col-lg-4 col-md-6">
            <div class="team-member-avatar">
              <img
                src="https://s3.eu-central-1.amazonaws.com/bitcore-static/images/avatars/1535417159737_crop.jpeg"
              />
            </div>
            <div class="team-member-name">Lady_inspiration</div>
            <div class="team-member-social">
              <a
                class="team-member-social-link"
                href="https://www.instagram.com/lady_inspiration/"
              >
                <fa :icon="faInstagram" />
              </a>
              <a
                class="team-member-social-link"
                href="https://www.instagram.com/lady_inspiration.illu"
              >
                <fa :icon="faInstagram" />
              </a>
              <a
                class="team-member-social-link"
                href="https://www.facebook.com/profile.php?id=100000290519421"
              >
                <fa :icon="faFacebookF" />
              </a>
            </div>
            <div class="team-member-bio">
              Se llama Sandra y dibuja cosas. ¡Pero qué cosas!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faInstagram,
  faFacebookF,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
export default {
  name: "equipo",
  layout: "footer",
  computed: {
    faInstagram() {
      return faInstagram;
    },
    faFacebookF() {
      return faFacebookF;
    },
    faTwitter() {
      return faTwitter;
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
  .team-members {
    margin-top: 30px;
    .team-member-item {
      text-align: center;
      padding: 15px;
      margin-bottom: 10px;
      .team-member-avatar {
        width: 120px;
        height: 120px;
        margin: 0 auto 15px auto;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 60px;
        }
      }
      .team-member-name {
        font-family: "Montserrat", sans-serif;
        font-size: 15px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 10px;
      }
      .team-member-social {
        .team-member-social-link {
          display: inline-block;
          font-size: 24px;
          margin: 0px 10px 5px 10px;
          color: gray("600");
          @include transition-hover-intent();
          &:hover,
          &:active {
            color: darken(color("yellow"), 10);
          }
        }
      }
      .team-member-bio {
        font-size: 12px;
        text-align: left;
        line-height: 22px;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid gray("600");
      }
    }
  }
}
</style>
