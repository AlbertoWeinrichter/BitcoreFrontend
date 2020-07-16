<template>
  <div class="pt-5 pb-5">
    <div class="row">
      <div
        v-if="user"
        class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2"
      >
        <div class="user-profile-wrapper wcorners">
          <div class="inner">
            <span class="bc-t"></span>
            <div class="avatar-background">
              <div class="avatar-wrapper">
                <img :src="user.avatar" class="avatar-frame" />
              </div>
              <div class="background-overlay-wrapper">
                <div class="background-overlay"></div>
              </div>
            </div>
            <div class="avatar-row">
              <div class="avatar">
                <img
                  :src="staticUrl('frames/' + user.active_border)"
                  class="avatar-frame"
                />
                <img
                  :src="user.avatar_cropped"
                  class="img-fluid rounded-circle"
                  alt="user avatar"
                />
              </div>
              <div class="user-info">
                <div class="user-name">{{ user.username }}</div>
                <div class="user-title">
                  {{ user.active_title }}
                </div>
              </div>
            </div>

            <div class="user-button-wrapper" v-if="ownProfile">
              <div class="user-button" v-b-modal.profileModal>
                Editar Perfil
              </div>
            </div>
            <div class="user-button-wrapper" v-else>
              <nuxt-link
                :to="{
                  name: 'usuario-mensajes-username',
                  params: { username: this.username }
                }"
              >
                <div class="user-button">
                  Enviar Mensaje
                </div>
              </nuxt-link>
              <div class="user-button" @click="followUser()">
                Seguir Usuario
              </div>
              <div class="user-button danger" @click="blockUser()">
                Bloquear Usuario
              </div>
            </div>

            <div class="achievements">
              <div class="achievements-title">Logros</div>
              <div class="achievements-wrapper">
                <div
                  class="achievement-item"
                  v-for="achievement in user.active_achievements"
                  :key="achievement"
                >
                  <img
                    class="img-fluid"
                    :src="staticUrl('achievements/' + achievement)"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div class="user-data-wrapper">
              <div class="user-data-item">
                <span class="user-data-title">Seguidores</span>
                <span class="user-data-number">{{
                  user.scores.follower_users
                }}</span>
              </div>
              <div class="user-data-item">
                <span class="user-data-title">Seguidos</span>
                <span class="user-data-number">{{
                  user.scores.followed_users
                }}</span>
              </div>
              <div class="user-data-item">
                <span class="user-data-title">Etiquetas seguidas</span>
                <span class="user-data-number">
                  {{user.scores.followed_tags}}
                </span>
              </div>
              <div class="user-data-item">
                <span class="user-data-title">Titulos</span>
                <span class="user-data-number">{{
                  user.scores.total_titles
                }}</span>
              </div>
              <div class="user-data-item">
                <span class="user-data-title">Logros</span>
                <span class="user-data-number">{{
                  user.scores.total_achievements
                }}</span>
              </div>
              <div class="user-data-item">
                <span class="user-data-title">Marcos</span>
                <span class="user-data-number">{{
                  user.scores.total_borders
                }}</span>
              </div>
            </div>
            <span class="bc-b"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "usuario-sumario",
  data: function() {
    return {
      ownProfile: null,
      user: null
    };
  },
  computed: {
    ...mapGetters(["loggedUser"]),
    username() {
      return _.get(this.user, "username");
    }
  },
  methods: {
    blockUser() {
      if (window.confirm("¿Estás seguro?")) {
        this.$axios
          .$post("/seguir_usuario/", {
            friend: this.user.username,
            follow: false,
            block: true
          })
          .then(followResponse => {
            this.$notify({
              group: "main",
              type: "success",
              title: "Exito",
              text: "Has bloqueado a " + this.user.username
            });
            this.$toast.error(
              "¡Has dejado de seguir a " + this.user.username + "!"
            );
          });
      }
    },
    followUser() {
      if (window.confirm("¿Estás seguro?")) {
        this.$axios
          .$post("/seguir_usuario/", {
            friend: this.user.username,
            follow: true,
            block: false
          })
          .then(followResponse => {
            // this.$notify({
            //   group: "main",
            //   type: "success",
            //   title: "Exito",
            //   text: "Ahora sigues a " + this.user.username
            // });
            // this.$toast.error("¡Ahora sigues a " + this.user.username + "!");
          });
      }
    },
    getUser(username) {
      this.$axios.$get(`/usuarios/${username}`).then(response => {
        this.user = response;
      });
    }
  },
  created() {
    if (
      this.loggedUser.username === this.$route.path.replace("/usuario/", "")
    ) {
      this.ownProfile = true;
      this.user = this.loggedUser;
    } else {
      this.getUser(this.$route.path.replace("/usuario/", ""));
    }
  }
};
</script>

