<template>
  <div class="pt-5 pb-5 bc-container-fluid">
    <div v-if="loggedUser" class="row title-row">
      <h1 class="head">Inventario</h1>
      <div class="title-row-tabs-inventario">
        <nuxt-link
          :to="{ name: 'usuario-logros' }"
          class="act btn title-tab-button"
          >Logros</nuxt-link
        >
        <nuxt-link
          :to="{ name: 'usuario-titulos' }"
          class="btn title-tab-button"
          >Títulos</nuxt-link
        >
        <nuxt-link
          :to="{ name: 'usuario-patreon' }"
          class="btn title-tab-button"
          >Baluarte Patreon</nuxt-link
        >
      </div>

      <b-modal
        class="medal-modal"
        id="medalModal"
        ref="medalModal"
        title="Logro"
        hide-footer
      >
        <div class="medal-modal-inner">
          <div class="medal-modal-image-wrapper">
            <img :src="staticUrl('achievements/' + currentMedal.slug)" />
          </div>
          <div class="medal-modal-details">
            <div class="medal-title">{{ currentMedal.name }}</div>
            <div class="medal-category">{{ currentMedal.category }}</div>
            <div class="medal-modal-divider"></div>
            <div class="medal-description">{{ currentMedal.description }}</div>
            <div class="medal-game">{{ currentMedal.game }}</div>
          </div>
        </div>
      </b-modal>
    </div>

    <div class="col-12 achievements-container">
      <div v-for="type in types" :key="type">
        <section class="ach-image-list">
          <h2 class="type">{{ type }}</h2>
          <div class="arc-image-row">
            <!-- Actual achivements -->
            <div
              class="ach-image-div"
              v-for="achievement in achievementsByType[type]"
              :class="getAchievementClasses(achievement) || 'deactivated'"
              :key="achievement.slug"
            >
              <div
                class="arc-image-wrapper"
                @click="showMedalModal(achievement)"
              >
                <img :src="staticUrl('achievements/' + achievement.slug)" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "logros",
  data() {
    return {
      selectedType: "",
      currentMedal: {}
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    achievementsByType() {
      return this.loggedUser
        ? _.groupBy(this.loggedUser.achievement_list.achievements, "category")
        : {};
    },
    activeAchievements() {
      return this.loggedUser.achievement_list.achievements;
    },
    types() {
      return Object.keys(this.achievementsByType);
    }
  },
  methods: {
    showMedalModal(achievement) {
      this.currentMedal = achievement;
      this.$refs.medalModal.show();
    },
    getActiveAchievements(achievement) {//eslint-disable-line
      this.ownedAchivements = this.loggedUser.basico;
      console.log(this.ownedAchivements);
    },
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
h1.head {
  margin-bottom: 0 !important;
}
.title-row {
  margin-bottom: 30px;
  .title-row-tabs-inventario{
    margin-left: 30px;

    margin-top: 0;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    font-size: 14px;
    a {
      font-size: 14px;
      padding: 4px 9px;
      letter-spacing: .1em;
    }
    .title-tab-button {
      @include transition-hover-intent();
      background: none;
      border: none;
      outline: none;
      border-bottom: 3px solid transparent;
      border-radius: 0;
      margin: 0 5px;
      color: $white;
      &:hover,
      &:focus,
      &:active {
        color: $white;
        border-bottom-color: $white;
        text-decoration: none;
        background: none;
        box-shadow: none;
      }
      &.act {
        color: color("yellow");
        border-bottom: 3px solid color("yellow");
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0 15px;
    h1 {
      margin: 0 auto 15px auto;
    }
    .title-row-tabs {
      text-align: center;
      width: 100%;
      margin: 0 auto 15px auto;
      .title-tab-button {
        margin-bottom: 10px;
      }
    }
  }
}

.achievements-container {
  @media (max-width: 767px) {
    padding: 0 !important;
  }
}

section {
  /*margin-bottom: 30px;*/
  h2 {
    margin-bottom: 5px !important;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1em;
    font-size: 24px;
    @media (max-width: 767px) {
      text-align: center;
    }
  }
  .arc-image-row {
    margin: 0px -15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media (max-width: 767px) {
      justify-content: center;
    }
    .ach-image-div {
      width: 110px;
      height: 110px;
      padding: 15px;
      .arc-image-wrapper {
        display: inline-block;
        width: 100%;
        height: 100%;
        outline: none;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &.deactivated {
        filter: grayscale(100%) contrast(50%) brightness(0.6);
      }
    }
  }
}

.medal-modal {
  .modal-dialog {
    max-width: 750px;
  }
}

.medal-modal-inner {
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  .medal-modal-image-wrapper {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .medal-modal-details {
    flex: 1;
    padding-left: 20px;
    .medal-title {
      font-weight: 700;
      font-size: 20px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: color("yellow");
      @media (max-width: 767px) {
        font-size: 18px;
      }
    }
    .medal-category {
      font-size: 9px;
      line-height: 12px;
      color: gray("900");
      background-color: gray("500");
      letter-spacing: 0.025em;
      padding: 2px 5px;
      display: inline;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 4px;
      margin: 5px 0px;
    }
    .medal-modal-divider {
      width: 100%;
      height: 1px;
      background-color: gray("600");
      margin: 10px 0px;
    }
    .medal-description {
      font-family: "Roboto", sans-serif;
      color: gray("500");
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.025em;
    }
    .medal-game {
      color: gray("300");
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.025em;
      font-weight: 600;
    }
  }
}
</style>
