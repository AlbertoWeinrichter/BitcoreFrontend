<template>
  <Loading text="Iniciando sesión" />
  <!--<p>Signing in...</p>-->
</template>

<script>
import { extractInfoFromHash } from "~/services/auth"; //eslint-disable-line
import { mapMutations } from "vuex";
import Cookie from "js-cookie";
import Loading from "../../components/core/Loading";
import { setInterceptor } from "../../plugins/axios";

export default {
  name: "acceso",
  components: { Loading },
  computed: {
    ...mapMutations(["SET_USER"])
  },
  mounted() {
    // save auth0 answer in a cookie
    const token = extractInfoFromHash();
    Cookie.set("bitcore_jwt", token.token);
    window.localStorage.setItem("bitcore_jwt", token.token);

    // grab complete user from bitcore DB
    setInterceptor(token.token, this.$axios);
    this.fetchBitcoreUser();
  },
  methods: {
    async fetchBitcoreUser() {
      try {
        const response = await this.$axios.$get(`/login`);
        this.$store.commit("SET_USER", response);
        this.$router.replace("/");
      } catch (e) {
        this.$nuxt.error({ statusCode: 500 });
        this.$store.commit("CLEAR_SESSION");
        Cookie.remove("bitcore_jwt");
        localStorage.removeItem("bitcore_jwt");
      }
    }
  }
};
</script>