<style lang="scss" scoped>
.user-profile-wrapper {
  background: linear-gradient(gray("800"), gray("900"));
  padding: 0;
  box-shadow: inset 0 0 0 5px color("yellow");
  @include curcorners(15px);
  @include transition-hover-intent();
  .inner {
    position: relative;
    overflow: hidden;
    padding: 330px 30px 30px 30px;
    @media (max-width: 767px) {
      padding: 315px 15px 15px 15px;
    }
  }
  .avatar-background {
    position: absolute;
    width: calc(100% + 60px);
    height: 450px;
    top: -30px;
    left: -30px;
    overflow: hidden;
    .avatar-wrapper {
      width: 100%;
      height: 0px;
      position: relative;
      img {
        position: absolute;
        width: calc(100% - 30px);
        height: 450px;
        object-fit: cover;
        object-position: 50% 0;
        z-index: -1;
      }
    }
    .background-overlay-wrapper {
      .background-overlay {
        width: calc(100% - 60px);
        height: 430px;
        margin: 30px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
        border-top: 5px solid color("yellow");
        border-left: 5px solid color("yellow");
        border-right: 5px solid color("yellow");
        z-index: 2;
      }
    }
  }
  .avatar-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .avatar {
      width: 150px;
      height: 150px;
      display: flex;
      padding: 36px;
      justify-content: center;
      margin: 0px 0px 0px -30px;
      position: relative;
      overflow: hidden;
      @include transition-hover-intent();
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 150px;
      .avatar-frame {
        width: 240px;
        height: 240px;
        top: -45px;
        left: -45px;
        position: absolute;
      }
      .img-fluid {
        width: 100%;
        height: auto;
      }
      @media (max-width: 767px) {
        width: 130px;
        height: 130px;
        flex-basis: 130px;
        .avatar-frame {
          width: 180px;
          height: 180px;
          top: -25px;
          left: -25px;
        }
      }
    }
    .user-info {
      z-index: 10;
      margin-top: 48px;
      margin-left: -10px;
      .user-name {
        font-size: 28px;
        line-height: 40px;
        font-weight: 700;
        letter-spacing: 0.025em;
        color: $white;
        margin-bottom: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        whitespace: nowrap;
      }
      .user-title {
        margin: -20px auto 10px auto;
        font-size: 14px;
        line-height: 24px;
        color: gray("600");
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-align: center;
        padding-top: 10px;
        height: 34px;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        whitespace: nowrap;
        @include transition-hover-intent();
      }
      @media (max-width: 767px) {
        margin-top: 40px;
        .user-name {
          font-size: 20px;
          line-height: 28px;
        }
        .user-title {
          font-size: 10px;
          line-height: 20px;
        }
      }
    }
  }
  .achievements {
    width: 100%;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid gray("700");
    @include transition-hover-intent();
    .achievements-title {
      display: block;
      width: 100%;
      color: gray("600");
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 10px;
    }
    .achievements-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      .achievement-item {
        width: 75px;
        height: 75px;
        margin: 0px 15px;
      }
    }
  }
  .user-button-wrapper {
    width: 100%;
    margin-top: -15px;
    text-align: center;
    .user-button {
      background: gray("700");
      display: inline-block;
      border: none;
      outline: none;
      appearance: none;
      border-radius: 10px;
      padding: 8px 15px;
      color: color("yellow");
      font-size: 14px;
      letter-spacing: 0.1em;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 10px;
      cursor: pointer;
      width: 100%;
      @include transition-hover-intent();
      &:hover,
      &:active,
      &:focus {
        background: color("yellow");
        color: $black;
        text-decoration: none;
      }
      &.danger {
        color: color("red");
      }
    }
  }
  .user-data-wrapper {
    margin-top: 20px;
    border-top: 1px solid gray("700");
    width: 100%;
    font-size: 0px;
    .user-data-item {
      width: 33.33%;
      display: inline-block;
      text-align: center;
      margin-top: 20px;
      @media (max-width: 1199px) {
        width: 50%;
      }
      .user-data-title {
        display: block;
        color: gray("600");
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .user-data-number {
        display: block;
        font-size: 48px;
        line-height: 54px;
        font-weight: 400;
        letter-spacing: 0.05em;
        color: color("yellow");
      }
    }
  }
  .bc-t,
  .bc-b {
    opacity: 1 !important;
    @include transition-hover-intent();
  }
}
</style>
