<template>
  <div class="search-filter bc-container-fluid">
    <div class="pt-5 pb-5">
      <h1 class="header-search">Búsqueda: {{ term }}</h1>
      <div class="search-wrapper">
        <div style="width: 200px">
          <input
            placeholder="¿Que estas buscando?"
            v-model="term"
            class="main-search"
            @focus="onFocusField"
            @keyup="searchWidget"
          />
          <div
            v-if="showSuggestions"
            id="suggestion-box-big"
            class="suggestion-box big"
          >
            <div
              class="suggestion"
              v-for="suggestion in suggestions"
              @click="handleClickSuggestion(suggestion.title)"
              :key="suggestion.title"
            >
              {{ suggestion.title }}
            </div>
          </div>
        </div>
        <button
          style="margin-left: 10px"
          class="advanced-search-button important"
          @click="fetchSearchList"
        >
          Buscar
        </button>
      </div>
      <Loading v-if="isLoading" />
      <div v-if="searchResults">
        <section>
          <h2>Análisis</h2>
          <pub-listing :publist="searchResults.publications"></pub-listing>
          <!-- <b-pagination
            align="center"
            v-if="searchResults.publications > showItemCount"
            v-on:input="changePage"
            :total-rows="totalItems"
            v-model="currentPage"
            :per-page="showItemCount"
          >
          </b-pagination> -->
        </section>
      </div>
      <div v-else-if="searchResults && !searchResults.publications.length">
        <div class="no-result">
          <h2>No hay nada que mostrar con esos terminos de busqueda</h2>
          <h3>Prueba más tarde.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PubListing from "~/components/publication/PubListing.vue";
import ProfileCard from "~/components/user/ProfileCard.vue";
import Loading from "../../components/core/Loading";

