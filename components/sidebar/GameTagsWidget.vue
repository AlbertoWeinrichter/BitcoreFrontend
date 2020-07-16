<template>
  <bitbox
    class="game-tags-widget"
    v-if="publicationType === 'análisis'"
    btitle="Información"
  >
    <slot>
      <div v-if="tags.generalTags && tags.generalTags.length">
        <span class="tag-title">Tags</span>
        <div class="tags-container">
          <nuxt-link
            v-for="(tag, index) in tags.generalTags"
            :key="index"
            :to="{ name: 'tag-tagname', params: { tagname: tag.slug } }"
          >
            <div class="btn btn-primary btn-sm game-tag" v-line-clamp="1">
              {{ tag.name }}
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-if="tags.titles && tags.titles.length">
        <span class="tag-title">Título</span>
        <nuxt-link
          v-for="(tag, index) in tags.titles"
          :key="index"
          :to="{ name: 'tag-tagname', params: { tagname: tag.slug } }"
        >
          <div class="btn btn-primary btn-sm game-tag">
            {{ tag.name }}
          </div>
        </nuxt-link>
      </div>
      <div v-if="tags.genres && tags.genres.length">
        <span class="tag-title">Género</span>
        <nuxt-link
          v-for="(tag, index) in tags.genres"
          :key="index"
          :to="{ name: 'tag-tagname', params: { tagname: tag.slug } }"
        >
          <div class="btn btn-primary btn-sm game-tag">
            {{ tag.name }}
          </div>
        </nuxt-link>
      </div>
      <div v-if="releaseDate">
        <span class="tag-title">
          Lanzamiento {{ releaseDate | moment("DD/MM/YYYY") }}
        </span>
      </div>
      <div v-if="tags.developers && tags.developers.length">
        <span>Desarrollado por</span>
        <nuxt-link
          v-for="(tag, index) in tags.developers"
          :key="index"
          :to="{ name: 'tag-tagname', params: { tagname: tag.slug } }"
        >
          <div class="btn btn-primary btn-sm game-tag">
            {{ tag.name }}
          </div>
        </nuxt-link>
      </div>
      <div v-if="tags.publishers && tags.publishers.length">
        <span class="tag-title">Publicado por</span>
        <nuxt-link
          v-for="(tag, index) in tags.publishers"
          :key="index"
          :to="{ name: 'tag-tagname', params: { tagname: tag.slug } }"
        >
          <div class="btn btn-primary btn-sm game-tag">
            {{ tag.name }}
          </div>
        </nuxt-link>
      </div>
      <div v-if="tags.reviewPlatforms && tags.reviewPlatforms.length">
        <span class="tag-title">Analizado en</span>
        <nuxt-link
          v-for="(tag, index) in tags.reviewPlatforms"
          :key="index"
          :to="{ name: 'tag-tagname', params: { tagname: tag.slug } }"
        >
          <div class="btn btn-primary btn-sm game-tag">
            {{ tag.name }}
          </div>
        </nuxt-link>
      </div>
      <div v-if="tags.availablePlatforms && tags.availablePlatforms.length">
        <span class="tag-title">Disponible en</span>
        <nuxt-link
          v-for="(tag, index) in tags.availablePlatforms"
          :key="index"
          :to="{ name: 'tag-tagname', params: { tagname: tag.slug } }"
        >
          <div class="btn btn-primary btn-sm game-tag">
            {{ tag.name }}
          </div>
        </nuxt-link>
      </div>
    </slot>
  </bitbox>
</template>

<script>
import Bitbox from "~/components/sidebar/BaseBitbox.vue";

export default {
  props: ["tags", "releaseDate", "publicationType"],
  components: {
    Bitbox
  },
  methods: {
    searchWidget(itemName = null) {
      this.$router.push({
        name: "busqueda-term",
        params: { term: itemName || this.searchString }
      });
    }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: initial;
  &:hover {
    text-decoration: none;
  }
}
.game-tags-widget {
  .bitbox-content {
    padding: 20px;
    text-transform: uppercase;
    line-height: 36px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .tag-title {
    margin-right: 10px;
    color: gray("200");
  }
  .tags-container {
    display: flex;
    flex-wrap: wrap;
  }
  .game-tag {
    display: block;
    font-size: 12px;
    margin-right: 5px;
    padding: 6px 8px;
    border: 2px solid color("yellow");
    color: color("yellow");
    background: transparent;
    font-weight: 700;
    @include transition-hover-intent();
    &:hover,
    &:active {
      background: color("yellow");
      border-color: color("yellow");
      color: $black;
    }
  }
}
</style>
