<template>
    <div class="pt-5 pb-5 bc-container-fluid">
        <h1 class="head pb-5">Preferencias</h1>
        <div class="row">
            <div class="preference-card col-xl-3 col-md-6">
                <form autocomplete="off">
                    <div class="card-inner">
                        <div class="card-content">
                            <div class="card-title">Notificaciones</div>
                            <div class="form-row">
                                <div class="checkbox-group">
                                    <input
                                            type="checkbox"
                                            id="publicationNotificationPref"
                                            v-model="PublicationNotificationPref"
                                            name="publicationNotificationPref"
                                            :value="profile.preferences.PublicationNotificationPref"
                                    />

                                    <label for="publicationNotificationPref">
                                        Mostrar notificaciones de publicaciones
                                    </label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="checkbox-group">
                                    <input
                                            type="checkbox"
                                            id="publicationUserPref"
                                            v-model="profile.preferences.UserNotificationPref"
                                            name="publicationUserPref"
                                    />

                                    <label for="publicationUserPref">
                                        Mostrar notificaciones de usuarios
                                    </label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="checkbox-group">
                                    <input
                                            type="checkbox"
                                            id="publicationCommentPref"
                                            v-model="profile.preferences.commentNotificationPref"
                                            name="publicationCommentPref"
                                    />
                                    <label for="publicationCommentPref">
                                        Mostrar notificaciones de comentarios
                                    </label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="checkbox-group">
                                    <input
                                            type="checkbox"
                                            id="publicationForumPref"
                                            v-model="profile.preferences.ForumNotificationPref"
                                            name="publicationForumPref"
                                    />
                                    <label for="publicationForumPref">
                                        Mostrar notificaciones de foro
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button @click="submitPreferencesForm" class="submit-button">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>

            <div class="preference-card col-xl-3 col-md-6">
                <div class="card-inner">
                    <div class="card-content">
                        <div class="card-title">Social</div>
                        <div class="card-number-wrapper">
              <span class="card-number">{{
                profile.scores.followed_users
              }}</span>
                            siguiendo
                        </div>
                        <div class="card-number-wrapper">
              <span class="card-number">{{
                profile.scores.follower_users
              }}</span>
                            seguidores
                        </div>
                        <div class="card-number-wrapper">
                            <span class="card-number">{{ profile.scores.post_likes }}</span>
                            me gusta
                        </div>
                    </div>
                    <nuxt-link :to="{ name: 'usuario-social' }" class="submit-button"
                    >Gestionar Amistades
                    </nuxt-link>
                </div>
            </div>
            <div class="preference-card col-xl-3 col-md-6">
                <div class="card-inner">
                    <div class="card-content">
                        <div class="card-title">Etiquetas</div>
                        <div class="card-number-wrapper">
              <span class="card-number">{{
                profile.scores.followed_tags
              }}</span>
                            siguiendo
                        </div>
                    </div>

                    <nuxt-link :to="{ name: 'usuario-tags' }" class="submit-button"
                    >Gestionar Etiquetas &gt;
                    </nuxt-link>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <!--<form autocomplete="off">-->
                <!--<div class="card-inner">-->
                <!--<div class="card-content">-->
                <!--<div class="card-title">General</div>-->

                <!--<div class="form-row">-->
                <!--<div class="col form-group">-->
                <!--<label for="preferencesusername" class="preinput"-->
                <!--&gt;Correo Electrónico</label-->
                <!--&gt;-->
                <!--<input-->
                <!--type="text"-->
                <!--class="form-control"-->
                <!--id="preferencesusemail"-->
                <!--name="preferencesusemail"-->
                <!--:placeholder="profile.email"-->
                <!--v-model="emailInput"-->
                <!--/>-->
                <!--</div>-->
                <!--</div>-->

                <!--<br />-->
                <!--<br />-->
                <!--<br />-->
                <!--<br />-->
                <!--<br />-->
                <!--</div>-->
                <!--<button @click="resetPassword" class="submit-button">-->
                <!--Reiniciar Contraseña-->
                <!--</button>-->
                <!--<button @click="submitProfileForm" class="submit-button">-->
                <!--Guardar Cambios-->
                <!--</button>-->
                <!--</div>-->
                <!--</form>-->
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "usuario-preferencias",
    computed: {
      ...mapGetters(["isAuthenticated", "loggedUser"]),
      profile() {
        return this.$store.state.user;
      }
    },
    methods: {
      submitProfileForm(bvEvt) {
        bvEvt.preventDefault();
        let data = {};
        if (this.passwordInput !== "") {
          data.password = this.passwordInput;
        }
        if (this.usernameInput !== "") {
          data.username = this.usernameInput;
        }
        if (this.emailInput !== "") {
          data.email = this.emailInput;
        }
        localStorage.setItem("user", this.usernameInput);
        this.username = this.usernameInput;
        this.$notify({
          group: "main",
          type: "warning",
          title: "Éxito",
          text: "Perfil actualizado correctamente"
        });
      },
      resetPassword(bvEvt) {
        bvEvt.preventDefault();
      },
      submitPreferencesForm(bvEvt) {
        bvEvt.preventDefault();
        let data = {};
        if (this.PublicationNotificationPref !== false) {
          data.PublicationNotificationPref = true;
        }
        if (this.UserNotificationPref !== false) {
          data.UserNotificationPref = true;
        }
        if (this.CommentNotificationPref !== false) {
          data.CommentNotificationPref = true;
        }
        if (this.ForumNotificationPref !== false) {
          data.ForumNotificationPref = true;
        }
        this.$notify({
          group: "main",
          type: "warning",
          title: "Éxito",
          text: "Preferencias actualizadas correctamente"
        });
      }
    }
  };
