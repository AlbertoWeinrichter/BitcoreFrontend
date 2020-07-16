<template>
  <div>
    <nuxt />

    <Footer></Footer>

    <no-ssr>
      <Websocket />
      <cookie-law theme="dark-lime">
        <div slot-scope="props">
          <!-- TODO: Is this slot-scope thingy really needed? -->
          <!-- TODO: cookie buttons should make sense -->
          <p>
            Esta web utiliza cookies propias y de terceros (concretamente de
            Google Analytics Y Facebook). Continuar navegando implica la
            aceptación de nuestra Política de Cookies 🍪🍪🍪
          </p>
          <div @click="props.accept" class="cookie-btn important">
            Entendido
          </div>
          <div class="cookie-btn" @click="props.close">
            <nuxt-link class="non-styled-link" to="/footer/legal">
              ¿Desea saber mas?
            </nuxt-link>
          </div>
        </div>
      </cookie-law>
    </no-ssr>
  </div>
</template>

<script>
import CookieLaw from "vue-cookie-law";
import Header from "~/components/core/Header.vue";
import Footer from "~/components/core/Footer.vue";
import NoSSR from "vue-no-ssr";
import Websocket from "../components/core/Websocket";

export default {
  data() {
    return {
      scroll: false
    };
  },
  components: {
    Websocket,
    Header,
    Footer,
    CookieLaw,
    "no-ssr": NoSSR
  },
  methods: {
    runNotify() {},
    isMasonry() {
      if (this.$route.path === "/") {
        return true;
      }
    },
    scrolled() {
      if (this.isMasonry()) {
        if (window.scrollY > 350) {
          this.scroll = true;
        } else {
          this.scroll = false;
        }
      } else {
        if (window.scrollY > 50) {
          this.scroll = true;
        } else {
          this.scroll = false;
        }
      }
    }
  },
  head() {
    return {
      title: "Bitcore Gaming",
      meta: [
        { name: "application-name", content: "Bitcore Gaming" },
        {
          name: "description",
          content: "Lorem ipsum"
        },

        // Twitter
        {
          name: "twitter:image",
          content: this.getDefaultMetaImage()
        },
        { name: "twitter:title", content: "Bitcore Gaming" },
        {
          name: "twitter:description",
          content: "Lorem ipsum"
        },

        // Facebook
        { property: "og:title", content: "Bitcore Gaming" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: this.getDefaultMetaImage()
        },
        {
          property: "og:image:alt",
          content: this.getDefaultMetaImage()
        },
        {
          property: "og:url",
          content: "https://bitcoregaming.com"
        },
        {
          property: "fb:app_id",
          content: "489096128253994"
        }
      ]
    };
  },
  created() {
    if (process.browser) {
      window.addEventListener("scroll", this.scrolled);
    }
    this.isMasonry();
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener("scroll", this.scrolled);
    }
  }
};
</script>

<style lang="scss">
.site-footer {
  margin-top: 0px !important;
}
</style>
