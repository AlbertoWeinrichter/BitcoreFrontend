<template>
  <div class="pt-5 pb-5">
    <div class="row title-row">
      <h1 class="head">Inventario</h1>
      <div class="title-row-tabs-inventario">
        <nuxt-link :to="{ name: 'usuario-logros' }" class="btn title-tab-button"
          >Logros
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'usuario-titulos' }"
          class="act btn title-tab-button"
          >Títulos
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'usuario-patreon' }"
          class="btn title-tab-button"
          >Baluarte Patreon
        </nuxt-link>
      </div>
    </div>
    <div v-if="loggedUser" class="col-12 titles-container">
      <div class="row titles-row">
        <div
          class="title-card col-xl-4 col-lg-6 col-md-12"
          v-for="title in loggedUser.achievement_list.titles"
          :key="title.name"
        >
          <div class="title-card-inner wcorners">
            <div class="inner">
              <span class="bc-t"></span>
              <div class="title-wrapper">
                <div class="title-summary">
                  <h4 class="title-name">{{ title.name }}</h4>
                  <div class="title-image-wrapper">
                    <img
                      class="title-image"
                      :src="staticUrl('frames/' + title.border[0].slug)"
                    />
                  </div>
                </div>
                <div class="achievements">
                  <div
                    class="achievement-item"
                    v-for="achievement in title.achievements"
                    :key="achievement.slug"
                  >
                    <img
                      class="achievement-badge"
                      :src="staticUrl('achievements/' + achievement.slug)"
                      alt=""
                      :class="
                        getAchievementClasses(achievement) || 'deactivated'
                      "
                    />
                  </div>
                </div>
              </div>
              <span class="bc-b"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "titulos",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"])
  },
  methods: {
    getAchievementClasses(achievement) {
      let found = "";
      this.loggedUser.achievements.forEach(el => {
        if (achievement.slug === el.slug) {
          found = "available";
        }
      });
      return found;
    }
  }
};
</script>

<style lang="scss">
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

.titles-container {
  .titles-row {
    margin: 0px -10px;
    .title-card {
      padding: 0px 10px;
      margin-bottom: 20px;
      .title-card-inner {
        background: linear-gradient(gray("800"), gray("900"));
        padding: 0px;
        box-shadow: inset 0px 0px 0px 4px color("yellow");
        @include curcorners(15px);
        .bc-t,
        .bc-b {
          opacity: 1 !important;
        }
        .title-wrapper {
          display: flex;
          flex-direction: row;
          .title-summary {
            flex: 4;
            text-align: center;
            padding: 30px;
            .title-name {
              font-weight: 700;
              letter-spacing: 0.1em;
              font-size: 14px;
              color: gray("600");
              text-transform: uppercase;
              @media (max-width: 767px) {
                font-size: 12px;
              }
            }
            .title-image-wrapper {
              width: 100%;
              max-width: 200px;
              margin: -55px auto;
              .title-image {
                width: 160%;
                height: auto;
                margin-left: -30%;
              }
            }
          }
          .achievements {
            flex: 3;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 10px;
            align-content: center;
            justify-content: center;
            align-items: center;
            background: linear-gradient(gray("600"), gray("700"));
            box-shadow: inset 0px 0px 0px 4px color("yellow");
          }
          .achievement-item {
            padding: 8px;
            .achievement-badge {
              width: 70px;
              height: 70px;
              &.deactivated {
                filter: grayscale(100%) contrast(50%) brightness(0.6);
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0px !important;
  }
}
</style>
