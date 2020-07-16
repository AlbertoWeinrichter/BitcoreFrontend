<template>
  <div id="home-content" class="container-fluid">
    <div class="row home-container">
      <div class="col-lg-9 masonry-container">
        <div class="articles-row masonry wcorners">
          <div
            class="article-item"
            :class="'grid-item-w' + publ.masonry_size"
            v-for="publ in publications"
            :key="publ.slug"
          >
            <div class="inner">
              <!-- <span class="bc-t"></span> -->
              <div class="tag-wrap">
                <div class="tag-tip">
                  <fa :icon="getTagType(publ)" />
                  <div class="tag-name">{{ publ.publication_type }}</div>
                </div>
              </div>
              <nuxt-link
                :to="{ name: 'publicacion-slug', params: { slug: publ.slug } }"
              >
                <img
                  v-if="isMobile"
                  :src="mediaUrl(publ, 'search')"
                  class="art-photo"
                />
                <img
                  v-else
                  :src="mediaUrl(publ, 'masonry')"
                  class="art-photo"
                />
                <div class="art-content">
                  <h5 class="art-name">
                    <span>{{ publ.title.slice(0, 80) }}</span>
                  </h5>

                  <div class="art-subtitle">
                    <h6 class="art-author">
                      <span>por</span>
                      {{ publ.author.username }}
                    </h6>
                    <div class="art-info">
                      <span class="publ-time">
                        <fa :icon="faHeart" />
                        {{ publ.vote_total }}
                      </span>
                      <span class="publ-meta">
                        <span class="publ-comcount">
                          <fa :icon="faComment" />
                          {{ publ.comment_total }}
                        </span>
                      </span>
                      <span class="publ-time">
                        <fa :icon="faClock" />
                        {{
                          publ.publication_date | moment("from", "now", true)
                        }}
                      </span>
                    </div>
                  </div>

                  <div class="art-more">
                    <p class="art-snippet">
                      {{ publ.masonry_snippet | truncate(130) }}
                    </p>
                  </div>
                </div>
              </nuxt-link>
              <!-- <span class="bc-b"></span> -->
            </div>
          </div>
        </div>

        <div
          class="load-more-wrapper"
          v-if="!allPublicationsLoaded && !isLoading"
        >
          <button class="btn btn-primary load-more-btn" @click="loadMore">
            Cargar Más
          </button>
        </div>

        <Loading v-if="isLoading" />
      </div>

      <!--SIDE BAR-->
      <div class="col-lg-3 side-column">
        <new-articles-widget
          :publicationList="newPublications"
        ></new-articles-widget>
        <new-users-widget :newUsers="newUsers"></new-users-widget>
        <featured-quote-widget :quote="quote"></featured-quote-widget>
      </div>
      <!--SIDE BAR-->
    </div>
    <tutorial-stepper />
  </div>
</template>

<script>
import {
  faClock,
  faComment,
  faHeart,
  faBullhorn,
  faFileAlt,
  faTint
} from "@fortawesome/free-solid-svg-icons";
import { mapGetters } from "vuex";
import FeaturedQuoteWidget from "~/components/sidebar/FeaturedQuoteWidget.vue";
import NewArticlesWidget from "~/components/sidebar/NewArticlesWidget.vue";
import NewUsersWidget from "~/components/sidebar/NewUsersWidget.vue";
import Loading from "~/components/core/Loading.vue";
import TutorialStepper from "~/components/user/TutorialStepper.vue";

