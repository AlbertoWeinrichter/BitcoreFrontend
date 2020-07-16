<template>
  <div class="article-details">
    <social-sharing v-bind:url="getMediaLink" inline-template>
      <div class="media-buttons">
        <network network="facebook">
          <div class="share-facebook media-button">
            <img src="~assets/img/facebook.png" style="max-width: 100%" />
          </div>
        </network>
        <network network="twitter">
          <div class="share-twitter media-button">
            <img src="~assets/img/twitter.svg" style="max-width: 100%" />
          </div>
        </network>
      </div>
    </social-sharing>

    <b-modal
      lazy
      class="score-info-modal"
      ref="scoreModal"
      id="scoreModal"
      :title="selectedScore.name"
      ok-only
      ok-title="Leer Más"
      @ok="scoreReadMore"
    >
      <div class="score-images">
        <div
          class="score-image"
          v-for="index in 5"
          :class="{ greyout: index !== selectedScore.value }"
        >
          <img
            :src="staticUrl(`scores/${selectedScore.name}_${index}_300x442`)"
            class="img-fluid"
            alt=""
          />
        </div>
      </div>
      <div class="score-description">
        {{ selectedScore.description }}
      </div>
    </b-modal>
    <div class="article-top-banner">
      <img
        v-if="publication"
        class="hero-image"
        :src="mediaUrl(publication, 'main')"
      />

      <div class="container-fluid inner">
        <h1 class="article-title">{{ publication.title }}</h1>
        <h2 class="article-subtitle" v-if="publication.subtitle">
          {{ publication.subtitle }}
        </h2>
        <div class="tags text-center">
          <div class="text-center article-meta">
            <span class="publ-meta">
              <fa :icon="faHeart" />
              {{ getLikeCount }}
            </span>
            <span class="publ-meta">
              <fa :icon="faComment" />
              {{ publication.comment_total }}
            </span>
            <span class="publ-time">
              <fa :icon="faClock" />
              {{ publication.publication_date | moment("ll") }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid article-container" id="article-container">
      <div class="row article-wrapper">
        <div class="col-xl-9 article-part-main" id="article-maindiv">
          <div class="main-article-content">
            <main v-html="publication.content"></main>
          </div>

          <!--Pros & Cons-->
          <div v-if="isReview" class="article-procons">
            <div class="separator"></div>
            <div class="procon-title">PROS</div>
            <div v-for="item in articlePros" :key="item.id" class="procon-item">
              <span class="circle-icon green">
                <fa :icon="faPlus" />
              </span>
              <span>{{ item.content }}</span>
            </div>

            <br />

            <div class="procon-title">CONTRAS</div>
            <div v-for="item in articleCons" :key="item.id" class="procon-item">
              <span class="circle-icon red">
                <fa :icon="faMinus" />
              </span>
              <span>{{ item.content }}</span>
            </div>
          </div>
          <!--Pros & Cons-->

          <!--Scores-->
          <div
            v-if="publication.scores && publication.scores.length > 0"
            class="article-scores"
          >
            <div class="separator"></div>
            <div class="score-boxes-wrapper row">
              <div
                v-for="(score, index) in publication.scores"
                :key="index"
                class="score-item col-lg-3 "
              >
                <div class="score-box text-center">
                  <div class="score-box-inner">
                    <div class="score-img-wrapper">
                      <div class="score-img">
                        <div @click="showScoreModal(score, index)">
                          <img
                            :src="
                              staticUrl(
                                'scores/' +
                                  score.name +
                                  '_' +
                                  score.value +
                                  '_300x442'
                              )
                            "
                            class="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="score-name">
                    {{ score.name }}
                  </div>
                  <div class="score-value">
                    <span class="price">{{ score.value }}/5</span>
                  </div>
                  <div class="score-description">
                    <p>
                      {{ score.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--VOTE BUTTON-->
          <div class="vote-button-wrapper" v-if="!articleVoted">
            <div class="separator"></div>
            <button
              class="like-button"
              :disabled="articleVoted"
              @click="voteArticle"
            >
              <img :src="staticUrl('like_button')" alt="me_gusta" />
            </button>
          </div>
          <div class="voted-indication-wrapper" v-else>
            <div class="separator"></div>
            <span>A ti te gusta esta publicación</span>
          </div>
          <!--VOTE BUTTON-->

          <!--RELATED CONTENT-->
          <div class="related-content-container">
            <section>
              <pub-listing :publist="relatedArticles"></pub-listing>
            </section>
          </div>
          <!--RELATED CONTENT-->

          <!--COMMENTS-->
          <article-comments
            :comments="comments"
            :publication="publication"
            :slug="slug"
          ></article-comments>
          <!--COMMENTS-->
        </div>

        <!--RIGHT SIDEBAR-->
        <div class="col-xl-3 article-part-sd article-part-right">
          <!--SCORE LEVELS WIDGET-->
          <score-bitbox
            class="text-center"
            btitle="Puntuaciones"
            v-if="publication.scores && publication.scores.length > 0"
          >
            <div class="d-flex flex-wrap justify-content-center">
              <div
                class="score-widget-item item media"
                v-for="(score, index) in publication.scores"
                @click="showScoreModal(score, index)"
              >
                <div class="score-img">
                  <img
                    :src="
                      staticUrl(
                        'scores/' + score.name + '_' + score.value + '_250x250'
                      )
                    "
                    class="img-fluid rounded-circle"
                    alt="SCORE"
                  />
                </div>

                <div class="media-body" :title="score.description">
                  <div class="score-name">{{ score.name }}</div>
                  <span class="price">{{ score.value }}/5</span>
                </div>
              </div>
            </div>
          </score-bitbox>
          <!--SCORE LEVELS WIDGET-->

          <!--AUTHOR INFO WIDGET-->
          <AuthorWidget class="stickybox" :author="publication.author">
          </AuthorWidget>
          <!--AUTHOR INFO WIDGET-->

          <!--GAME TAGS WIDGET-->
          <game-tags-widget
            :tags="gameTags"
            :publicationType="publication.publication_type"
            :releaseDate="publication.game_release_date"
          ></game-tags-widget>
          <!--GAME TAGS WIDGET-->

          <!--NEW CONTENT WIDGET-->
          <new-articles-widget
            :publicationList="newPublications"
          ></new-articles-widget>
          <!--NEW CONTENT WIDGET-->
        </div>
        <!--RIGHT SIDEBAR-->
      </div>
    </div>
  </div>
</template>

<script>
import {
  faClock,
  faComment,
  faHeart,
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import AuthorWidget from "~/components/sidebar/AuthorWidget.vue";
import NewArticlesWidget from "~/components/sidebar/NewArticlesWidget.vue";
import GameTagsWidget from "~/components/sidebar/GameTagsWidget.vue";
import ScoreBitbox from "~/components/sidebar/ScoreBitbox.vue";
import ArticleComments from "~/components/publication/ArticleComments.vue";
import PubListing from "~/components/publication/PubListing.vue";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "publicacion",
  layout: "publication",
  components: {
    ArticleComments,
    AuthorWidget,
    NewArticlesWidget,
    PubListing,
    GameTagsWidget,
    ScoreBitbox
  },
  data: function() {
    return {
      shareUrl: "https://bitcoregaming.com" + this.$router.currentRoute.path,
      selectedScore: {
        name: ""
      },
      selectedScoreIndex: 0
    };
  },
  async asyncData({ $axios, route }) {
    let [
      articleResponse,
      commentsResponse,
      newPublicationsResponse
    ] = await Promise.all([
      $axios.$get("/pub_details/" + route.params.slug),
      $axios.$get("/comentarios/publication/" + route.params.slug),
      $axios.$get("/new_publications")
    ]);

    return {
      publication: articleResponse.publication,
      pageTitle: articleResponse.publication.title,
      relatedArticles: articleResponse.related,
      gameTags: {
        generalTags: articleResponse.publication.tags,
        titles: articleResponse.publication.title_tag.slice(0, 1),
        genres: articleResponse.publication.genre_tags,
        developers: articleResponse.publication.developer_tags.slice(0, 1),
        publishers: articleResponse.publication.publisher_tags.slice(0, 1),
        reviewPlatforms: articleResponse.publication.review_platform_tags.slice(
          0,
          1
        ),
        availablePlatforms: articleResponse.publication.available_platform_tags
      },
      comments: commentsResponse.comments,
      newPublications: newPublicationsResponse.publications,
      slug: route.params.slug
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    getMediaLink() {
      if (!process.server) {
        return window.location.href;
      } else return "";
    },
    faMinus() {
      return faMinus;
    },
    faPlus() {
      return faPlus;
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
    isReview() {
      if (
        this.publication.publication_type === "noticia" ||
        this.publication.publication_type === "articulo"
      ) {
        return false;
      } else {
        return true;
      }
    },
    articleVoted() {
      return this.publication && this.publication.publication_votes.voted;
    },
    articlePros() {
      return _.filter(this.publication.pros_and_cons, { type: "pro" });
    },
    articleCons() {
      return _.filter(this.publication.pros_and_cons, { type: "con" });
    },
    getLikeCount() {
      // No need in this state changed !!!
      // if (!this.likeCount) {
      //   this.likeCount = this.publication.publication_votes.total;
      // }
      return this.likeCount || this.publication.publication_votes.total;
    }
  },
  methods: {
    voteArticle() {
      if (this.isAuthenticated) {
        this.$axios
          .$post("/voto_publicacion", {
            publication: this.publication.id,
            value: 1
          })
          .then(el => {
            this.publication.publication_votes.voted = true;
          });
      } else {
        this.$router.push({
          name: "usuario-login"
        });
      }
    },
    showScoreModal(score, index) {
      this.selectedScore = score;
      this.selectedScoreIndex = index;
      this.$refs.scoreModal.show();
    },
    get_slug() {
      var slug = this.selectedScore.name;
      switch (this.selectedScore.name) {
        case "ambientacion":
          slug = "nivel_ambientacion";
          break;
        case "terror":
          slug = "nivel_terror";
          break;
        case "adiccion":
          slug = "nivel_adiccion";
          break;
        case "combate":
          slug = "nivel_combate";
          break;
        case "dificultad":
          slug = "nivel_dificultad";
          break;
        case "equipo":
          slug = "nivel_equipo";
          break;
        case "estrategia":
          slug = "nivel_estrategia";
          break;
        case "monstruos":
          slug = "nivel_monstruos";
          break;
        case "narrativa":
          slug = "nivel_narrativa";
          break;
        case "puzzles":
          slug = "nivel_puzzles";
          break;
      }
      return slug;
    },
    scoreReadMore() {
      let slug = this.get_slug();
      this.$router.push("/publicacion/" + slug);
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        { name: "application-name", content: "Bitcore Gaming" },
        {
          name: "description",
          content: this.publication.title
            .replace(/<\/?[^>]+(>|$)/g, "")
            .substring(0, 300)
        },

        // Twitter
        {
          name: "twitter:image",
          content: this.mediaUrl(this.publication, "rrss")
        },
        { name: "twitter:title", content: this.publication.title },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:description",
          content: this.publication.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .substring(0, 300)
        },

        // Facebook
        { property: "og:title", content: this.publication.title },
        { property: "og:type", content: "article" },
        {
          property: "og:description",
          content: this.publication.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .substring(0, 300)
        },
        {
          property: "og:image",
          content: this.mediaUrl(this.publication, "rrss")
        },
        {
          property: "og:image:alt",
          content: this.mediaUrl(this.publication, "search")
        },
        {
          property: "og:url",
          content:
            "https://bitcoregaming.com/publicacion/" + this.publication.slug
        },
        {
          property: "fb:app_id",
          content: "489096128253994"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
#scoreModal {
  .modal-header {
    display: flex;
    justify-content: center;
    button.close {
      position: absolute;
      right: 20px;
    }
  }
  .modal-title {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }
  .modal-dialog {
    @media (min-width: 991px) {
      max-width: 940px !important;
    }
  }
  .btn-primary {
    background: $yellow !important;
    border: none;
    color: #19191c;
    padding: 10px 25px;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
  }
  .score-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    .score-image {
      margin: 5px;
      width: 160px;
      border: 3px solid color("yellow");
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 1px 2px 15px rgba($black, 0.15);
      img {
        width: 100%;
        height: auto;
      }
      &.greyout {
        filter: grayscale(100%) contrast(80%) brightness(0.7);
      }
    }
    @media (max-width: 991px) {
      padding: 0px;
      justify-content: center;
      .score-image {
        width: 120px;
      }
    }
  }
  .score-description {
    margin: 10px 15px 10px 15px;
    border-top: 1px solid gray("700");
    padding-top: 15px;
    font-family: "Merriweather", serif;
    font-weight: 300;
    font-size: 15px !important;
    line-height: 28px;
    color: gray("400");
    letter-spacing: 0.02em;
    @media (max-width: 767px) {
      font-size: 14px !important;
    }
    @media (max-width: 991px) {
      margin-left: 0;
      margin-right: 0;
    }
  }
}

@media (max-width: 1200px) {
  .article-part-right {
    margin-top: 30px;
  }
}

.score-images {
  display: flex;
}

.article-details {
  .media-buttons {
    position: fixed;
    right: 20px;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    .share-facebook {
      background: #3b5998;
    }
    .share-twitter {
      background: #1da1f2;
    }
    .media-button {
      cursor: pointer;
      padding: 10px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .media-icon {
      font-size: 25pt;
    }
  }
  @media (max-width: 767px) {
    .sidebar-menu {
      display: none;
      padding: 0 25px;
    }
  }
  .article-top-banner {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: gray(800);
    min-height: 500px;
    text-align: center;
    position: relative;
    // Margin reduced due to container's padding-left
    @media (max-width: 767px) {
      min-height: 200px;
    }
    .tags {
      margin: 15px auto;
      .btn {
        margin: 4px;
        font-weight: 600;
      }
    }
    .hero-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.6;
    }

    h1.article-title {
      font-size: 48px;
      line-height: 64px;
      margin: 0px 15px;
      letter-spacing: 0.05em;
      color: $white;
      text-shadow: 0 2px 10px rgba($black, 0.6);
      @media (max-width: 767px) {
        font-size: 24px;
        line-height: 32px;
        margin-top: 50px;
      }
    }
    h2.article-subtitle {
      font-size: 24px;
      line-height: 48px;
      margin: auto;
      letter-spacing: 0.025em;
      color: color("yellow");
      text-transform: capitalize;
      text-shadow: 0 2px 5px rgba($black, 0.4);
      @media (max-width: 767px) {
        font-size: 18px;
        line-height: 26px;
      }
    }
    .article-meta {
      padding: 10px 15px 100px 15px;
      color: #fff;
      font-size: 14px;
      line-height: 24px;
      text-shadow: 0 2px 4px rgba($black, 0.3);
      font-weight: 500;
      .publ-meta,
      .publ-time {
        margin: 13px 20px;
      }
    }
    .inner {
      padding: 200px 20px 30px;
      color: #fff;
      position: relative;
      @media (max-width: 767px) {
        padding: 60px 15px 20px;
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: inline-block;
      background: rgba(0, 0, 0, 0.6);
      z-index: 0;
    }
  }
}

.article-container {
  display: flex;
  justify-content: center;
  .article-wrapper {
    max-width: 1600px;
    padding: 30px 15px;
    @media (max-width: 767px) {
      padding: 15px 0;
    }
  }
}

.article-part-main {
  //background: linear-gradient(#e6e6e6, #eeeeee, #fafafa, #ffffff);
  @media (max-width: 767px) {
    padding: 0 !important;
    margin-top: -15px;
    .main-article-content {
      border-radius: 0px !important;
    }
  }
  .main-article-content {
    background: gray("200");
    padding: 60px;
    border-radius: 2px 2px 0 0;
    @media (max-width: 767px) {
      padding: 20px;
    }
    main {
      .half-width {
        @media (min-width: 1199px) {
          display: inline-block;
          vertical-align: middle;
          width: 50%;
        }
      }
      .one-third {
        @media (min-width: 1199px) {
          display: inline-block;
          vertical-align: middle;
          width: 33%;
        }
      }
      .two-thirds {
        @media (min-width: 1199px) {
          display: inline-block;
          vertical-align: middle;
          width: 66%;
        }
      }
      img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }
      /* article content element styles */
      p {
        font-family: "Merriweather", serif;
        font-weight: 300;
        font-size: 15px !important;
        line-height: 28px;
        color: $black;
        letter-spacing: 0.02em;
        @media (max-width: 767px) {
          font-size: 14px !important;
        }
        strong {
          font-weight: 700;
        }
        a {
          color: color("blue");
          &:hover {
            text-decoration: underline;
          }
        }
      }
      em {
        font-family: "Merriweather", serif;
        font-weight: 300;
        font-style: italic;
        color: gray("700");
        letter-spacing: 0.02em;
      }
      table {
        margin-bottom: 20px;
        td {
          font-family: "Merriweather", serif;
          font-weight: 300;
          font-size: 15px !important;
          line-height: 28px;
          color: $black;
          letter-spacing: 0.02em;
          @media (max-width: 767px) {
            font-size: 14px !important;
          }
        }
      }
      .quote-class {
        padding: 0px 50px;
        position: relative;

        font-size: 24px !important;
        line-height: 36px;
        color: gray("600");
        font-style: italic;
        padding: 50px 30px;

        &::before {
          font-family: "Roboto", sans-serif;
          content: "“";
          font-size: 120px !important;
          color: darken(color("yellow"), 5);
          position: absolute;
          top: 30px;
          left: 20px;
        }
        &::after {
          font-family: "Roboto", sans-serif;
          content: "„";
          font-size: 120px !important;
          color: darken(color("yellow"), 5);
          position: absolute;
          bottom: 30px;
          right: 20px;
        }
        @media (max-width: 991px) {
          padding: 0px 20px;
          p {
            font-size: 18px !important;
            line-height: 28px !important;
            padding: 20px 15px;
          }
          &::before {
            font-size: 48px !important;
            top: 10px;
            left: 10px;
          }
          &::after {
            font-size: 48px !important;
            right: 10px;
            bottom: 10px;
          }
        }
      }
    }
    .fr-rounded {
      border-radius: 10px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      -moz-background-clip: padding;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
    }

    .fr-shadow {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 1px 1px rgba(0, 0, 0, 0.16);
    }
  }
}

.separator {
  border-top: 2px dashed gray("600");
  margin-bottom: 60px;
  width: 100%;
  @media (max-width: 767px) {
    margin-bottom: 20px;
  }
}

.article-procons {
  background: linear-gradient(gray("200"), $white);
  color: black;
  font-size: 16px;
  line-height: 24px;
  margin: 0px;
  padding: 0px 60px 60px 60px;
  @media (max-width: 767px) {
    padding: 0px 20px 20px 20px;
  }

  .procon-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 15px;
  }

  .procon-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 5px;
    font-family: "Merriweather", serif;
    letter-spacing: 0.02em;
    font-weight: 300;
  }

  .circle-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    flex-shrink: 0;
    &.green {
      background-color: color("green");
    }
    &.red {
      background-color: color("red");
    }
    i {
      color: $white;
      margin-top: 1px;
    }
  }
}

.article-scores {
  background-color: $white;
  padding: 0px 60px 60px 60px;
  @media (max-width: 767px) {
    padding: 0px 20px 20px 20px;
  }
  .score-boxes-wrapper {
    margin: 0px -10px;
    .score-item {
      padding: 0px;
      .score-box {
        padding: 0px 10px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
        .score-box-inner {
          padding: 4px;
          background-color: color("yellow");
          border-radius: 15px;
          box-shadow: 1px 2px 15px rgba($black, 0.15);
          position: relative;
          @include transition-hover-intent-slow();
          .score-img-wrapper {
            overflow: hidden;
            border-radius: 12px;
          }
          @media (min-width: 1200px) {
            &:hover {
              box-shadow: 2px 4px 20px rgba($black, 0.25);
              transform: scale(1.25);
              z-index: 2 !important;
              position: relative;
            }
          }
        }
      }
    }
    .score-name {
      font-weight: 700;
      text-transform: uppercase;
      color: gray("900");
      font-size: 18px;
      margin-top: 25px;
      letter-spacing: 0.05em;
    }
    .score-value {
      font-weight: 300;
      font-size: 40px;
      color: gray("900");
      letter-spacing: 0.1em;
    }
    .score-description {
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 5px;
      font-family: "Merriweather", serif;
      letter-spacing: 0.02em;
      font-weight: 300;
      color: gray("900");
      text-align: left;
      padding: 10px;
    }
  }

  .score-info-wrapper {
    max-height: 0;
    overflow: hidden;
    transition: max-height 400ms;
    &.active {
      max-height: 500px;
    }
  }

  .score-info {
    position: relative;
    background-color: #1c1c21;
    color: white;
    padding: 15px 10px;
    margin: 50px 0;

    .score-indicator {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      transform: translate(-50%);
    }
  }

  .score-see-more {
    margin: 10px 0px;
  }

  .score-images {
    display: flex;
    clip-path: polygon(
      50px 0%,
      100% 0px,
      100% calc(100% - 50px),
      calc(100% - 50px) 100%,
      0% 100%,
      0% 50px
    );

    img.greyout {
      filter: grayscale(100%);
    }
  }
}

.vote-button-wrapper {
  background: $white;
  padding: 0px 60px 60px 60px;
  border-radius: 0px 0px 2px 2px;
  text-align: center;
  @media (max-width: 767px) {
    padding: 0px 20px 20px 20px;
  }
  .like-button {
    cursor: pointer;
    padding: 0;
    border: 0;
    width: 240px;
    background: none;
    appearance: none;
    @include transition-hover-intent-slow();
    &:hover {
      transform: scale(1.25);
    }
    img {
      width: 240px;
      height: auto;
    }
  }
}

.voted-indication-wrapper {
  background: $white;
  padding: 0px 60px 60px 60px;
  text-align: center;
  span {
    font-weight: 700;
    letter-spacing: 0.1em;
    font-size: 16px;
    line-height: 24px;
    color: gray("900");
    text-transform: uppercase;
    background-color: color("yellow");
    border-radius: 10px;
    padding: 10px 20px;
  }
}

.comments-container {
  margin-bottom: 30px;
}

.related-content-container {
  margin-top: 30px;
  .pub-listing {
    .articles-row {
      @media (min-width: 992px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 991px) and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 767px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}

.score-widget-item {
  cursor: pointer;
}

.share-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  .main-share-icon {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    background-color: color("yellow");
    box-shadow: 1px 2px 5px rgba($black, 0.6);
    color: $black;
  }
  .share-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    color: $white;
    margin: 10px 5px;
    opacity: 0;
    cursor: pointer;
    pointer-events: none;
    box-shadow: 0px 1px 3px rgba($black, 0.6);
    @include transition-hover-intent();
    &.share-facebook {
      background: #3b5998;
      &:hover {
        background: darken(#3b5998, 10);
      }
    }
    &.share-google {
      background: #db4437;
      &:hover {
        background: darken(#db4437, 10);
      }
    }
    &.share-twitter {
      background: #1da1f2;
      &:hover {
        background: darken(#1da1f2, 10);
      }
    }
    &.shown {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
