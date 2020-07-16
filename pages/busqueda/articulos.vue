<template>
  <div class="search-filter container-fluid pt-5">
    <h1 class="header">Artículos</h1>
    <div class="pb-5">
      <div v-if="publications.length === 0 && !isLoading">
        <div class="no-result">
          <h2>No hay artículos que mostrar con esos terminos de busqueda</h2>
          <h3>Prueba más tarde.</h3>
        </div>
      </div>
      <div>
        <pub-listing :publist="publications"></pub-listing>
        <!-- <b-pagination
          align="center"
          v-if="publications.length > showItemCount"
          v-on:input="changePage"
          :total-rows="totalItems"
          v-model="currentPage"
          :per-page="showItemCount"
        ></b-pagination> -->
        <div
          class="load-more-wrapper"
          v-if="!isLoading && !allPublicationsLoaded"
        >
          <button
            v-if="!isLoading"
            class="btn btn-primary load-more-btn"
            @click="loadMore"
          >
            Cargar Más
          </button>
        </div>
        <Loading v-if="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import PubListing from "~/components/publication/PubListing.vue";
import Loading from "~/components/core/Loading";

export default {
  name: "busqueda-articulos",
  components: {
    Loading,
    PubListing
  },
  data: function() {
    return {
      isLoading: true,
      currentPage: 0,
      pageSize: 12,
      totalItems: 0,
      publications: []
    };
  },
  computed: {
    allPublicationsLoaded() {
      return this.publications.length >= this.totalItems;
    }
  },
  methods: {
    loadMore() {
      this.currentPage++;
      this.getPublications();
    },
    getPublications() {
      this.isLoading = true;
      this.$axios
        .$get(
          `/publication?offset_start=${this.currentPage *
            this.pageSize}&offset_end=${(this.currentPage + 1) *
            this.pageSize}&type=articulos`
        )
        .then(response => {
          this.publications = this.publications.concat(response.publications);
          this.totalItems = response.total;
        })
        .finally(() => {
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.$notify({
            group: "main",
            type: "error",
            title: "Error",
            text: "Algo ha ido mal...No se pudieron cargar los resultados"
          });
        });
    }
  },
  mounted() {
    this.getPublications();
  }
};
</script>

<style lang="scss">
.search-filter {
  .filter-container {
    margin: 0 auto;
    max-width: 1500px;
  }
  .pagination {
    margin-top: 10px;
  }
}

.load-more-wrapper {
  text-align: center;
  margin: 30px 0;

  .load-more-btn {
    color: #212529;
    background-color: #fad000;
    border-color: #fad000;
    font-weight: bold;
  }
}
</style>
