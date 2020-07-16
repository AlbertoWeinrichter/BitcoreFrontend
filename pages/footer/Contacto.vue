<template>
  <div class="container-special pt-5 pb-5">
    <h1 class="text-center head">Contacto</h1>
    <div class="row">
      <div class="col-xs-12 main-container">
        <p class="title no-top-margin">Contacta con nosotros (si te atreves)</p>
        <p>
          No hay pregunta demasiado atrevida ni proposición demasiado
          arriesgada, así que siéntete libre de darle uso a los campos que
          encuentras a continuación. Recuerda asegurarte de marcar correctamente
          el campo “Tipo de consulta” para que llegue a las manos adecuadas.
        </p>
        <p>
          Para conectar tu cuenta de Patreon y recibir todos los beneficios de
          tu suscripción, añade un enlace a tu perfil de Patreon y tu nombre de
          usuario, y nosotros nos ocuparemos de todo
        </p>
        <div class="contact-form">
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="contact-input-group-text"
                    ><fa :icon="faUser"></fa
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Nombre"
                  name="username"
                  type="text"
                  v-model="username"
                />
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="contact-input-group-text"
                    ><fa :icon="faEnvelope"></fa
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  type="email"
                  v-model="email"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="contact-input-group-text"
                    ><fa :icon="faInbox"></fa
                  ></span>
                </div>
                <select
                  class="form-control"
                  name="type"
                  v-model="submission_type"
                >
                  <option value="null">Tipo de Consulta</option>
                  <option value="otros">Otros</option>
                  <option value="tecnico">Consulta técnica</option>
                  <option value="particular"
                    >Quiero colaborar como particular</option
                  >
                  <option value="empresa">Quiero colaborar como empresa</option>
                  <option value="inapropiado"
                    >Reportar contenido inapropiado</option
                  >
                  <option value="patreon_link"
                    >Vincular una cuenta de patreon</option
                  >
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="contact-input-group-text"
                    ><fa :icon="faHammer"></fa
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Asunto"
                  name="subject"
                  type="text"
                  v-model="subject"
                />
              </div>
              <div class="input-group">
                <textarea
                  class="form-control"
                  v-model="text_content"
                  placeholder="Contenido de la consulta"
                  name="textContent"
                  rows="4"
                  cols="50"
                >
                </textarea>
              </div>
            </div>
          </div>
          <button
            @click="sendContactForm"
            class="static-page-button pull-right"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faInbox,
  faUser,
  faGavel,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "contacto",
  layout: "footer",
  data() {
    return {
      subject: null,
      submission_type: null,
      text_content: null,
      username: null,
      email: null
    };
  },
  computed: {
    faInbox() {
      return faInbox;
    },
    faUser() {
      return faUser;
    },
    faEnvelope() {
      return faEnvelope;
    },
    faHammer() {
      return faGavel;
    }
  },
  methods: {
    sendContactForm() {
      let data = {};
      data.content = this.text_content;
      data.subject = this.subject;
      data.username = this.username;
      data.email = this.email;
      data.submission_type = this.submission_type;

      this.$axios
        .$post("/contact_form", { formData: data })
        .then(() => {
          this.$toast.success("Successfully authenticated");
        })
        .catch(() => {
          this.$toast.success("Error");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  font-family: "Merriweather", serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 28px;
  color: $black;
  letter-spacing: 0.02em;
  background: gray("200");
  border-radius: 2px;
  padding: 60px;
  @media (max-width: 767px) {
    padding: 20px;
    font-size: 14px;
    margin: 0;
    border-radius: 0;
  }
  p {
    margin-bottom: 15px;
  }

  .contact-input-group-text {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #1c1c21;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
  }

  .title {
    color: $black;
    font-size: 24px;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0.05em;
    font-weight: 700;
    margin-top: 25px;
    &.no-top-margin {
      margin-top: 0px;
    }
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
  .static-page-button {
    outline: none;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    a {
      color: $black;
      text-decoration: none;
    }
    background: color("yellow");
    border: none;
    border-radius: 10px;
    padding: 5px 20px;
    @include transition-hover-intent();
    &:hover,
    &:active,
    &:focus {
      background: darken(color("yellow"), 10);
    }
  }
  a {
    color: color("blue");
  }
  .contact-form {
    font-family: "Montserrat", sans-serif;
    .input-group {
      margin-top: 0;
      margin-bottom: 15px;
      border-radius: 10px;
      .input-group-prepend {
        line-height: 40px;
        padding: 0 15px;
        background: color("yellow");
        width: 45px;
        border-radius: 10px 0 0 10px;
      }
      input,
      textarea,
      select {
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        border-radius: 0 10px 10px 0;
        border: none;
        background: gray("400");
        color: $black;
        @include transition-hover-intent();
        &:hover,
        &:focus {
          outline: none;
          border: none;
          box-shadow: none;
          background-color: gray("300");
        }
      }
      textarea {
        border-radius: 10px;
      }
    }
    .upl-area {
      border: 2px dashed gray("700");
      border-radius: 10px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      margin: 0 0 15px 0;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