export default {
  name: "home",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    allPublicationsLoaded() {
      return this.publications.length >= this.totalItems;
    },
    faClock() {
      return faClock;
    },
    faComment() {
      return faComment;
    },
    faHeart() {
      return faHeart;
    },
    faBullhorn() {
      return faBullhorn;
    }
  },
  metaInfo: {
    title: "Home"
  },
  components: {
    NewUsersWidget,
    NewArticlesWidget,
    FeaturedQuoteWidget,
    Loading,
    TutorialStepper
  },
  data: function() {
    return {
      publications: [],
      isLoading: true,
      currentPage: 0,
      pageSize: 12,
      totalItems: 0,
      isMobile: false,
      quote: null
    };
  },
  async asyncData({ $axios }) {
    let [
      newUsersResponse,
      newPublicationsResponse,
      quoteResponse
    ] = await Promise.all([
      $axios.$get("/new_users"),
      $axios.$get("/new_publications"),
      $axios.$get("/quote")
    ]);
    return {
      newUsers: newUsersResponse.users,
      newPublications: newPublicationsResponse.publications,
      quote: quoteResponse.quote
    };
  },
  methods: {
    getTagType(publ) {
      switch (publ.publication_type) {
        case "noticia":
          return faFileAlt;
        case "análisis":
          return faTint;
        default:
          return faBullhorn;
      }
    },
    isMobileDevice() {
      return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
      );
    },
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
            this.pageSize}&type=masonry`
        )
        .then(response => {
          this.publications = this.publications.concat(response.publications);
          this.totalItems = response.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.isMobile = this.isMobileDevice();
    this.getPublications();
  }
};
</script>

<style lang="scss" scoped>
#home-content {
  .tag-wrap {
    filter: drop-shadow(2px 6px 3px rgba(0, 0, 0, 0.3));
    position: absolute;
    top: 0;
    left: 0;
    height: 45px;
    z-index: 2;
    width: 50px;
  }
  .tag-tip {
    &:hover {
      .tar-name {
        color: #000;
      }
    }
    background-color: $yellow;
    clip-path: polygon(15px 0, 50px 0, 50px 30px, 35px 45px, 0 50px, 0 15px);
    display: flex;
    align-items: center;
    padding: 0 15px;
    padding-left: 17px;

    transition: all 0.3s ease;
    * {
      color: #000;
    }
    .tag-name {
      font-weight: bold;
      transition: all 0.3s;
      display: none;
      margin-left: 5px;
    }
  }
  max-width: 1600px !important;
  .home-container {
    margin: 0 auto;
    .masonry-container {
      padding: 0 30px 0 0;
      @media (max-width: 991px) {
        padding-right: 0;
      }
      .articles-row {
        @media (max-width: 991px) {
          margin: 0px -15px;
        }
        .article-item {
          display: inline-block;
          height: 360px;
          overflow: hidden;
          padding: 15px;
          @media (max-width: 767px) {
            margin-bottom: -15px;
          }
          &.grid-item-w1 {
            width: 50%;
            @media (max-width: 767px) {
              width: 100%;
            }
            .inner {
              position: relative;
              .art-content {
                position: absolute;
                bottom: 0;
              }
            }
          }
          &.grid-item-w2 {
            @media (max-width: 767px) {
              width: 100%;
            }
            .inner {
              position: relative;
              overflow: hidden;
              width: 100%;
              height: 100%;
              background-color: gray("700");
              .art-content {
                clip-path: polygon(
                  0% 15px,
                  15px 0,
                  100% 0%,
                  100% 100%,
                  0 100%,
                  0% 0%
                );
                max-width: calc(50% - 30px);
                position: absolute;
                bottom: 0;
                right: 0;
              }
            }
          }
          &.grid-item-w3 {
            height: 540px;
            @media (max-width: 650px) {
              width: 100%;
              .art-content {
                max-width: none !important;
              }
            }
            .inner {
              position: relative;
              .art-content {
                clip-path: polygon(
                  0% 15px,
                  15px 0,
                  100% 0%,
                  100% 100%,
                  0 100%,
                  0% 0%
                );
                max-width: calc(50% - 30px);
                position: absolute;
                bottom: 0;
                right: 0;
              }
              overflow: hidden;
              width: 100%;
              height: 100%;
              background-color: gray("700");
            }
          }
          .inner {
            @include curcorners(15px);
            overflow: hidden;
            width: 100%;
            height: 100%;
            background-color: gray("700");
            .art-photo {
              @include transition-hover-intent-slow();
              position: relative;
              width: 100%;
              height: 100%;
              object-fit: cover;
              // filter: sepia(0.6);
            }
            .art-content {
              position: absolute;
              background: linear-gradient(to bottom, transparent, #000);

              -webkit-backdrop-filter: blur(10px);
              @include transition-hover-intent-slow();
              padding: 18px 20px 15px 20px;
              .art-name {
                font-size: 20px;
                line-height: 32px;
                margin-bottom: 10px;
                font-weight: 700;
                letter-spacing: 0.05em;
                color: $white;
                @media (max-width: 991px) {
                  font-size: 18px;
                  line-height: 28px;
                }
              }
              .art-subtitle {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 14px;
                line-height: 24px;
                .art-author {
                  font-weight: 500;
                  color: color("yellow");
                  a {
                    font-weight: 700;
                    &:hover,
                    &:active {
                      color: $white;
                      text-decoration: none;
                    }
                  }
                }
                .art-info {
                  .publ-meta,
                  .publ-time {
                    font-weight: 400;
                    display: inline-block;
                    color: $white;
                    margin-left: 15px;
                  }
                }
              }
              .art-more {
                max-height: 0;
                overflow: hidden;
                @include transition-hover-intent-slow();
                .art-snippet {
                  border-top: 1px solid gray("600");
                  font-family: "Roboto", sans-serif;
                  color: gray("500");
                  font-size: 14px;
                  line-height: 20px;
                  letter-spacing: 0.025em;
                  padding-top: 10px;
                  margin-top: 5px;
                  margin-bottom: 0px;
                }
              }
            }
            @media (min-width: 1200px) {
              &:hover {
                .tag-tip {
                  width: 130px;

                  clip-path: polygon(
                    15px 0,
                    130px 0,
                    130px 28px,
                    110px 48px,
                    0 130px,
                    0 15px
                  );
                  .tag-name {
                    text-transform: uppercase;
                    display: block;
                  }
                }
                .art-photo {
                  transform: scale(1.1);
                }
                .art-content {
                  // box-shadow: 0px -2px 10px rgba($black, 0.4);
                  .art-more {
                    top: 70px;
                    max-height: 1000px;
                  }
                }
              }
            }
          }
        }
      }
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
  .side-column {
    padding: 15px 0;
  }
}
</style>
