<template>
  <div class="pt-5 tags-container container-fluid">
    <h1 class="header">
      Etiquetas que sigues
    </h1>
    <div class="pb-5">
      <Loading v-if="isLoading" />
      <div v-else-if="tags.length === 0 && !isLoading">
        <div class="no-result">
          <h2>No hay articulos que mostrar con esos terminos de busqueda</h2>
          <h3>Prueba más tarde.</h3>
        </div>
      </div>
      <div v-else class="d-flex flex-wrap">
        <nuxt-link
          v-for="tag in tags"
          :key="tag.tag_name"
          :to="{ name: 'tag-tagname', params: { tagname: tag.tag_name } }"
        >
          <div class="yellow-block">{{ tag.tag_name }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "../../components/core/Loading";
export default {
  name: "tags",
  components: { Loading },
  data: function() {
    return {
      tags: [],
      isLoading: true
    };
  },
  computed: {
    ...mapGetters(["loggedUser"])
  },
  mounted() {
    const username = this.loggedUser.username;
    this.$axios
      .$get(`/subscripcion/${username}`)
      .then(data => {
        this.tags = data.followed_tags;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
};
</script>

<style scoped lang="scss">
.tags-container {
  max-width: 1600px;
  a {
    color: initial;
  }
  .yellow-block {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    padding: 10px 15px;
    border: 4px solid #fad000;
    border-radius: 10px;
    color: #fad000;
    transition: 0.2s ease-in-out 0.05s;
    margin: 10px;
    cursor: pointer;
  }
}
</style>