</script>

<style lang="scss">
    .preference-card {
        margin-bottom: 30px;
        .card-title {
            font-size: 18px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .card-inner {
            background: linear-gradient(gray("800"), gray("900"));
            padding: 15px 20px;
            border-top: 4px solid color("yellow");
            box-shadow: 0 2px 10px rgba($black, 0.6);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            @media (min-width: 992px) {
                min-height: 375px;
            }
            label {
                position: relative;
                display: inline-block;
                font-size: 12px;
                line-height: 20px;
                font-weight: 700;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: gray("500");
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                @media (max-width: 767px) {
                    font-size: 10px;
                    line-height: 16px;
                }
            }
            input:not([type="checkbox"]) {
                outline: none;
                padding: 8px 15px;
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
                    box-shadow: none;
                }
            }
            .checkbox-group {
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-top: 10px;
                width: 100%;
                padding: 10px 15px 0 5px;
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
                        flex-grow: 0;
                        flex-shrink: 0;
                        flex-basis: 16px;
                        display: inline-block;
                        content: "";
                        margin-top: 2px;
                        width: 16px;
                        height: 16px;
                        border-radius: 5px;
                        background-color: gray("800");
                        box-shadow: inset 0 0 0 2px gray("600");
                        margin-right: 15px;
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
            .card-number-wrapper {
                margin-bottom: 10px;
                display: inline-block;
                font-size: 12px;
                line-height: 20px;
                font-weight: 700;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: gray("500");
                width: 100%;
                text-align: left;
                .card-number {
                    font-family: "Montserrat", sans-serif;
                    font-size: 48px;
                    line-height: 54px;
                    font-weight: 400;
                    letter-spacing: 0.05em;
                    color: color("yellow");
                }
            }
        }
    }

    .submit-button {
        padding: 0;
        font-size: 14px;
        letter-spacing: 0.1em;
        font-weight: 700;
        color: color("yellow");
        border: none;
        border-radius: 10px;
        background: transparent;
        text-transform: uppercase;
        margin: 10px 0;
        align-self: flex-end;
        cursor: pointer;
        @include transition-hover-intent();
        &:hover,
        &:active {
            color: $white;
            text-decoration: none;
        }
    }
</style>