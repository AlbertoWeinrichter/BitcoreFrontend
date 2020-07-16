<template>
  <div class="pt-5 pb-5">
    <div class="row title-row">
      <h1 class="head">Inventario</h1>
      <div class="title-row-tabs-inventario">
        <nuxt-link :to="{ name: 'usuario-logros' }" class="btn title-tab-button"
          >Logros</nuxt-link
        >
        <nuxt-link
          :to="{ name: 'usuario-titulos' }"
          class="btn title-tab-button"
          >Títulos</nuxt-link
        >
        <nuxt-link
          :to="{ name: 'usuario-patreon' }"
          class="act btn title-tab-button"
          >Baluarte Patreon
        </nuxt-link>
      </div>
      <b-modal
        class="illustration-modal"
        size="fluid-width"
        id="illustrationModal"
        ref="illustrationModal"
        :title="currentImageName"
        hide-footer
      >
        <div class="illustration-modal-inner">
          <div class="illustration-modal-image-wrapper">
            <img :src="currentImageUrl" />
          </div>
        </div>
      </b-modal>
    </div>
    <div class="row user-pateronhq">
      <div class="col-md-3 rank-wrapper wcorners">
        <div class="inner">
          <span class="bc-t"></span>
          <div class="patreon-rank-image" v-if="loggedUser">
            <img
              :src="
                'https://s3.eu-central-1.amazonaws.com/bitcore-static/images/patreon/patreon_ranks/' +
                  loggedUser.patreon_level +
                  '.png'
              "
            />
          </div>
          <h4 class="rankname">{{ getRankName }}</h4>

          <a
            href="https://www.patreon.com/bitcoregaming"
            target="_blank"
            class="patreon-button"
          >
            Mi Suscripción
          </a>

          <nuxt-link
            :to="{ name: 'contact', params: { inquiry_type: 'patreon' } }"
            class="patreon-button"
          >
            <div>
              Vincular mi cuenta
            </div>
          </nuxt-link>
          <span class="bc-b"></span>
        </div>
      </div>
      <div class="col-md-9 content-wrapper">
        <div class="inner">
          <div class="patreon-tabs">
            <b-btn
              class="patreon-tab"
              v-bind:class="{ act: selectedType === 'news' }"
              v-on:click="selectType('news')"
              >Artículos
            </b-btn>
            <b-btn
              class="patreon-tab"
              v-bind:class="{ act: selectedType === 'reviews' }"
              v-on:click="selectType('reviews')"
              >Análisis
            </b-btn>
            <b-btn
              class="patreon-tab"
              v-bind:class="{ act: selectedType === 'surveys' }"
              v-on:click="selectType('surveys')"
              >Encuestas
            </b-btn>
            <b-btn
              class="patreon-tab"
              v-bind:class="{ act: selectedType === 'images' }"
              v-on:click="selectType('images')"
              >Ilustraciones
            </b-btn>
          </div>
          <div class="patreon-content">
            <div v-if="selectedType === 'reviews'">
              <div
                class="content-item"
                v-for="item in patreon.reviews"
                :key="item.slug"
                v-bind:class="{ locked: !getReviewClass(item) }"
              >
                <nuxt-link
                  :to="{
                    name: 'publicacion-slug',
                    params: { slug: item.slug }
                  }"
                  class="content-item-inner"
                >
                  <div class="patreon-image">
                    <img :src="mediaUrl(item, 'thumbnail')" />
                  </div>
                  <div class="patreon-content">
                    <div class="patreon-text">
                      <div class="patreon-title">{{ item.title }}</div>
                      <div class="patreon-subtitle">{{ item.subtitle }}</div>
                      <p>{{ item.snippet }}</p>
                    </div>
                  </div>
                </nuxt-link>
                <a
                  href="https://www.patreon.com/bitcoregaming"
                  target="_blank"
                  class="lockedbox"
                  v-if="!getReviewClass(item)"
                >
                  <div>
                    <fa :icon="faLock"></fa><br /><b>DESBLOQUEAR</b>
                  </div>
                </a>
              </div>
            </div>
            <div v-if="selectedType === 'news'">
              <div
                class="content-item"
                v-for="item in patreon.news"
                :key="item.slug"
                v-bind:class="{ locked: !getNewsClass(item) }"
              >
                <nuxt-link
                  :to="{ name: 'publication', params: { slug: item.slug } }"
                  class="content-item-inner"
                >
                  <div class="patreon-image">
                    <img :src="mediaUrl(item, 'thumbnail')" />
                  </div>
                  <div class="patreon-content">
                    <div class="patreon-text">
                      <div class="patreon-title">{{ item.title }}</div>
                      <div class="patreon-subtitle">{{ item.subtitle }}</div>
                      <p>{{ item.snippet }}</p>
                    </div>
                  </div>
                </nuxt-link>
                <a
                  href="https://www.patreon.com/bitcoregaming"
                  target="_blank"
                  class="lockedbox"
                  v-if="!getNewsClass(item)"
                >
                  <div><fa :icon="faLock"></fa><br /><b>DESBLOQUEAR</b></div>
                </a>
              </div>
            </div>
            <div v-if="selectedType === 'surveys'">
              <div
                class="content-item survey-item"
                v-for="item in patreon.surveys"
                :key="item.slug"
                v-bind:class="{ selected: !getSurveyClass(item) }"
              >
                <div class="content-item-inner">
                  <div class="patreon-content">
                    <div class="patreon-text">
                      <div class="patreon-title">{{ item.title }}</div>
                    </div>
                    <div
                      v-if="item.user_selection !== null"
                      class="patreon-result"
                    >
                      <div
                        v-for="option in item.options"
                        class="patreon-result-item"
                        v-bind:class="{
                          selected: checkUserSelected(item, option)
                        }"
                      >
                        <div class="result-item-number">
                          {{ option.votes }}
                        </div>
                        <div class="result-item-title-wrapper">
                          <div class="result-item-title">
                            {{ option.title }}
                          </div>
                          <div
                            class="result-item-bar"
                            v-bind:style="{
                              width: getResultBarWidth(item, option) + '%'
                            }"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="patreon-options">
                      <button
                        v-for="option in item.options"
                        class="patreon-option"
                      >
                        {{ option.title }}
                      </button>
                    </div>
                  </div>
                </div>
                <a
                  href="https://www.patreon.com/bitcoregaming"
                  target="_blank"
                  class="lockedbox"
                  v-if="!getSurveyClass(item)"
                >
                  <div><fa :icon="faLock"></fa><br /><b>DESBLOQUEAR</b></div>
                </a>
              </div>
            </div>
            <div v-if="selectedType === 'images'">
              <div
                class="content-item gallery-item"
                v-for="item in patreon.images"
                :key="item.id"
                v-bind:class="{ locked: !getImageClass(item) }"
              >
                <a
                  class="gallery-thumbnail"
                  @click="showIllustrationModal(item)"
                >
                  <img :src="item.thumbnail" />
                </a>
                <a
                  href="https://www.patreon.com/bitcoregaming"
                  target="_blank"
                  class="lockedbox"
                  v-if="!getImageClass(item)"
                >
                  <div><fa :icon="faLock"></fa><br /><b>DESBLOQUEAR</b></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { faLock } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "usuario-patreon",
  data: function() {
    return {
      isLoading: true,
      selectedType: "news",
      currentImageUrl: []
    };
  },

  async asyncData({ $axios, store }) {
    let patreonResponse = await $axios.$post("/fetch_unlocked_patreon/", {
      username: store.state.user.username
    });
    return {
      patreon: patreonResponse.all,
      unlocked: patreonResponse.unlocked
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    types() {
      return Object.keys(this.achievementsByType);
    },
    faLock() {
      return faLock;
    },
    getRankName() {
      switch (this.loggedUser.patreon_level) {
        case 0:
          return "sin rango";
        case 1:
          return "simpatizante";
        case 2:
          return "informador";
        case 3:
          return "recluta";
        case 4:
          return "agente";
        case 5:
          return "espia";
        case 6:
          return "senescal";
        case 7:
          return "custodio";
      }
    }
  },
  methods: {
    getReviewClass(item) {
      return this.unlocked.reviews.includes(item.slug);
    },
    getNewsClass(item) {
      return this.unlocked.news.includes(item.slug);
    },
    getSurveyClass(item) {
      return this.unlocked.surveys.includes(item.id);
    },
    checkUserSelected(item, option) {
      return item.user_selection === option.id;
    },
    getResultBarWidth(item, option) {
      var maxVote = _.maxBy(item.options, "votes").votes;
      return (option.votes / maxVote) * 100;
    },
    getImageClass(item) {
      return _.find(this.unlocked.images, { id: item.id });
    },
    showIllustrationModal(item) {
      this.currentImageUrl = item.url;
      this.$refs.illustrationModal.show();
    },
    selectType(type) {
      this.selectedType = type;
    }
  }
};
</script>

