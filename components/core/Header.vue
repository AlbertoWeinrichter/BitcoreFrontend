<template>
  <div class="header-wrapper">
    <div v-if="loggedUser">
      <b-modal
        ref="EditProfileModal"
        title="Editar Perfil"
        id="EditProfileModal"
        ok-title=""
        ok-only
        @show="onShowProfileSelectModal"
      >
        <div slot="modal-footer" class="w-100">
          <div class="float-right mr-5" v-if="loadingModal">
            <b-spinner label="Loading..." />
          </div>
          <b-button
            v-else
            variant="primary"
            size="sm"
            class="float-right"
            @click="saveChanges"
          >
            Guardar
          </b-button>
        </div>
        <div class="container">
          <div class="profile-tabs">
            <button
              class="profile-tab"
              :class="{ act: currentTab === 1 }"
              @click="currentTab = 1"
            >
              Logros
            </button>
            <button
              class="profile-tab"
              :class="{ act: currentTab === 2 }"
              @click="currentTab = 2"
            >
              Marcos
            </button>
            <button
              class="profile-tab"
              :class="{ act: currentTab === 3 }"
              @click="currentTab = 3"
            >
              Títulos
            </button>
            <button
              class="profile-tab"
              :class="{ act: currentTab === 4 }"
              @click="clickAvatar()"
            >
              Avatar
            </button>
          </div>

          <div class="ach-image-list" v-if="currentTab === 1">
            <div
              class="ach-image-div"
              v-for="achievement in loggedUser.achievements"
              :key="achievement.slug"
              :class="{
                'active-ach': selectedAchievements.includes(achievement.slug),
                'new-ach': achievement.new
              }"
              @click="selectAchievement(achievement.slug)"
            >
              <img :src="staticUrl('achievements/' + achievement.slug)" />
            </div>
          </div>

          <div class="ach-image-list" v-if="currentTab === 2">
            <div
              class="ach-frame-div"
              v-for="border in loggedUser.borders"
              :key="border.slug"
              :class="{
                'active-ach': border.slug === selectedBorderSlug,
                'new-ach': border.new
              }"
              @click="selectBorder(border.slug)"
            >
              <img :src="staticUrl('frames/' + border.slug)" />
            </div>
          </div>

          <div class="ach-image-list" v-if="currentTab === 3">
            <div
              class="title-div"
              v-for="title in loggedUser.titles"
              :key="title.slug"
              :class="{
                'active-ach': title.name === selectedTitleName,
                'new-ach': title.new
              }"
              @click="selectTitle(title.name)"
            >
              <span>
                {{ title.name }}
              </span>
            </div>
          </div>

          <div class="avatar-editor" v-if="currentTab === 4">
            <div class="container">
              <input @change="toggleShow" type="file" ref="imageInput" />
              <vue-cropper ref="cropper" :src="avatarURL" alt="Source Image" />
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <header class="home-header">
      <div class="navbar d-none d-lg-block">
        <div class="container-fluid justify-content-end fixed-size">
          <div class="nav social-wrapper">
            <social-cloud />
            <patreon-support />
          </div>
        </div>
      </div>

      <div v-if="isMasonry" class="home-hero-image d-none d-lg-block">
        <img
          :src="
            'https://bitcoregaming.s3.eu-central-1.amazonaws.com/static/images/header_' +
              random +
              '.jpg'
          "
        />
      </div>

      <b-navbar
        id="navbar-main"
        toggleable="xl"
        class="navbar-expand-lg"
        :class="{ sticky: scroll }"
      >
        <div class="container-fluid fixed-size">
          <b-navbar-brand>
            <template>
              <nuxt-link to="/">
                <template>
                  <img
                    src="~assets/img/logo.png"
                    :class="{ active: !scroll }"
                    class="img-logo navbar-expand-lx"
                    alt="Bitcore"
                  />
                  <img
                    src="~assets/img/logo-small.png"
                    :class="{ active: scroll }"
                    class="img-logo-small"
                    alt="Bitcore"
                  />
                </template>
              </nuxt-link>
            </template>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav-collapse">
            <b-navbar-nav class="ml-auto">
              <li class="nav-item">
                <nuxt-link
                  :to="{ name: 'busqueda-analisis' }"
                  class="menu-link"
                  exact
                  ><span class="menu-label">Análisis</span>
                </nuxt-link>
              </li>

              <li class="nav-item">
                <nuxt-link
                  :to="{ name: 'busqueda-articulos' }"
                  class="menu-link"
                >
                  <span class="menu-label">Artículos</span>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{ name: 'forum' }" class="menu-link">
                  <span class="menu-label">Foro</span>
                </nuxt-link>
                <!--<a @click="gotoForum" class="menu-link">-->
                <!--<span class="menu-label">Foro</span>-->
                <!--</a>-->
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{ name: 'lanzamientos' }"
                  class="menu-link"
                  exact
                  ><span class="menu-label">Calendario</span>
                </nuxt-link>
              </li>

              <template v-if="!isAuthenticated">
                <li class="nav-item">
                  <nuxt-link :to="{ name: 'usuario-login' }" class="link">
                    Login/Registrarse
                  </nuxt-link>
                </li>
              </template>

              <template v-else>
                <li class="nav-item">
                  <nuxt-link :to="{ name: 'usuario-logros' }" class="menu-icon">
                    <span class="menu-label">
                      Inventario
                    </span>
                  </nuxt-link>
                </li>
                <b-nav-item-dropdown right>
                  <template slot="button-content">
                    <fa :icon="faUser" />
                    {{ loggedUser.username }}
                  </template>
                  <div class="dropdown-item dropdown-info-box">
                    <nuxt-link
                      :to="{
                        name: 'usuario-username',
                        params: { username: loggedUser.username }
                      }"
                      class="profile-card-container"
                    >
                      <navbar-user-profile
                        :go="loggedUser"
                      ></navbar-user-profile>
                    </nuxt-link>
                  </div>

                  <b-dropdown-item class="mobile-half-width">
                    <div @click="showEditProfileModal">Editar Perfil</div>
                  </b-dropdown-item>

                  <b-dropdown-item
                    class="mobile-half-width"
                    :to="{ name: 'usuario-preferencias' }"
                    exact
                  >
                    Preferencias
                  </b-dropdown-item>

                  <b-dropdown-item @click="logout()"
                    ><span style="color: red">Cerrar Sesión</span>
                  </b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right ref="notificationDropdown">
                  <template slot="button-content">
                    <span @click="setReadNotifications">
                      <fa :icon="faComment" />
                      <span class="dropdown-text">{{
                        activeNotifications
                      }}</span>
                    </span>
                  </template>

                  <div class="dropdown-item dropdown-info-box">
                    <div
                      :key="notification.id"
                      v-for="notification in loggedUser.notifications.filter(
                        el => el.new === true
                      )"
                      class="navbar-notification-list"
                    >
                      <nuxt-link
                        :to="{ name: 'usuario-mensajes-username' }"
                        v-if="notification.notification_type === 'achievement'"
                        class="navbar-notification"
                      >
                        <img
                          class="notification-icon"
                          :src="
                            staticUrl(
                              'achievements/' + notification.new_achievement
                            )
                          "
                          alt=""
                        />

                        <div class="notification-details">
                          <span class="notification-tag">Nuevo Logro</span>
                          <div class="notification-content">
                            {{ notification.notification_message }}
                          </div>
                        </div>
                      </nuxt-link>

                      <nuxt-link
                        :to="{ name: 'usuario-mensajes-username' }"
                        v-else-if="
                          notification.notification_type === 'user_follow'
                        "
                        class="navbar-notification"
                      >
                        <img
                          class="notification-icon"
                          :src="mediaUrl('user_follow_symbol.png')"
                          alt=""
                        />
                        <div class="notification-details">
                          <div class="notification-content">
                            !{{ notification.notification_message }}
                            te esta siguiendo!
                          </div>
                        </div>
                      </nuxt-link>

                      <nuxt-link
                        :to="{ name: 'usuario-mensajes-username' }"
                        v-else-if="
                          notification.notification_type === 'post_vote'
                        "
                        class="navbar-notification"
                      >
                        <img
                          class="notification-icon"
                          :src="mediaUrl('vote_symbol.png')"
                          alt=""
                        />
                        <div class="notification-details">
                          <div class="notification-content">
                            !{{ notification.notification_message }}
                            ha votado tu comentario!
                          </div>
                        </div>
                      </nuxt-link>

                      <nuxt-link
                        :to="{ name: 'usuario-mensajes-username' }"
                        v-else-if="
                          notification.notification_type === 'tag_content'
                        "
                        class="navbar-notification"
                      >
                        <img
                          class="notification-icon"
                          :src="mediaUrl('new_tag_content_symbol.png')"
                          alt=""
                        />
                        <div class="notification-details">
                          <div class="notification-content">
                            {{ notification.notification_message }}
                          </div>
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                  <nuxt-link
                    class="dropdown-item"
                    :to="{ name: 'usuario-mensajes-username' }"
                  >
                    <div>
                      Ver todas
                    </div>
                  </nuxt-link>
                </b-nav-item-dropdown>
              </template>
              <b-nav-item-dropdown right class="drop">
                <template slot="button-content">
                  <fa :icon="faSearch" />
                </template>
                <div class="dropdown-info-box">
                  <div class="search-container">
                    <input
                      v-model="searchString"
                      placeholder="¿Qué estas buscando?"
                    />
                  </div>
                  <div class="suggestion-box">
                    <div
                      class="suggestion"
                      v-for="suggestion in suggestions"
                      @click="searchWidget(suggestion.title)"
                      :key="suggestion.title"
                    >
                      {{ suggestion.title }}
                    </div>
                  </div>
                </div>
                <b-dropdown-item
                  ref="searchDropdown"
                  class="search-button"
                  @click="searchWidget()"
                >
                  Buscar
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </header>
  </div>
