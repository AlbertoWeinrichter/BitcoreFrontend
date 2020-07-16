<template>
  <div class="calendar-page bc-container-fluid">
    <div :class="!mobileDevice && 'pt-5'">
      <div class="title-row-lanzamiento">
        <h1 class="head d-none d-lg-block d-xl-block">Calendario</h1>
        <div class="title-row-tabs">
          <div
            class="title-tab-button"
            :class="{ act: selectedType === 'release' }"
            @click.prevent="selectType('release')"
          >
            Lanzamientos
          </div>
          <div
            class="title-tab-button"
            :class="{ act: selectedType === 'event' }"
            @click.prevent="selectType('event')"
          >
            Eventos
          </div>
        </div>
        <b-modal
          class="release-modal"
          size="full-width"
          id="releaseModal"
          ref="releaseModal"
          :title="`detalles del ${selectedTypeTranslated}`"
          hide-footer
        >
          <div class="release-modal-inner">
            <div class="release-modal-image-wrapper">
              <div class="release-modal-header">
                <div class="release-modal-image">
                  <img :src="calendarUrl(currentRelease.main_image)" />
                </div>
                <div class=" release-modal-text">
                  <div class="release-modal-title">
                    {{ currentRelease.title }}
                  </div>
                  <div class="release-modal-date">
                    {{ currentRelease.release_date }}
                  </div>
                  <div class="release-modal-tags">
                    <nuxt-link
                      class="btn btn-primary btn-sm game-tag"
                      v-for="(tag, index) in currentRelease.important_tags"
                      :key="index"
                      :to="{
                        name: 'busqueda-term',
                        params: { tagid: tag.slug }
                      }"
                    >
                      {{ tag }}
                    </nuxt-link>

                    <nuxt-link
                      class="btn btn-primary btn-sm game-tag"
                      v-for="(tag, index) in currentRelease.other_tags"
                      :key="index"
                      :to="{
                        name: 'busqueda-term',
                        params: { tagid: tag.slug }
                      }"
                    >
                      {{ tag }}
                    </nuxt-link>
                  </div>
                  <div
                    v-if="currentRelease.description"
                    class="release-modal-description"
                  >
                    {{ currentRelease.description }}
                  </div>
                  <a
                    v-if="currentRelease.review_link"
                    class="release-modal-external-link"
                    :href="'articulos/' + currentRelease.review_link"
                    target="_blank"
                  >
                    + Nuestro Anàlisis
                  </a>
                  <a
                    v-if="currentRelease.external_link"
                    class="release-modal-external-link"
                    :href="currentRelease.external_link"
                    target="_blank"
                  >
                    + Más Info
                  </a>
                </div>
              </div>
              <div v-if="currentRelease.video" class="modal-section">
                <div class="modal-section-title">Vídeo</div>
                <div class="relase-modal-video">
                  <iframe
                    width="560"
                    height="349"
                    :src="
                      `https://www.youtube.com/embed/${currentRelease.video}?rel=0&hd=1`
                    "
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <div
                v-if="currentRelease.images.length > 0"
                class="modal-section"
              >
                <div class="modal-section-title">Galería</div>
                <div class="release-modal-gallery">
                  <div class="gallery-main-container">
                    <div
                      class="gallery-arrow gallery-main-prev"
                      @click="prevImage"
                    >
                      <img src="~assets/img/prev-arrow.png" alt="" />
                    </div>
                    <img
                      class="gallery-main"
                      :src="
                        calendarUrl(currentRelease.images[galleryIndex].path)
                      "
                    />
                    <div
                      class="gallery-arrow gallery-main-next"
                      @click="nextImage"
                    >
                      <img src="~assets/img/next-arrow.png" alt="" />
                    </div>
                  </div>
                  <div class="gallery-thumb-container">
                    <img
                      class="gallery-thumb"
                      v-for="(image, i) in currentRelease.images"
                      :src="calendarUrl(image.path)"
                      @click="galleryIndex = i"
                      v-bind:class="getGalleryThumbClass(i)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>

      <div class="row calendar-row">
        <div :class="`col-xl-3 ${mobileDevice && 'pt-2'}`">
          <no-ssr>
            <god-date-picker v-model="selectedDate" :inline="!mobileDevice" />
          </no-ssr>
        </div>
        <div class="col-xl-9 col-lg-12 col-md-12">
          <div id="calendar-items-container" class="calendar-items-container">
            <main role="main" class="timeline-wrapper clearfix">
              <infinite-loading
                :identifier="checker"
                direction="top"
                @infinite="infiniteHandlerTop"
              >
                <div slot="spinner">
                  <!-- <Loading text=" " /> -->
                </div>
                <div slot="no-results">No hay resultados</div>
                <div slot="no-more">
                  No hay más resultados
                </div>
              </infinite-loading>
              <div
                class="timeline-day"
                :id="`date-item-container-${dayItems.date}`"
                v-for="dayItems in itemsGroupByDate"
              >
                <div class="date-divider" :id="`date-item-${dayItems.date}`">
                  <div class="divider-inner"></div>
                  <span class="date-val">{{ dayItems.date }}</span>
                </div>
                <div
                  class="calendar-item"
                  :class="{ 'first-of-day': !index }"
                  v-for="(item, index) in dayItems.items"
                >
                  <div
                    class="calendar-item-inner"
                    @click="showReleaseModal(item)"
                  >
                    <div class="calendar-item-content">
                      <div class="calendar-item-image">
                        <img :src="calendarUrl(item.thumbnail)" alt="" />
                      </div>
                      <div class="calendar-item-body">
                        <div class="calendar-item-title">
                          {{ item.title }}
                        </div>
                        <div class="calendar-item-subtitle">
                          {{ item.release_date }}
                        </div>
                        <div
                          class="calendar-item-tags"
                          v-if="item.important_tags.length > 0"
                        >
                          <nuxt-link
                            class="btn btn-primary btn-sm game-tag"
                            v-for="(tag, index) in item.important_tags"
                            :key="index"
                            :to="{
                              name: 'busqueda-term',
                              params: { tagid: tag.slug }
                            }"
                          >
                            {{ tag }}
                          </nuxt-link>
                        </div>
                        <p class="calendar-item-snippet d-none d-sm-block">
                          {{ item.snippet }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <infinite-loading
                :identifier="checker"
                @infinite="infiniteHandler"
              >
                <div slot="spinner"><Loading text=" " /></div>
                <div slot="no-more">
                  No hay más resultados
                </div>
                <div slot="no-results" class="no-results">
                  No hay resultados
                </div>
              </infinite-loading>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";

import Loading from "~/components/core/Loading";
import InfiniteLoading from "vue-infinite-loading";
import NoSsr from "vue-no-ssr";

export default {
  name: "lanzamientos",
  components: {
    Loading,
    "infinite-loading": InfiniteLoading,
    "no-ssr": NoSsr
    // "vue-datepicker": DatePicker
  },
  metaInfo: {
    title: "Calendario"
  },

  data() {
    return {
      time1: "",
      time2: "",
      promises: [],
      time3: "",
      loadedFirst: false,
      shortcuts: [
        {
          text: "Today",
          onClick: () => {
            this.time3 = [new Date(), new Date()];
          }
        }
      ],
      timePickerOptions: {
        start: "00:00",
        step: "00:30",
        end: "23:30"
      },

      items: [],
      isLoading: true,
      stopFetching: false,
      selectedType: "release",
      selectedTypeTranslated: "lanzamiento",
      selectedDate: new Date(),
      checker: new Date(),
      releases_start: null,
      closestDate: null,
      page: 0,
      block: true,
      mobileDevice: false,
      pageBack: 0,
      currentRelease: {
        release_date: null,
        release_type: null,
        title: null,
        important_tags: [],
        other_tags: [],
        snippet: null,
        description: null,
        video: null,
        external_link: null,
        thumbnail: null,
        main_image: null,
        images: []
      },
      galleryIndex: 0,
      firstLoad: true
    };
  },
  watch: {
    selectedDate() {
      this.items = [];
      this.fetchItems(0);
    },
    selectedType() {
      this.items = [];
      this.fetchItems(0);
    }
  },
  computed: {
    itemsGroupByDate() {
      var currentSelection = _.filter(this.items, {
        release_type: this.selectedType
      });
      return _(currentSelection)
        .map((item, index) => ({
          ...item,
          listIndex: index
        }))
        .groupBy("release_date")
        .map((items, date) => ({
          date: date,
          items
        }))
        .orderBy("date", "asc")
        .value();
    }
  },
  methods: {
    updateSearch() {},
    checkIfMobile() {
      if (window.innerWidth <= 1199) this.mobileDevice = true;
    },
    infiniteHandlerTop($state) {
      if (this.block) return null;
      this.fetchItems(-1).then(r => {
        if (!r.length) $state.completed();
        else $state.loaded();
      });
    },
    infiniteHandler($state) {
      if (this.block) return null;
      this.fetchItems(1).then(r => {
        if (!r.length) $state.complete();
        else $state.loaded();
      });
    },
    selectType(type) {
      this.selectedType = type;
      this.selectedTypeTranslated =
        type == "release" ? "lanzamiento" : "evento";
    },
    getAllAvailableDates() {
      this.availableDates = _.uniq(
        _.filter(this.items, { release_type: this.selectedType }).map(
          item => item.release_date
        )
      ).map(item => moment(item));
      this.closestDate = this.getClosestDate(new moment());
    },
    getClosestDate(currentDate) {
      if (
        this.availableDates.find(
          el => el.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD")
        )
      ) {
        return currentDate;
      }
      let closest = _.max(this.availableDates);
      // console.log("MAX", closest);
      _(this.availableDates).forEach(function(date) {
        if (date >= currentDate && date < closest) {
          closest = date;
        }
      });
      return closest;
    },
    showReleaseModal(item) {
      this.currentRelease = item;
      this.galleryIndex = 0;
      this.$refs.releaseModal.show();
    },
    prevImage() {
      var imageCount = this.currentRelease.images.length;
      this.galleryIndex =
        this.galleryIndex > 0 ? this.galleryIndex - 1 : imageCount;
    },
    nextImage() {
      var imageCount = this.currentRelease.images.length;
      this.galleryIndex =
        this.galleryIndex < imageCount - 1 ? this.galleryIndex + 1 : 0;
    },
    getGalleryThumbClass(index) {
      return {
        active: this.galleryIndex === index
      };
    },

    getDates() {
      this.getAllAvailableDates();
      const latestDate = _.max(this.availableDates);
      const oldestDate = _.min(this.availableDates);
      return {
        oldestDate,
        latestDate
      };
    },

    fetchItems(type = 0) {
      if (type === 0) this.block = true;
      const params = {
        date: moment(this.selectedDate).format("YYYY-MM-DD"),
        type: this.selectedType
      };

      const dates = this.getDates();
      switch (type) {
        case 1:
          {
            params.date = dates.latestDate.format("YYYY-MM-DD");
            params.direction = 1;
          }
          break;

        case -1:
          {
            params.date = dates.oldestDate.format("YYYY-MM-DD");
            params.direction = 0;
          }
          break;
      }

      return this.$axios
        .$get("/releases", {
          params
        })
        .then(response => {
          if (type >= 0)
            this.items = _.uniqBy([...this.items, ...response.releases], "id");
          else
            this.items = _.uniqBy([...response.releases, ...this.items], "id");

          if (type === 0) this.scrollToDate();
          return response.releases;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleResize() {
      if (window.innerWidth < 1199 && this.mobileDevice === false) {
        console.log("Run mobile");
        this.mobileDevice = true;
      } else if (this.mobileDevice === true && window.innerWidth > 1199) {
        console.log("Run not mobile");
        this.mobileDevice = false;
      }
    },

    async scrollToDate() {
      if (process.browser) {
        await Promise.all(this.promises).then(() => {
          this.getAllAvailableDates();
          const nearest = this.getClosestDate(moment(this.selectedDate));
          if (!nearest) return;
          const idDate = `date-item-container-${nearest.format("YYYY-MM-DD")}`;
          if (document.getElementById(idDate)) {
            const offsetTop = document.getElementById(idDate).offsetTop;
            document.querySelector("#calendar-items-container").scroll({
              top: offsetTop,
              left: 0
              // behavior: "smooth"
            });
            this.block = false;
            this.checker = new Date();
          }
        });
      }
    }
  },
  created() {
    this.fetchItems(0);
    if (process.browser) window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    this.checkIfMobile();
  }
};
</script>

<style lang="scss">
.calendar-page {
  .timeline-wrapper {
    height: 100%;
  }
  .vdp-datepicker {
    input {
      color: $yellow;
      background: $gray-c02;
      padding: 10px;
      border-radius: 10px;
      border: none;
    }
  }
  .vdp-datepicker__calendar {
    background: #343a40;
    border: none;
    .cell.year:hover,
    .cell.day:hover,
    .cell.month:hover {
      border: 1px solid darken(color("yellow"), 5) !important;
    }
    .cell.year.selected,
    .cell.day.selected,
    .cell.month.selected {
      background: darken(color("yellow"), 5);
      color: #19191c;
      border: none !important;
    }
    .prev,
    .next {
      color: darken(color("yellow"), 5);
      &:hover {
        background: darken(color("yellow"), 5) !important;
      }
    }
    .day__month_btn.up,
    .month__year_btn.up {
      color: darken(color("yellow"), 5);
      border: none;
      outline: none;
      &:hover,
      &:focus,
      &:active {
        background: darken(color("yellow"), 5) !important;
        color: #19191c;
      }
    }
  }
}
.title-row-lanzamiento {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .title-tab-button {
    color: #fad000;
    margin-left: 5px;
    padding: 5px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: darken(#fad000, 5);
    }
    &:active {
      outline: none;
    }
    &.act {
      border-bottom: 1px solid #fad000;
    }
  }
  .title-row-tabs {
    @media screen and (max-width: 900px) {
      margin-left: 0px;
    }
    display: flex;
    margin-left: 50px;
    & a {
      font-size: 17px;
      font-weight: 600;
    }
  }
}

.black.darken-2 {
  background-color: #868e96 !important;
  color: #fad000;
}

.v-date-picker-years {
  li {
    color: white;
  }
  li:hover {
    background-color: gray;
  }
  li.active {
    color: #fad000 !important;
  }
}

.v-picker__body {
  background: #19191c !important;
  .v-date-picker-header {
    & .v-btn,
    & .black--text button {
      color: white !important;
    }
  }
  & .v-btn,
  & th {
    color: white !important;
  }
}

.modal-dialog.modal-full-width {
  width: 1000px;
  max-width: calc(100vw - 30px);
  .release-modal-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    .release-modal-image {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }
    .release-modal-text {
      flex: 3;
      padding-left: 20px;
      .release-modal-title {
        font-size: 32px;
        letter-spacing: 0.1em;
        font-weight: 700;
        text-transform: uppercase;
        @media (max-width: 991px) {
          font-size: 18px;
        }
      }
      .release-modal-date {
        font-weight: 600;
        letter-spacing: 0.05em;
        font-size: 14px;
        color: gray("500");
      }
      .release-modal-tags {
        margin-top: 10px;
        font-size: 0px;
        .game-tag {
          font-size: 12px;
          margin-right: 5px;
          margin-bottom: 5px;
          padding: 3px 8px 2px 8px;
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
      .release-modal-description {
        margin-top: 10px;
        font-family: "Roboto", sans-serif;
        color: gray("500");
        font-size: 14px;
        letter-spacing: 0.025em;
      }
      .release-modal-external-link {
        font-size: 14px;
        margin-top: 15px;
        padding: 5px 15px;
        background-color: color("yellow");
        color: $black;
        letter-spacing: 0.075em;
        font-weight: 700;
        border-radius: 5px;
        display: inline-block;
        text-transform: uppercase;
        @include transition-hover-intent();
        &:hover,
        &:active {
          background: darken(color("yellow"), 10);
          color: $black;
          text-decoration: none;
        }
      }
    }
    @media (max-width: 767px) {
      flex-direction: column;
      .release-modal-text {
        padding-left: 0px;
        padding-top: 15px;
      }
    }
  }
  .modal-section {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid gray("600");
    .modal-section-title {
      font-size: 24px;
      letter-spacing: 0.1em;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 10px;
      @media (max-width: 991px) {
        font-size: 16px;
      }
    }
    .relase-modal-video {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 25px;
      height: 0;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .release-modal-gallery {
      .gallery-main-container {
        position: relative;
        margin-bottom: 10px;
        .gallery-arrow {
          height: 100%;
          width: 50px;
          cursor: pointer;
          top: 0px;
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          img {
            width: 50px;
            height: auto;
            opacity: 0.6;
          }
          &.gallery-main-prev {
            left: 0px;
            &:hover {
              background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0)
              );
              img {
                opacity: 1;
              }
            }
          }
          &.gallery-main-next {
            right: 0px;
            &:hover {
              background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0.5)
              );
              img {
                opacity: 1;
              }
            }
          }
        }
        .gallery-main {
          width: 100%;
          height: auto;
        }
      }
      .gallery-thumb-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin-right: -10px;
        .gallery-thumb {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          margin: 0px 10px 10px 0px;
          cursor: pointer;
          &:hover {
            filter: brightness(1.4);
          }
          &.active {
            border: 4px solid color("yellow");
          }
        }
        @media (max-width: 767px) {
          margin-right: -5px;
          .gallery-thumb {
            width: 60px;
            height: 60px;
            margin: 0px 5px 5px 0px;
          }
        }
      }
    }
  }
}

.calendar-row {
  #datepicker {
    @media (min-width: 1200px) {
      padding: 0px 15px;
    }
    .ui-datepicker {
      color: gray("600");
      background: gray("background");
      width: 100%;
      .ui-datepicker-header {
        background: gray("800");
        border-bottom-color: gray("700");
        .ui-datepicker-title {
          color: color("yellow");
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          select {
            background: none;
            border-radius: 0px;
            border: none;
            border-bottom: 2px solid gray("600");
            color: color("yellow");
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            outline: none;
            margin: 0px 10px;
            padding: 0px 0px 0px 2px;
            text-align: center;
            width: 70px;
            background-image: url("~assets/img/caret.png");
            background-position: right -3px top 2px;
            background-repeat: no-repeat;
            background-size: 18px 18px;
          }
        }
        .ui-datepicker-prev,
        .ui-datepicker-next {
          color: $white;
          &:hover,
          &:active {
            color: color("yellow");
          }
        }
      }
      table.ui-datepicker-calendar {
        width: calc(100% - 30px);
        th {
          &:hover {
            background: transparent !important;
          }
        }
        td {
          &:hover {
            background: transparent;
          }
          a {
            display: inline-block;
            width: 36px;
            height: 36px;
            border-radius: 18px;
            line-height: 36px;
            @include transition-hover-intent();
          }
          &.ui-datepicker-other-month {
            a {
              &:hover,
              &:active {
                background: transparent;
              }
            }
          }
          &:not(.ui-datepicker-other-month) {
            a {
              background: transparent;
              color: gray("400");
              &:hover {
                color: gray("800");
                background-color: gray("200");
              }
            }
          }
          &.ui-datepicker-today {
            a {
              color: color("yellow");
              font-weight: 700;
            }
          }
          &.ui-datepicker-current-day {
            background: transparent;
            a {
              background: color("yellow");
              color: gray("800");
            }
          }
        }
      }
    }
  }
  .calendar-items-container::-webkit-scrollbar {
    display: none;
    width: 0px;
  }
  .calendar-items-container {
    height: calc(100vh - 240px);
    overflow-y: auto;
    scrollbar-width: none;
    @media (max-width: 1199px) {
      margin-top: 30px;
      height: 70vh;
    }
    .date-divider {
      position: relative;
      text-align: center;
      .divider-inner {
        width: 100%;
        height: 2px;
        background-color: gray("200");
        position: absolute;
        left: 0px;
        top: 10px;
        z-index: 0;
      }
      span {
        position: relative;
        display: inline-block;
        background-color: gray("background");
        z-index: 10;
        padding: 0px 15px;
        font-size: 16px;
        line-height: 20px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: gray("200");
      }
    }
    .calendar-item {
      margin: 15px 0px;
      cursor: pointer;
      .calendar-item-inner {
        background-color: gray("900");
      }
      .calendar-item-content {
        display: flex;
        flex-direction: row;
        position: relative;
        .calendar-item-image {
          width: 150px;
          position: relative;
          @include transition-hover-intent();
          img {
            width: 150px;
            height: 100%;
            object-fit: cover;
            @include transition-hover-intent();
          }
          @media (max-width: 767px) {
            width: 120px;
            img {
              width: 120px;
            }
          }
        }
        .calendar-item-body {
          padding: 15px 20px;
          .calendar-item-title {
            font-size: 20px;
            letter-spacing: 0.1em;
            font-weight: 700;
            text-transform: uppercase;
            @include transition-hover-intent();
            @media (max-width: 991px) {
              font-size: 18px;
            }
          }
          .calendar-item-subtitle {
            font-weight: 600;
            letter-spacing: 0.05em;
            font-size: 14px;
            color: gray("500");
            @include transition-hover-intent();
          }
          .calendar-item-tags {
            margin-top: 10px;
            .game-tag {
              font-size: 12px;
              margin-right: 5px;
              margin-bottom: 5px;
              padding: 3px 8px 2px 8px;
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
          .calendar-item-snippet {
            margin-top: 10px;
            font-family: "Roboto", sans-serif;
            color: gray("500");
            font-size: 14px;
            letter-spacing: 0.025em;
          }
        }
      }
      &:hover,
      &:active {
        .calendar-item-content {
          .calendar-item-image {
            width: 180px;
            @include transition-hover-intent();
            img {
              width: 180px;
              @include transition-hover-intent();
            }
            @media (max-width: 767px) {
              width: 130px;
              img {
                width: 130px;
              }
            }
          }
          .calendar-item-body {
            .calendar-item-title {
              color: color("yellow");
            }
            .calendar-item-subtitle {
              color: gray("200");
            }
          }
        }
      }
    }
  }
}
</style>