<style lang="scss">
.patreon-rank-image {
  img {
    margin: 0 auto;
    width: 200px;
  }
}
.fa-lock {
  color: $yellow;
}
.title-row {
  padding: 0px 30px;
  .title-row-tabs {
    margin-left: 30px;
    margin-top: 15px;
    .title-tab-button {
      background: none;
      border: none;
      outline: none;
      appearance: none;
      border-bottom: 3px solid transparent;
      border-radius: 0px;
      @include transition-hover-intent();
      margin: 0px 5px;
      color: $white;
      &:hover,
      &:focus,
      &:active {
        color: $white;
        background: none;
        border-bottom-color: $white;
        box-shadow: none;
        text-decoration: none;
      }
      &.act {
        color: color("yellow");
        border-bottom: 3px solid color("yellow");
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0px 15px;
    h1 {
      margin: 0px auto 15px auto;
    }
    .title-row-tabs {
      text-align: center;
      width: 100%;
      margin: 0px auto 15px auto;
      .title-tab-button {
        margin-bottom: 10px;
      }
    }
  }
}

.modal-dialog.modal-fluid-width {
  width: 100%;
  max-width: calc(100vw - 30px);
  .illustration-modal-image-wrapper {
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.user-pateronhq {
  padding: 0px 30px;
  @media (max-width: 767px) {
    padding: 0px 15px;
  }
  .rank-wrapper {
    padding: 30px 15px;
    background: linear-gradient(gray("800"), gray("900"));
    text-align: center;
    max-height: 350px;
    margin-bottom: 30px;
    @include curcorners(15px);
    box-shadow: inset 0px 0px 0px 4px color("yellow");
    .bc-t,
    .bc-b {
      opacity: 1 !important;
    }
    .frame-bignum {
      display: block;
      background: url("~assets/img/frame-bignum.png") no-repeat;
      background-position: center center;
      background-size: contain;
      width: 120px;
      height: 120px;
      line-height: 90px;
      padding: 15px;
      text-align: center;
      font-size: 44px;
      color: #fff;
      margin: 0px auto 20px auto;
    }
    h4.rankname {
      font-size: 20px;
      line-height: 36px;
      letter-spacing: 0.1em;
      font-weight: 700;
      text-transform: uppercase;
    }
    .patreon-button {
      background: color("yellow");
      display: inline-block;
      border: none;
      outline: none;
      appearance: none;
      border-radius: 10px;
      padding: 8px 15px;
      color: $black;
      font-size: 14px;
      letter-spacing: 0.1em;
      font-weight: 700;
      text-transform: uppercase;
      @include transition-hover-intent();
      margin-top: 10px;
      &:hover,
      &:active,
      &:focus {
        background-color: darken(color("yellow"), 10);
        text-decoration: none;
      }
    }
  }
  .content-wrapper {
    padding: 0px;
    @media (min-width: 992px) {
      padding-left: 45px;
    }
    .inner {
      .patreon-tabs {
        .patreon-tab {
          text-transform: uppercase;
          padding: 8px 15px;
          font-weight: 600;
          letter-spacing: 1.2px;
          font-size: 14px;
          background: gray("800");
          border-radius: 5px 5px 0px 0px;
          border: none;
          @include transition-hover-intent();
          &.act {
            background-color: color("yellow");
            color: $black;
          }
          &:hover,
          &:focus {
            box-shadow: none;
            color: color("yellow");
            background-color: gray("700");
          }
        }
        @media (max-width: 991px) {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 0px -2.5px;
          .patreon-tab {
            flex: 1;
            border-radius: 5px;
            margin: 0px 2.5px 5px 2.5px;
          }
        }
      }
      .patreon-content {
        background: gray("900");
        .content-item {
          position: relative;
          &:not(:last-of-type) {
            border-bottom: 1px solid gray("600");
          }
          .content-item-inner {
            display: flex;
            flex-direction: row;
            color: $white;
            .patreon-image {
              position: relative;
              width: 200px;
              @include transition-hover-intent();
              img {
                width: 200px;
                height: 100%;
                object-fit: cover;
                @include transition-hover-intent();
              }
              @media (max-width: 767px) {
                width: 100px;
                img {
                  width: 100px;
                }
              }
            }
            .patreon-text {
              padding: 20px;
              .patreon-title {
                font-size: 18px;
                font-weight: 700;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                margin-bottom: 5px;
                @include transition-hover-intent();
              }
              .patreon-subtitle {
                font-size: 14px;
                margin-bottom: 5px;
                color: color("yellow");
                font-weight: 500;
                @include transition-hover-intent();
              }
              p {
                font-family: "Roboto", sans-serif;
                color: gray("500");
                font-size: 14px;
                letter-spacing: 0.025em;
                &:last-of-type {
                  margin-bottom: 0px;
                }
              }
            }
            &:hover,
            &:active {
              text-decoration: none;
              .patreon-image {
                width: 220px;
                @include transition-hover-intent();
                img {
                  width: 220px;
                  @include transition-hover-intent();
                }
                @media (max-width: 767px) {
                  width: 110px;
                  img {
                    width: 110px;
                  }
                }
              }
              .patreon-text {
                .patreon-title {
                  color: color("yellow");
                }
                .patreon-subtitle {
                  color: gray("200");
                }
              }
            }
          }
          .lockedbox {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(gray("700"), 0.6);
            -webkit-backdrop-filter: blur(8px);
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: $white;
            @include transition-hover-intent();
            i {
              font-size: 24px;
              color: color("yellow");
            }
            b {
              font-size: 14px;
              letter-spacing: 0.05em;
            }
            &:hover,
            &:active {
              text-decoration: none;
              color: color("yellow");
            }
          }
          &.gallery-item {
            width: 33.33%;
            display: inline-block;
            cursor: pointer;
            @media (max-width: 1199px) and (min-width: 768px) {
              width: 50%;
            }
            @media (max-width: 767px) {
              width: 100%;
            }
            .gallery-thumbnail {
              display: inline-block;
              width: 100%;
              height: 300px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
          &.survey-item {
            .content-item-inner {
              flex-direction: column;
              .patreon-text {
                width: 100%;
                padding-bottom: 5px;
              }
              .patreon-result {
                width: 100%;
                max-width: 600px;
                padding: 0px 20px 20px 20px;
                .patreon-result-item {
                  display: flex;
                  flex-direction: row;
                  margin-top: 5px;
                  letter-spacing: 0.025em;
                  .result-item-number {
                    font-family: "Roboto", sans-serif;
                    width: 50px;
                    font-size: 16px;
                    line-height: 24px;
                    font-weight: 500;
                    color: gray("200");
                  }
                  .result-item-title-wrapper {
                    position: relative;
                    width: 100%;
                    height: 24px;
                    .result-item-title {
                      color: gray("600");
                      font-size: 14px;
                      line-height: 24px;
                      font-weight: 600;
                      position: absolute;
                      z-index: 10;
                      top: 0px;
                      left: 10px;
                    }
                    .result-item-bar {
                      display: inline-block;
                      height: 24px;
                      background-color: gray("200");
                      border-radius: 2px;
                      min-width: 2px;
                    }
                  }
                  &.selected {
                    .result-item-number {
                      color: color("yellow");
                    }
                    .result-item-title-wrapper {
                      .result-item-bar {
                        background-color: color("yellow");
                      }
                    }
                  }
                }
              }
              .patreon-options {
                padding: 0px 20px 20px 20px;
                .patreon-option {
                  appearance: none;
                  outline: none;
                  border-radius: 10px;
                  padding: 5px 15px;
                  background: none;
                  border: 2px solid gray("300");
                  margin: 0px 10px 5px 0px;
                  color: gray("300");
                  font-weight: 600;
                  letter-spacing: 0.05em;
                  @include transition-hover-intent();
                  &:hover,
                  &:active,
                  &:focus {
                    color: gray("background");
                    background-color: color("yellow");
                    border-color: color("yellow");
                  }
                }
              }
              &:hover,
              &:active {
                .patreon-text {
                  .patreon-title {
                    color: $white;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