</template>

<script>
import { faComment, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { uploadAvatarToS3 } from "~/services/s3";
import { mapGetters } from "vuex";
import NavbarUserProfile from "~/components/core/NavbarUserProfile.vue";
import PatreonSupport from "~/components/core/PatreonSupport.vue";
import SocialCloud from "~/components/core/SocialCloud.vue";
import Cookie from "js-cookie";
import _ from "lodash";

export default {
  name: "Header",
  components: {
    SocialCloud,
    NavbarUserProfile,
    PatreonSupport
  },
  data() {
    return {
      avatarCroppedData: "",
      suggestions: [],
      move: "",
      loadingModal: false,
      searchString: "",
      mobileDevice: false,
      random: Math.floor(Math.random() * 4) + 1,
      currentTab: 1,
      selectedBorderSlug: "",
      selectedTitleName: "",
      selectedAchievements: [],
      avatarImageData: "",
      avatarChanged: false,
      show: false,
      avatarURL:
        "https://s3.eu-central-1.amazonaws.com/bitcoregaming/avatars/1552737861069.png",
      linkToForum: "",
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      avatarCroppedUrl: ""
    };
  },
  watch: {
    searchString() {
      this.onSearchSuggestions();
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    faSearch() {
      return faSearch;
    },
    faComment() {
      return faComment;
    },
    faUser() {
      return faUser;
    },
    activeNotifications() {
      return this.loggedUser.notifications
        ? this.loggedUser.notifications.filter(el => el.new === true).length
        : 0;
    },
    isMasonry() {
      return this.$route.path === "/";
    },
    profileDifference() {
      return (
        [...this.selectedAchievements].sort().join() !==
        [...this.loggedUser.active_achievements].sort().join()
      );
    },
    saveDisabled() {
      return (
        this.selectedBorderSlug === this.active_border &&
        this.selectedTitleName === this.active_title &&
        !this.selectedTitlesDiference &&
        !this.avatarChanged
      );
    }
  },
  props: ["scroll"],
  methods: {
    clickAvatar() {
      this.currentTab = 4;
    },
    setReadNotifications() {
      if (
        !this.loggedUser ||
        (!this.loggedUser.notifications ||
          !this.loggedUser.notifications.length) ||
        this.$refs.notificationDropdown.visible === true
      )
        return;
      const notificationIds = this.loggedUser.notifications.map(el => el.id);
      this.$axios
        .$post("/notifications", {
          notifications: notificationIds
        })
        .then(() => {
          this.$store.commit("CLEAR_ACTIVE_NOTIFICATIONS");
        });
    },
    onSearchSuggestions() {
      let params = {
        search_string: this.searchString
      };
      this.$axios
        .$get("/autocomplete_publication", { params })
        .then(response => {
          this.suggestions = response.results;
          console.log(this.suggestions);
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
    gotoForum() {
      window.open(
        `${process.env.PUBLIC_FORUM_URL}?token=${window.localStorage.bitcore_jwt}`,
        "_blank"
      );
    },
    toggleShow() {
      const fr = new FileReader();
      fr.addEventListener("load", e => {
        this.avatarURL = e.target.result;
        this.$refs.cropper.replace(this.avatarURL);
        this.avatarChanged = true;
      });
      fr.readAsDataURL(this.$refs.imageInput.files[0]);
    },
    selectAchievement(achievementSlug) {
      if (this.selectedAchievements.includes(achievementSlug)) {
        if (this.selectedAchievements.length > 1) {
          this.selectedAchievements = _.without(
            this.selectedAchievements,
            achievementSlug
          );
        }
      } else {
        if (this.selectedAchievements.length >= 3) {
          this.selectedAchievements = this.selectedAchievements.slice(1, 3);
        }
        this.selectedAchievements.push(achievementSlug);
      }
    },
    selectBorder: function(borderSlug) {
      this.selectedBorderSlug = borderSlug;
    },
    selectTitle(titleName) {
      this.selectedTitleName = titleName;
    },
    fetchAvatarImageData() {
      this.avatarURL = this.loggedUser.avatar;
      this.avatarCroppedUrlKey = this.getAvatarUrl(
        this.loggedUser && this.loggedUser.avatar_cropped
      );
    },
    onShowProfileSelectModal() {
      this.selectedAchievements = _.clone(this.loggedUser.active_achievements);
      this.selectedBorderSlug = this.loggedUser.active_border;
      this.selectedTitleName = this.loggedUser.active_title;
      this.fetchAvatarImageData();
    },
    uploadPicture() {
      $("#image-file").click();
    },
    async saveChanges(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.loadingModal = true;
      const data = {};
      if (this.selectedBorderSlug !== this.loggedUser.active_border) {
        data["active_border"] = this.selectedBorderSlug;
      }
      if (this.selectedTitleName !== this.loggedUser.active_title) {
        data["active_title"] = this.selectedTitleName;
      }
      if (this.profileDifference) {
        data["active_achievements"] = this.selectedAchievements;
      }
      if (this.avatarChanged) {
        const cropped = this.$refs.cropper.getCroppedCanvas().toDataURL();
        const [first, second] = await Promise.all([
          uploadAvatarToS3(this.avatarURL, true),
          uploadAvatarToS3(cropped)
        ]);
        data["avatar"] = first.Location;
        data["avatar_cropped"] = second.Location;
      }
      this.$axios
        .$post("/actualizar_usuario", { data: data })
        .then(updateResponse => {
          this.$store.commit("SET_USER", updateResponse);
        })
        .finally(() => {
          this.loadingModal = false;
          this.closeEditProfileModal();
        });
    },
    showEditProfileModal() {
      this.$refs.EditProfileModal.show();
    },
    closeEditProfileModal() {
      this.$refs.EditProfileModal.hide();
    },
    searchWidget(itemName = null) {
      this.$refs.searchDropdown.closeDropdown();
      this.$router.push({
        name: "busqueda-term",
        params: { term: itemName || this.searchString || null }
      });
    },
    logout() {
      this.$router.replace({ path: "/" });
      this.$store.commit("CLEAR_SESSION");
      Cookie.remove("bitcore_jwt");
      localStorage.removeItem("bitcore_jwt");
    },
    checkIfMobile() {
      function isMobileDevice() {
        return (
          typeof window.orientation !== "undefined" ||
          navigator.userAgent.indexOf("IEMobile") !== -1
        );
      }
      if (isMobileDevice() === true) {
        this.mobileDevice = true;
      }
    }
  },
  mounted() {
    this.checkIfMobile();
    this.avatarURL = this.loggedUser && this.loggedUser.avatar;
    this.avatarCroppedUrl = this.loggedUser && this.loggedUser.avatar_cropped;
  }
};
</script>

<style lang="scss">
.image-crop-result {
  max-width: 100%;
  max-height: 100%;
}
.modal-header {
  .close {
    color: #fff !important;
  }
}
.header-wrapper {
  width: 100%;
  .home-header {
    .home-hero-image {
      width: 100%;
      height: 300px;
      background-color: gray("700");
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .navbar {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    height: 50px;
    background-color: gray("background");
    .container-fluid {
      height: 50px;
      .social-wrapper {
        height: 50px;
        margin: 0px -15px;
      }
    }
  }
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
  #navbar-main {
    top: 0;
    z-index: 999;
    background-color: color("yellow");
    padding-top: 0px;
    padding-bottom: 0px;
    height: 50px;
    box-shadow: 0px 5px 6px rgba(black, 0.5);
    .navbar-brand {
      padding: 0px 5px;
      @media (max-width: 767px) {
        padding: 0px;
      }
      a {
        img {
          &.img-logo {
            height: 90px;
            width: auto;
            margin-top: -55px;
          }
          &.img-logo-small {
            height: 40px;
            width: auto;
          }
          &:not(.active) {
            display: none;
          }
          @media (max-width: 991px) {
            &.img-logo {
              display: none !important;
            }
            &.img-logo-small {
              display: block !important;
            }
          }
        }
      }
    }
    .navbar-toggler {
      outline: none;
      border: none;
      padding: 10px 0px;
    }
    #nav-collapse {
      margin: 0px;
      background-color: color("yellow");
      @media (max-width: 991px) {
        margin: 0px -16px;
        border-top: 2px solid gray("700");
        box-shadow: 0px 5px 6px rgba(black, 0.5);
      }
      .nav-item {
        color: gray("background");
        .dropdown-menu {
          border-top: 1px solid gray("700");
          border-bottom: 1px solid gray("700");
          font-size: 10px;
          @media (min-width: 991px) {
            box-shadow: 1px 5px 6px rgba(black, 0.5);
          }
          @media (max-width: 991px) {
            margin: 15px;
            border-radius: 15px;
            overflow: hidden;
            border: 2px solid gray("700");
            max-width: calc(100vw - 30px);
            min-width: calc(100vw - 30px);
          }
        }
        a {
          @include transition-hover-intent();
          line-height: 20px;
          padding: 15px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: inline-block;
          outline: none;
          min-width: 50px;
          text-align: center;
          &:link,
          &:visited {
            color: gray("background");
          }
          &:hover,
          &:active {
            color: color("yellow") !important;
            text-decoration: none;
            background-color: gray("background");
          }
          &.menu-link {
            cursor: pointer;
          }
          .fa {
            font-size: 18px;
          }
          .dropdown-text {
            padding-left: 5px;
          }
          &.dropdown-item {
            border: none;
            border-image: none;
          }
        }
        &.dropdown.show {
          a {
            background: gray("background");
            color: color("yellow") !important;
            &.dropdown-item {
              background-color: gray("900");
              border-top: 1px solid gray("700");
              padding: 13px 15px;
              &.mobile-half-width {
                @media (max-width: 767px) {
                  width: 50%;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  font-size: 12px;
                  &:first-of-type {
                    border-right: 1px solid gray("700");
                  }
                }
              }
            }
            &:hover,
            &:active {
              background-color: color("yellow");
              color: gray("900") !important;
            }
          }
          .dropdown-info-box {
            min-width: 380px;
            padding: 0px;
            border-top: none;
            &:hover {
              background: gray("background");
            }
            .profile-card-container {
              &:hover {
                background-color: gray("background");
              }
            }
            .navbar-notification-list {
              .navbar-notification {
                width: 100%;
                border-bottom: 1px solid gray("700");
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                padding: 8px 15px;
                .notification-icon {
                  object-fit: cover;
                  height: 50px;
                  width: 50px;
                  display: inline-block;
                }
                .notification-details {
                  padding-left: 10px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: flex-start;
                  width: calc(100% - 60px);
                  .notification-tag {
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
                    margin-bottom: 4px;
                    @include transition-hover-intent();
                  }
                  .notification-content {
                    font-family: "Roboto", sans-serif;
                    letter-spacing: 0.025em;
                    text-transform: none;
                    color: gray("500");
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                    @include transition-hover-intent();
                  }
                }
                &:hover {
                  .notification-details {
                    .notification-tag {
                      background-color: gray("900");
                      color: color("yellow");
                    }
                    .notification-content {
                      color: gray("900");
                    }
                  }
                }
              }
            }
            .search-container {
              background: gray("background");
              padding: 10px;
              input {
                outline: none;
                padding: 5px 15px;
                background: gray("900");
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
                  background: gray("700");
                }
              }
            }
            .suggestion-box {
              padding: 5px;
              .suggestion {
                font-size: 13px;
                color: $yellow;
                margin: 3px;
                cursor: pointer;
                &:hover {
                  color: darken($yellow, 5);
                }
              }
            }
          }
        }
        .social-menu {
          width: 100%;
          height: 50px;
          text-align: center;
          background-color: gray("background");
          a {
            width: 28px;
            min-width: initial;
            display: inline-block;
            margin: 10px;
            padding: 6px;
            &:link,
            &:visited {
              color: color("yellow");
            }
            &:hover,
            &:active {
              color: white !important;
            }
          }
        }
        .patreon-support {
          height: 50px;
          padding: 0px;
          width: 100%;
          border-top: 2px solid color("yellow");
          a {
            padding: 10px 15px;
            background-color: gray("background");
            color: color("yellow");
            border-bottom: 2px solid color("yellow");
            width: 100%;
            &:hover,
            &:active {
              color: white !important;
            }
          }
        }
        &:not(.d-md-none) {
          a:not(.dropdown-item) {
            @media (max-width: 1139px) {
              text-align: left;
              width: 100%;
              padding: 10px 15px;
            }
          }
          @media (max-width: 991px) {
            &.dropdown {
              width: 100%;
              border-top: 2px solid gray("900");
              .dropdown-item:not(.dropdown-info-box) {
                padding: 10px 15px !important;
              }
            }
          }
        }
        &.d-md-none {
          width: 100%;
        }
      }
      .navbar-nav {
        @media (max-width: 991px) {
          flex-direction: row;
          flex-wrap: wrap;
        }
      }
    }
    .patreon-support {
      height: 50px;
      padding: 0px;
      width: 100%;
      border-top: 2px solid color("yellow");
      a {
        padding: 10px 15px;
        background-color: gray("background");
        color: color("yellow");
        border-bottom: 2px solid color("yellow");
        text-transform: none;
        &:hover,
        &:active {
          color: white !important;
        }
      }
    }
  }
}

#EditProfileModal {
  .modal-dialog {
    max-width: 800px !important;
    .modal-header {
      border-bottom: none;
    }
    .modal-body {
      @media (max-width: 767px) {
        padding: 15px 0px;
      }
      .profile-tabs {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        .profile-tab {
          background: none;
          border: none;
          outline: none;
          border-bottom: 3px solid transparent;
          border-radius: 0px;
          @include transition-hover-intent();
          margin: 0px 5px 5px 5px;
          color: $white;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 14px;
          text-transform: uppercase;
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
    }
    .ach-image-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      flex-direction: row;
      justify-content: center;
    }
    .ach-image-div {
      width: 80px;
      height: 80px;
      margin: 15px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
      cursor: pointer;
      padding: 5px;
      box-shadow: inset 0px 0px 0px 5px gray("900");
      @include transition-hover-intent();
      img {
        width: 70px;
        height: 70px;
      }
      &:not(.active-ach):hover {
        box-shadow: inset 0px 0px 0px 5px gray("600");
      }
    }
    .ach-frame-div {
      width: 140px;
      height: 140px;
      margin: 15px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
      cursor: pointer;
      padding: 5px;
      box-shadow: inset 0px 0px 0px 5px gray("900");
      overflow: hidden;
      img {
        width: 180px;
        height: 180px;
        margin-left: -25px;
        margin-top: -25px;
      }
      &:not(.active-ach):hover {
        box-shadow: inset 0px 0px 0px 5px gray("600");
      }
    }
    .title-div {
      background-color: gray("900");
      margin: 15px;
      padding: 20px 25px;
      border-radius: 10px;
      text-align: center;
      cursor: pointer;
      box-shadow: inset 0px 0px 0px 5px gray("600");
      @include transition-hover-intent();
      span {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: $white;
      }
      &:not(.active-ach):hover {
        box-shadow: inset 0px 0px 0px 5px $white;
      }
      &.active-ach {
        span {
          color: color("yellow");
        }
      }
    }
    .active-ach {
      box-shadow: inset 0px 0px 0px 5px color("yellow");
    }
    .crop-info {
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .upload-picture {
      margin: 10px;
      border-radius: 10px;
      color: black;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 700;
      border: none;
      padding: 8px 10px;
      letter-spacing: 0.1em;
    }
    .avatar-editor {
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: relative;
    }
    .upload-picture {
      position: relative;
      padding: 5px 10px;
      right: 5px;
      background: #fad000;
    }
    .cropper-footer {
      .checkbox-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 10px;
        width: 100%;
        padding: 5px 15px;
        label {
          white-space: normal;
          display: flex;
          cursor: pointer;
          font-size: 12px;
          line-height: 20px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: gray("500");
          @include transition-hover-intent();
          &::before {
            display: inline-block;
            content: "";
            margin-top: 1px;
            width: 17px;
            height: 16px;
            border-radius: 5px;
            background-color: gray("800");
            box-shadow: inset 0px 0px 0px 2px gray("600");
            margin-right: 10px;
            @include transition-hover-intent();
          }
          &:hover,
          &:active {
            color: gray("200");
            &::before {
              background-color: gray("600");
            }
          }
        }
        input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"]:checked + label {
          color: gray("200");
          &::before {
            background-color: color("yellow");
          }
        }
      }
    }
    .avatar-editor {
      text-align: center;
      .vicp-wrap {
        min-height: 50vh;
        .vicp-crop {
          display: flex;
          .vicp-crop-left {
            width: 100%;
          }
        }
      }
    }
    .modal-footer {
      .btn-primary {
        background: color("yellow");
        display: inline-block;
        border: none;
        outline: none;
        border-radius: 10px;
        padding: 8px 20px;
        color: $black;
        font-size: 14px;
        letter-spacing: 0.1em;
        font-weight: 700;
        text-transform: uppercase;
        @include transition-hover-intent();
        &:hover,
        &:active,
        &:focus {
          background-color: darken(color("yellow"), 10);
          text-decoration: none;
        }
      }
      .btn-secondary {
        background: gray("700");
        display: inline-block;
        border: none;
        outline: none;
        border-radius: 10px;
        padding: 8px 20px;
        color: gray("200");
        font-size: 14px;
        letter-spacing: 0.1em;
        font-weight: 700;
        text-transform: uppercase;
        @include transition-hover-intent();
        &:hover,
        &:active,
        &:focus {
          background-color: gray("400");
          color: $black;
          text-decoration: none;
        }
      }
    }
  }
}
.fixed-size {
  max-width: 1600px;
}
</style>
