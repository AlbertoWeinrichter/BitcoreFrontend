<template>
  <div>
    <Header :scroll="scroll"></Header>
    <main class="layout-footer-main">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/core/Header.vue";
import Footer from "~/components/core/Footer.vue";

export default {
  data() {
    return {
      scroll: false
    };
  },
  components: {
    Header,
    Footer
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
body {
  .non-styled-link {
    color: initial !important;
    text-decoration: none;
  }
  background-color: #19191c;
  background-position: 50%;
  background-repeat: repeat;
  background-size: cover;
  background-attachment: fixed;

  margin: 0;
  font-family: Montserrat, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #f8f9fa;
  text-align: left;

  .layout-footer-main {
    min-height: 70vh;
    max-width: 1200px;
    margin: 50px auto;
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
