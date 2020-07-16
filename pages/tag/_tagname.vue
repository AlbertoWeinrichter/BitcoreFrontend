<template>
  <div class="container-fluid tag-page-container">
    <div class="topic-block">Tema</div>
    <h1>{{ tagname.replace("-", " ") }}</h1>
    <b-button class="subscribe-btn" @click="subscribe"
      >Seguir Etiqueta</b-button
    >
    <Loading v-if="isLoading" />
    <div v-else-if="publications.length === 0 && !isLoading">
      <div class="no-result">
        <h2>No hay articulos que mostrar con esos terminos de busqueda</h2>
        <h3>Prueba más tarde.</h3>
      </div>
    </div>
    <div v-else>
      <pub-listing :publist="publications"></pub-listing>
    </div>
  </div>
</template>

<script>
import Loading from "~/components/core/Loading";
import PubListing from "~/components/publication/PubListing";
export default {
  name: "TagPage",
  components: { PubListing, Loading },
  async asyncData({ route }) {
    return {
      tagname: route.params.tagname
    };
  },
  data: function() {
    return {
      currentPage: 0,
      pageSize: 12,
      totalItems: 0,
      publications: [],
      isLoading: true
    };
  },
  methods: {
    subscribe() {
      this.$axios
        .$post("seguir_etiqueta", { tag: this.tagname })
        .then(({ status }) => {
          this.$notify({
            group: "bitcore-notification",
            type: "success",
            title: "Etiqueta",
            text: status,
            position: "top left"
          });
        });
    }
  },
  mounted() {
    this.$axios
      .$get("publication_search", {params: {
          tag: this.tagname,
          offset_start: this.currentPage * this.pageSize,
          offset_end: this.currentPage + 1 * this.pageSize
        }
      })
      .then(({ publications }) => {
        this.publications = publications;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
};
</script>

<style lang="scss">
.tag-page-container {
  .topic-block {
    display: inline-block;
    font-weight: 700;
    color: #212529;
    background: #e1bb00;
    letter-spacing: 0.05em;
    font-size: 10px;
    padding: 2px 8px;
    margin-bottom: 10px;
    margin-left: 3px;
    border-radius: 5px;
    text-transform: uppercase;
  }
  .subscribe-btn {
    background: #495057;
    display: inline-block;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 8px 20px;
    color: #fad000;
    font-size: 14px;
    letter-spacing: 0.1em;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 30px;
    cursor: pointer;
    transition: 0.2s ease-in-out 0.05s;
    &:hover {
      background: #fad000;
      color: #000;
    }
  }
  h1 {
    font-weight: 700;
    color: #fad000;
    text-transform: capitalize;
  }
}
</style>
