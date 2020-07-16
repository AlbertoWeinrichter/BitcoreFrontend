<template>
  <div class="pub-listing">
    <div class="articles-row neat">
      <div
        v-for="publ in publist"
        :key="publ.slug"
        class="card wcorners article-item"
      >
        <div class="inner">
          <nuxt-link
            :to="{ name: 'publicacion-slug', params: { slug: publ.slug } }"
          >
            <!-- <span class="bc-t"></span> -->
            <!-- <div class="tag-tip">
              <fa :icon="getTagType(publ)" />
              <div class="tag-name">{{ publ.publication_type }}</div>
            </div> -->
            <div class="conwrap">
              <div class="art-photo">
                <img :src="mediaUrl(publ, 'search')" class="img-fluid" />
              </div>
              <div class="art-content">
                <h5 class="art-name">{{ publ.title }}</h5>
                <h6 v-if="publ.subtitle" class="art-subname">
                  {{ publ.subtitle }}
                </h6>
                <p class="art-snippet">
                  {{ publ.masonry_snippet | truncate(90) }}
                </p>
              </div>
              <div class="art-meta">
                <div class="art-meta-inner">
                  <div class="author">
                    <fa :icon="faUser" />
                    {{ publ.author.username }}
                  </div>
                  <div class="art-info">
                    <span class="publ-meta">
                      <span class="publ-time">
                        <fa :icon="faHeart" />
                        {{ publ.vote_total }}
                      </span>
                      <span class="publ-comcount">
                        <fa :icon="faComment" />
                        {{ publ.comment_total }}
                      </span>
                    </span>
                    <span class="publ-time">
                      <fa :icon="faClock" />
                      {{ publ.publication_date | moment("from", "now", true) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <span class="bc-b"></span> -->
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faUser,
  faHeart,
  faClock,
  faFileAlt,
  faTint,
  faComment,
  faBullhorn
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "pub-listing",
  props: {
    publist: {
        default: [],//eslint-disable-line
      type: Array
    }
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
    }
  },
  computed: {
    faFile() {
      return faFileAlt;
    },
    faTint() {
      return faTint;
    },
    faUser() {
      return faUser;
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
  }
};
</script>

<style lang="scss">
.tag-tip {
  &:hover {
    .tar-name {
      color: #000;
    }
  }
  position: absolute;
  top: 0;
  left: 0;
  height: 45px;
  z-index: 2;
  width: 50px;
  background-color: $yellow;
  clip-path: polygon(15px 0, 100% 0, 100% 70%, 35px 100%, 0 100%, 0 30%);
  display: flex;
  align-items: center;
  padding: 0 13px;
  padding-left: 17px;
  transition: width 0.3s ease;

  * {
    color: #000;
  }
  .tag-name {
    font-weight: bold;
    display: none;
    margin-left: 5px;
  }
}
.bc-b {
  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 0;
    width: 30px;
    height: 30px;
    left: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAABGdBT…YYY35odX8BOkn3yPUgqZU0bpg5hRCeR7zMnvYv/sb8LWYGRtRPL9vWMjwAAAAASUVORK5CYII=)
      no-repeat;
    background-position: 0 100%;
    background-size: contain;
  }
}
.pub-listing {
  .art-info {
    .publ-meta,
    .publ-time {
      font-weight: 400;
      display: inline-block;
      color: black;
      margin-left: 15px;
    }
  }

  .articles-row {
    padding: 0px;
    display: grid;
    grid-gap: 20px 20px;
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1199px) and (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 991px) and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }
    &.neat {
      .article-item {
        padding: 5px;
        display: inline-block;
        border: none;
        background: none;
        .inner {
          position: relative;
          @include curcorners(15px);
          height: 100%;
          &:hover {
            .tag-tip {
              width: 130px;
              clip-path: polygon(
                10% 0,
                100% 0,
                100% 65%,
                115px 100%,
                0 100%,
                0 34%
              );
              .tag-name {
                text-transform: uppercase;
                display: block;
              }
            }
            .art-photo > img {
              margin-top: -15px;
            }
            .conwrap {
              .art-content {
                padding-bottom: 40px;
                margin-top: -25px;
                box-shadow: 0px -5px 5px rgba($black, 0.4);
              }
            }
          }
          .art-photo {
            // filter: sepia(0.6);
            background-color: color("yellow");
            overflow: hidden;
            z-index: -1;
            height: 240px;
            img {
              @include transition-hover-intent-slow();
              margin-top: 0px;
              position: relative;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: 0;
            }
          }
          a {
            &:hover,
            &:active {
              text-decoration: none;
            }
            .conwrap {
              background: gray("900");
              height: 100%;
              width: calc(100% + 1px);
              position: relative;
              .art-content {
                padding: 15px 20px;
                margin-bottom: 40px;
                background: linear-gradient(gray("800"), gray("900"));
                position: relative;
                z-index: 100;
                @include transition-hover-intent-slow();
                .art-name {
                  font-size: 24px;
                  line-height: 32px;
                  margin-bottom: 10px;
                  font-weight: 700;
                  letter-spacing: 0.05em;
                  color: $white;
                  /*text-transform: uppercase;*/
                  @media (max-width: 991px) {
                    font-size: 18px;
                    line-height: 28px;
                  }
                }
                .art-subname {
                  font-size: 14px;
                  line-height: 24px;
                  font-weight: 500;
                  color: color("yellow");
                }
                .art-snippet {
                  font-family: "Roboto", sans-serif;
                  color: gray("500");
                  font-size: 14px;
                  line-height: 20px;
                  letter-spacing: 0.025em;
                }
              }
              .art-meta {
                position: absolute;
                bottom: 0;
                width: 100%;
                .art-meta-inner {
                  background: theme-color("primary");
                  padding: 10px 15px;
                  margin: 0 15px;
                  z-index: 200;
                  position: relative;
                  display: flex;
                  justify-content: space-between;
                }
                .author,
                .timestamp {
                  display: inline-block;
                  letter-spacing: 0.025em;
                  font-size: 12px;
                  line-height: 18px;
                  color: gray("800");
                  font-weight: 700;
                  margin-right: 10px;
                  max-width: 100px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  i {
                    margin-right: 2px;
                  }
                }
                .art-info {
                  font-size: 12px;
                  font-weight: 500;
                  font-family: "Roboto", sans-serif;
                }

                &::after {
                  content: "";
                  display: block;
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 15px;
                  background: darken(theme-color("primary"), 10%);
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
