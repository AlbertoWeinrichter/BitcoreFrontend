<template>
  <div>
    <div class="user-profile-container-inner wcorners">
      <nuxt-link
        :to="{ name: 'usuario-username', params: { username: user.username } }"
        class="inner"
      >
        <span class="bc-t"></span>
        <h4 class="username">{{ user.username }}</h4>

        <div class="avatar">
          <img
            :src="staticUrl('frames/' + user.active_border)"
            class="avatar-frame"
          />
          <img
            :src="user.avatar_cropped"
            class="avatar-img rounded-circle"
            alt="user avatar"
          />
        </div>

        <div class="user-title">
          {{ user.active_title }}
        </div>

        <div class="achievements">
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
        <span class="bc-b"></span>
      </nuxt-link>
    </div>

    <div
      v-if="card_type === 'blocked'"
      @click="unblockUser(item_index)"
      class="user-card-action"
    >
      Dejar de Bloquear
    </div>

    <div
      v-if="card_type === 'followed'"
      @click="unfollowUser(item_index)"
      class="user-card-action"
    >
      Dejar de Seguir
    </div>
  </div>
</template>

<script>
export default {
  name: "user-profile-card",
  data: function() {
    return {};
  },
  props: ["user", "card_type", "item_index"],
  methods: {
    unfollowUser() {
      if (window.confirm("¿Estás seguro?")) {
        this.$axios
          .$post("/seguir_usuario/", {
            friend: this.user.username,
            follow: false,
            block: false
          })
          .then(followResponse => {
            this.$notify({
              group: "main",
              type: "success",
              title: "Exito",
              text: "Has bloqueado a " + this.user.username
            });
            console.log(followResponse);
          });
      }
    },
    unblockUser() {
      if (window.confirm("¿Estás seguro?")) {
        this.$axios
          .$post("/seguir_usuario/", {
            friend: this.user.username,
            follow: false,
            block: false
          })
          .then(followResponse => {
            this.$notify({
              group: "main",
              type: "success",
              title: "Exito",
              text: "Has bloqueado a " + this.user.username
            });
            console.log(followResponse);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.user-card-action {
  background: gray("700");
  padding: 12px 15px 10px 15px;
  font-weight: 700;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: color("yellow");
  font-size: 14px;
  text-align: center;
  @include transition-hover-intent();
  cursor: pointer;
  &:hover,
  &:active {
    background: color("yellow");
    border-color: color("yellow");
    color: color("red");
  }
}

a:hover {
  text-decoration: none;
}

.user-profile-container-inner {
  background: linear-gradient(gray("800"), gray("900"));
  padding: 30px;
  box-shadow: inset 0px 0px 0px 4px darken(color("yellow"), 15);
  @include curcorners(15px);
  @include transition-hover-intent();
  a {
    .username {
      text-align: center;
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 10px;
      font-weight: 600;
      letter-spacing: 0.025em;
      color: gray("200");
      @include transition-hover-intent();
      @media (max-width: 991px) {
        font-size: 16px;
        line-height: 24px;
      }
    }
    .avatar {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      display: flex;
      padding: 34px 0px;
      justify-content: center;
      margin: -15px auto 0px auto;
      position: relative;
      overflow: hidden;
      @include transition-hover-intent();
      .avatar-frame {
        width: 330px;
        height: 330px;
        top: -70px;
        position: absolute;
      }
      .avatar-img {
        width: 120px;
        height: 120px;
      }
    }
    .user-title {
      margin: 0px auto 10px auto;
      font-size: 14px;
      line-height: 24px;
      color: gray("600");
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      padding-top: 10px;
      height: 34px;
      @include transition-hover-intent();
      @media (max-width: 767px) {
        font-size: 12px;
      }
    }
    .achievements {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      @include transition-hover-intent();
      .achievement-item {
        width: 75px;
        margin: 0px 15px;
      }
    }
    .bc-t,
    .bc-b {
      opacity: 0.8 !important;
      @include transition-hover-intent();
    }
  }
  &:hover,
  &:active {
    box-shadow: inset 0px 0px 0px 5px color("yellow");
    a {
      text-decoration: none;
      .username {
        margin-top: 3px;
      }
      .avatar {
        margin-top: -18px;
        transform: scale(1.1);
      }
      .user-title {
        margin-top: -11px;
      }
      .achievements {
        margin-bottom: 11px;
      }
      .bc-t,
      .bc-b {
        opacity: 1 !important;
      }
    }
  }
}
</style>