export default {
  name: "busqueda-term",
  components: {
    Loading,
    PubListing,
      ProfileCard //eslint-disable-line
  },
  validate({ params }) {
    // Must be a number
    return /\d*/.test(params.term);
  },
  metaInfo() {
    return {
      title: this.publication.title
    };
  },
  asyncData({ params }) {
    return {
      term: params.term
    };
  },
  data: function() {
    return {
      term: null,
      suggestions: [],
      searchString: "",
      searchResults: null,
      isLoading: false,
      showSuggestions: false,
      currentPage: 0,
      pageSize: 12,
      totalItems: 0
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"])
  },
  methods: {
    loadMore() {
      this.currentPage++;
      this.getPublications();
    },
    onFocusField() {
      this.showSuggestions = true;
    },
    handleClickSuggestion(suggestion) {
      this.suggestions = [];
      this.term = suggestion;
      this.fetchSearchList();
    },
    searchWidget() {
      if (this.term.length > 1) {
        this.showSuggestions = true;
        this.fetchSuggestions();
      }
    },

    fetchSuggestions: function() {
      let params = {
        search_string: this.term
      };
      this.$axios
        .$get("/autocomplete_publication", { params })
        .then(response => {
          this.suggestions = response.results;
          this.totalItems = response.total;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.$notify({
            group: "main",
            type: "error",
            title: "Error",
            text: "Algo ha ido mal... No se pudieron cargar las sugerencias"
          });
        });
    },

    fetchSearchList: function() {
      this.searchResults = null;
      this.isLoading = true;
      this.$axios
        .$get(
          `/publication_search?offset_start=${this.currentPage *
            this.pageSize}&offset_end=${(this.currentPage + 1) *
            this.pageSize}&type=analisis&search_string=${this.term}`
        )
        .then(response => {
          this.searchResults = response;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.$notify({
            group: "main",
            type: "error",
            title: "Error",
            text: "Algo ha ido mal... No se pudieron cargar las sugerencias"
          });
        })
        .finally(() => (this.isLoading = false));
    },
    setSuggestionBoxListener() {
      $(document).mouseup(e => {
        const container = $("#suggestion-box-big");
        const input = $(".main-search");
        if (
          !container.is(e.target) &&
          container.has(e.target).length === 0 &&
          this.showSuggestions === true &&
          !input.is(e.target) &&
          input.has(e.target).length === 0
        ) {
          this.showSuggestions = false;
        }
      });
    }
  },
  mounted: function() {
    this.fetchSearchList();
    this.setSuggestionBoxListener();
  }
};
</script>

<style lang="scss">
h1.header-search {
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 15px;
  color: #fad000;
}
h2.header-search {
  color: white;
  margin-bottom: 15px;
}
.search-wrapper {
  align-items: center;
  display: flex;
  label {
    font-size: 12px;
    line-height: 20px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #adb5bd;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  input {
    outline: none;
    padding: 5px 15px;
    background: #495057;
    border: none;
    border-radius: 10px;
    width: 100%;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.025em;
    color: #fad000;
    transition: 0.4s ease-in-out;
  }
}
.advanced-search-button {
  margin-top: 5px;
  background: gray("700");
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 8px 20px;
  color: color("yellow");
  font-size: 14px;
  letter-spacing: 0.1em;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  @include transition-hover-intent();
  &:hover,
  &:active,
  &:focus {
    background: color("yellow");
    color: $black;
    text-decoration: none;
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
.advanced-search {
  margin-top: -15px;
  margin-bottom: 30px;
  .advanced-search-wrapper {
    margin: -15px -10px 30px -10px;
    .col-12 {
      padding: 0 10px;
    }
    h2 {
      margin-bottom: 10px;
    }
    .search-field-item {
      padding: 0 10px;
      margin-bottom: 15px;
      label {
        display: inline-block;
        font-size: 12px;
        line-height: 20px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: gray("500");
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        @media (max-width: 767px) {
          font-size: 10px;
          line-height: 16px;
        }
      }
      input {
        outline: none;
        padding: 5px 15px;
        background: gray("700");
        border: none;
        border-radius: 10px;
        width: 100%;
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.025em;
        color: color("yellow");
        @include transition-fast();
        &:focus {
          background: gray("300");
          color: $black;
        }
      }

      b-dropdown {
        outline: none;
        padding: 5px 15px;
        background: gray("700");
        border: none;
        border-radius: 10px;
        width: 100%;
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.025em;
        color: color("yellow");
        @include transition-fast();
        &:focus {
          background: gray("300");
          color: $black;
        }
      }

      .suggestion-box.big {
        max-width: 300px;
        width: 100%;
        /*width: calc(100% - 20px);*/
        z-index: 100;
        background: rgba(gray("700"), 0.8);
        -webkit-backdrop-filter: blur(10px);
        position: absolute;
        margin-top: 10px;
        border-radius: 10px;
        overflow: hidden;
        .suggestion {
          padding: 10px 15px;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0.05em;
          color: gray("300");
          font-weight: 600;
          @include transition-hover-intent();
          i {
            color: gray("500");
            margin-right: 2px;
          }
          &:not(:last-of-type) {
            border-bottom: 1px solid gray("600");
          }
          &:hover {
            background-color: color("yellow");
            color: gray("900");
          }
        }
      }
    }
    .search-submit-item {
      padding: 0 5px;
      .advanced-search-button {
        margin-left: 5px;
      }
      @media (max-width: 767px) {
        font-size: 0;
        padding: 0 5px;
        .advanced-search-button {
          display: inline-block;
          margin: 0 5px;
          width: calc(50% - 10px);
          text-align: center;
        }
      }
    }
  }
}

.suggestion-box.big {
  z-index: 100;
  background: rgba(gray("700"), 1);
  -webkit-backdrop-filter: blur(10px);
  position: absolute;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  .suggestion {
    cursor: pointer;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: gray("300");
    font-weight: 600;
    @include transition-hover-intent();
    i {
      color: gray("500");
      margin-right: 2px;
    }
    &:not(:last-of-type) {
      border-bottom: 1px solid gray("600");
    }
    &:hover {
      background-color: color("yellow");
      color: gray("900");
    }
  }
}

section {
  margin-bottom: 30px;
  .users-row {
    margin: 0px -10px;
    .user-profile-container {
      padding: 0 10px;
      margin-bottom: 20px;
    }
  }
}

.search-filter {
  .filter-container {
    margin: 0 auto;
    max-width: 1500px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
