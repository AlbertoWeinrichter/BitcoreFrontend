<template>
  <bitbox class="newarts" btitle="Nuevas publicaciones">
    <nuxt-link
      :to="{ name: 'publicacion-slug', params: { slug: art.slug } }"
      class="item media"
      v-for="art in publicationList.slice(0, 5)"
      v-bind:key="art.id"
    >
      <img
        :src="mediaUrl(art, 'thumbnail')"
        class="img-fluid img-rounded d-md-none d-lg-block"
      />
      <div class="media-body">
        <span class="art-title">{{ art.title }}</span>
      </div>
    </nuxt-link>
  </bitbox>
</template>

<script>
import Bitbox from "~/components/sidebar/BaseBitbox.vue";

export default {
  name: "new-articles-widget",
  components: {
    Bitbox
  },
  props: ["publicationList"]
};
</script>

<style lang="scss" scoped>
.newarts .media {
  padding: 16px 20px;
  display: flex;
  font-size: 12px;
  color: #777;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.02em;
  border-bottom: 1px solid #16161b;
  border-top: 1px solid #232328;
  align-items: center;
  justify-content: center;

  @include transition-hover-intent();
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  .art-title {
    padding-left: 10px;
    display: block;
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: gray("200");
    @include transition-hover-intent();
  }
  .art-subtitle {
    display: block;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.025em;
    color: gray("600");
    @include transition-hover-intent();
  }
  &.active {
    display: none;
  }
  .bitbox-inner {
    height: 100%;
  }
  &:hover,
  &:active {
    text-decoration: none;
    .art-title {
      color: color("yellow");
    }
    .art-subtitle {
      color: gray("200");
    }
  }
}
</style>
