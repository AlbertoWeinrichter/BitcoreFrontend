<template>
  <b-modal
    ref="TutorialModal"
    ok-title="Next"
    size="lg"
    cancel-title="Close"
    id="TutorialModal"
    :no-close-on-backdrop="steps[0] === 'active'"
    :no-close-on-esc="steps[0] === 'active'"
    :cancel-disabled="true"
    title="Tutorial"
    @ok="handleOk"
  >
    <div class="stepper">
      <div :class="`step ${steps[0]}`">
        <span :class="`circle`">
          <fa :icon="faCheck" v-if="steps[0] === 'finished'" />
          <span v-else>
            1
          </span>
        </span>
        <span>
          Step 1
        </span>
      </div>
      <div :class="`stick ${steps[0] === 'finished' && 'active'}`" />
      <div :class="`step ${steps[1]}`">
        <span :class="`circle`">
          <fa :icon="faCheck" v-if="steps[1] === 'finished'" />
          <span v-else>
            2
          </span>
        </span>
        <span>
          Step 2
        </span>
      </div>
      <div :class="`stick ${steps[1] === 'finished' && 'active'}`" />
      <div :class="`step ${steps[2]}`">
        <span :class="`circle`">3</span>
        <span>
          Step 3
        </span>
      </div>
    </div>
    <div class="content-container">
      <div :class="`step-content animated step-visible`">
        <div class="text-welcome">
          Bienvenido a bitcore! elige tu nombre de usuario
        </div>
        <b-form-input
          v-model="username"
          class="username-input"
          placeholder="Escribe tu nombre de usuario"
        ></b-form-input>
        <div
          class="form-text text-danger"
          v-for="(error, index) in errors"
          :key="index"
        >
          {{ error }}
        </div>
      </div>
      <div :class="`step-content animated`">
        <div class="text-welcome">
          Elige un avatar para que tus amigos te reconozcan!
        </div>

        <div class="avatar-editor" v-if="step == 2">
          <input @change="toggleShow" type="file" ref="imageInput" />
          <div style="max-height: 500px; margin: 0 auto; max-width: 500px;">
            <vue-cropper ref="cropper" :src="avatarURL" alt="Source Image" />
          </div>
        </div>
      </div>
      <div :class="`step-content animated`">
        <div class="text">
          En bitcore gaming tus acciones tienen recompensa. Interactua con la
          web para conseguir logros y marcos para demostrarle a todo el mundo lo
          guay que eres!
        </div>
        <div class="d-flex flex-wrap justify-content-center">
          <div class="badge">
            <img
              src="https://d1ak5h2umeycbs.cloudfront.net/static/images/achievements/its_on_like_donkey_kong.png"
              alt=""
              class="img-fluid"
            />
          </div>
          <div class="badge">
            <img
              src="https://d1ak5h2umeycbs.cloudfront.net/static/images/achievements/objection.png"
              alt=""
              class="img-fluid"
            />
          </div>
          <div class="badge">
            <img
              src="https://d1ak5h2umeycbs.cloudfront.net/static/images/achievements/no_hay_conocimiento_que_no_te_de_poder.png"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <b-button
          v-if="![1].includes(step) && !loading"
          @click="handleCancel"
          class="close-btn mr-2"
          size="sm"
        >
          Previous
        </b-button>
        <b-button
          v-if="!loading"
          :disabled="!username"
          @click="handleOk"
          variant="primary"
          class="next-btn"
          size="sm"
        >
          {{ step !== 3 ? "Siguiente" : "Terminar" }}
        </b-button>
        <b-spinner v-if="loading" />
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { uploadAvatarToS3 } from "~/services/s3";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    faCheck() {
      return faCheck;
    }
  },
  components: {},
  methods: {
    animation(prev, next) {
      if (prev < next) {
        $(`.content-container .step-content:nth-child(${prev})`).removeClass(
          "fadeInRightBig"
        );
        $(`.content-container .step-content:nth-child(${prev})`).addClass(
          "fadeOutLeftBig"
        );
        $(`.content-container .step-content:nth-child(${next})`).removeClass(
          "fadeOutRightBig"
        );
        $(`.content-container .step-content:nth-child(${next})`).addClass(
          "fadeInRightBig"
        );
        setTimeout(() => {
          $(`.content-container .step-content:nth-child(${prev})`).removeClass(
            "step-visible"
          );
          $(`.content-container .step-content:nth-child(${next})`).addClass(
            "step-visible"
          );
        }, 100);
      } else {
        $(`.content-container .step-content:nth-child(${prev})`).removeClass(
          "fadeInLeftBig"
        );
        $(`.content-container .step-content:nth-child(${prev})`).addClass(
          "fadeOutRightBig"
        );
        $(`.content-container .step-content:nth-child(${next})`).removeClass(
          "fadeOutLeftBig"
        );
        $(`.content-container .step-content:nth-child(${next})`).addClass(
          "fadeInLeftBig"
        );
        setTimeout(() => {
          $(`.content-container .step-content:nth-child(${prev})`).removeClass(
            "step-visible"
          );
          $(`.content-container .step-content:nth-child(${next})`).addClass(
            "step-visible"
          );
        }, 100);
      }
    },

    first() {
      this.loading = true;
      let payload = { username: this.username };
      this.errors = [];
      this.$axios
        .$post("/tutorial", payload)
        .then(response => {
          this.$store.commit("SET_USER", response);
          this.animation(this.step, ++this.step);
          this.steps = ["finished", "active", "disabled"];
          if (this.steps[1] !== "finished") this.steps[1] = "active";
        })
        .catch(() => {
          this.errors.push(
            "Este nombre de usuario ya existe, por favor, elige otro"
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async second() {
      this.loading = true;

      if (this.avatarChanged) {
        const cropData = this.$refs.cropper.getCroppedCanvas().toDataURL();
        const [original, cropped] = await Promise.all([
          uploadAvatarToS3(this.avatarURL, true),
          uploadAvatarToS3(cropData)
        ]);

        this.avatarURL = original.Location;
        this.avatarCroppedURL = cropped.Location;
      }

      let payload = {
        avatar: this.avatarURL,
        avatar_cropped: this.avatarCroppedURL
      };
      this.$axios
        .$post("/tutorial", payload)
        .then(response => {
          this.$store.commit("SET_USER", response);
          this.animation(this.step, ++this.step);
          this.steps = ["finished", "finished", "active"];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleCancel() {
      if (this.step > 1) {
        this.animation(this.step, --this.step);
      }
    },

    handleOk() {
      if (this.step === 1) this.first();
      else if (this.step === 2) this.second();
      else this.$refs.TutorialModal.hide();
    },

    toggleShow() {
      const fr = new FileReader();
      fr.addEventListener("load", e => {
        this.avatarURL = e.target.result;
        this.$refs.cropper.replace(this.avatarURL);
        this.avatarChanged = true;
      });
      fr.readAsDataURL(this.$refs.imageInput.files[0]);
    }
  },
  data() {
    return {
      step: 1,
      steps: ["active", "disabled", "disabled"],
      isOpen: false,
      username: "",
      avatarURL: "",
      avatarCroppedURL: "",
      loading: false,
      avatarChanged: false,
      errors: []
    };
  },

  mounted() {
    if (process.browser && this.isAuthenticated && this.loggedUser.new_user) {
      this.$refs.TutorialModal.show();
    }
    this.username = _.get(this, "loggedUser.username");
    this.avatarURL = _.get(this, "loggedUser.avatar");
    this.avatarCroppedURL = _.get(this, "loggedUser.avatar_cropped");
  }
};
</script>

<style lang="scss">
#TutorialModal {
  .modal-body {
    overflow: hidden;
    position: relative;
  }

  .content-container {
    position: relative;
    min-height: 600px;
  }

  .step-content {
    animation-duration: 0.1s;
    display: none;
    &.step-visible {
      display: block;
    }
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .close {
    display: none;
  }

  .close-btn {
    border-radius: 10px;
    padding: 8px 20px;
  }
  .next-btn {
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

  .text-welcome {
    color: $yellow;
    font-size: 16px;
    text-align: center;
    padding: 10px;
  }

  .username-input {
    outline: none;
    padding: 5px 15px;
    background: #212529;
    border: none;
    border-radius: 10px;
    width: 100%;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.025em;
    color: #fad000;
    transition: 0.4s ease-in-out;
  }

  .badge {
    width: 90px;
    height: 90px;
    margin: 10px;
  }

  .avatar-editor {
    input {
      margin-bottom: 5px;
    }
  }

  .stepper {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .stick {
      height: 1px;
      background: rgba(255, 255, 255, 0.3);
      margin: 5px;
      max-width: 100px;

      &.active {
        background: $yellow;
      }

      width: 100%;
    }

    position: relative;
    & > .step {
      cursor: pointer;
      padding: 10px 15px;

      &:hover {
        background: rgba($color: #fff, $alpha: 0.1);
      }

      &.active {
        .circle {
          background: $yellow;
          color: #000;
        }
      }

      &.finished {
        .circle {
          background: $yellow;
          color: #000;
        }
      }

      display: flex;
      align-items: center;

      .circle {
        display: inline-block;
        text-align: center;
        border-radius: 50px;
        margin-right: 5px;
        padding: 3px;
        width: 30px;
        height: 30px;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
