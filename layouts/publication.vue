<template>
  <div class="main-bg" :style="{ backgroundImage: `url(${staticUrl('bg')}` }">
    <Header :scroll="scroll"></Header>
    <main class="layout-publication-main">
      <notifications
        group="bitcore-notification"
        classes="bitcore-notification"
        position="top left"
      ></notifications>
      <nuxt />
    </main>
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

export default {
  data() {
    return {
      scroll: false
    };
  },
  components: {
    Header,
    Footer,
    CookieLaw,
    "no-ssr": NoSSR
  },
  methods: {
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
body {
  .non-styled-link {
    color: initial !important;
    text-decoration: none;
  }

  .main-bg {
    background-color: #19191c;
    background-position: 50%;
    background-repeat: repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  margin: 0;
  font-family: Montserrat, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #f8f9fa;
  text-align: left;

  .layout-publication-main {
    min-height: 70vh;
  }

  .bitcore-notification {
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 10000000;
    padding: 10px;
    margin: 50px 10px 5px;
    font-size: 12px;
    color: #ffffff;
    background: #44a4fc;
    border-left: 5px solid #187fe7;

    &.warn {
      background: #ffb648;
      border-left-color: #f48a06;
    }

    &.error {
      background: #e54d42;
      border-left-color: #b82e24;
    }

    &.success {
      background: #68cd86;
      border-left-color: #42a85f;
    }
  }
  .cookie-btn {
    background: gray("700");
    display: inline-block;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 8px 20px;
    color: color("yellow");
    font-size: 12px;
    letter-spacing: 0.1em;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    margin-right: 5px;
    &:focus {
      background: darken(color("yellow"), 10);
    }
    &.important {
      background: color("yellow");
      color: $black;
      &:hover,
      &:active,
      &:focus {
        background: darken(color("yellow"), 10);
      }
    }
  }
}
</style>
