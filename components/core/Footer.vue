<template>
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 about-wrapper">
          <h4>Acerca de Bitcore</h4>
          <p>
            ¡Bienvenido a la Resistencia del Gaming! Noticias, análisis,
            lanzamientos y muchos, muchos monstruos. 100% videojuegos, 100%
            independiente.
          </p>
          <div class="social">
            <SocialCloud />
            <patreon-support />
          </div>
          <div class="copyright">
            &copy; Copyright 2018. All rights reserved
          </div>
        </div>
        <div class="col-lg-3 links-wrapper">
          <ul>
            <li>
              <nuxt-link class="footer-link" to="/footer/prensa" exact
                >Prensa
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="footer-link" to="/footer/legal" exact
                >Legalidad
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="footer-link" to="/footer/equipo" exact
                >Equipo
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="footer-link" to="/footer/faq" exact
                >FAQs
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="footer-link" to="/footer/contacto" exact
                >Contacto
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="footer-link" to="/footer/Bitworld" exact
                >Bitworld
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SocialCloud from "~/components/core/SocialCloud.vue";
import PatreonSupport from "~/components/core/PatreonSupport.vue";

export default {
  name: "basic-footer",
  components: {
    SocialCloud,
    PatreonSupport
  }
};
</script>

<style lang="scss">
.site-footer {
  background-color: gray("800");
  background-image: url("~assets/img/footer.png");
  background-size: auto 100%;
  background-repeat: repeat-x;
  margin-top: 60px;
  padding-top: 40px;
  padding-bottom: 100px;

  @media (max-width: 767px) {
    padding-bottom: 150px;
  }

  .footer-link {
    color: #fad000;
    text-decoration: none;
    background-color: transparent;
  }

  .about-wrapper {
    padding: 10px 15px;
    h4 {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 15px;
      text-transform: uppercase;
    }
    p {
      font-family: "Roboto", sans-serif;
      color: gray("500");
      letter-spacing: 0.025em;
      font-size: 14px;
    }
    .social {
      margin-left: -20px;
      .patreon-support {
        width: 100%;
      }
    }
    .copyright {
      color: gray("500");
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }
  }
  .links-wrapper {
    ul {
      list-style-type: none;
      li {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        line-height: 24px;
        padding: 5px 15px;
        a {
          @include transition-hover-intent();
          &:hover,
          &:active {
            text-decoration: none;
            color: $white;
          }
        }
      }
      @media (max-width: 1199px) {
        padding-left: 0px;
        margin-left: -15px;
      }
    }
  }
}
</style>
