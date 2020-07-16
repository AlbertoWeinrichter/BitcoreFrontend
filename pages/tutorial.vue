<template>
  <div id="tutorial-page">
    <section class="main-section">
      <div class="left-clip" />
      <div class="darkide" />
      <div class="right-clip" />
      <div class="triangles" />
      <img
        src="~assets/img/tutorial/Logo.png"
        width="215"
        height="270"
        class="head-logo"
      />
      <h1>
        ¡Bienvenido a la Resistencia del Gaming!
      </h1>
      <nuxt-link to="/">
        <transition name="bounce" enter-active-class="bounceInRight">
          <button class="accent-btn">
            launch bitcore
          </button>
        </transition>
      </nuxt-link>
    </section>
    <section class="news-section">
      <div class="dude" />
      <b-container fluid class="news-container">
        <b-row>
          <b-col class="triangles-container" xl="7">
            <div data-aos="fade-right">
              <img
                src="~assets/img/tutorial/triangles-images.png"
                alt="TrianglesImages"
              />
            </div>
          </b-col>
          <b-col xl="5">
            <h2>100% VIDEOJUEGOS</h2>
            <div class="text">
              Sube puntos en la skill de conocimiento con las últimas
              bendiciones y fechorías de la industria, narradas por los más
              reverenciados intelectuales que han parido las cloacas del erial.
            </div>
            <nuxt-link to="/">
              <button class="accent-btn">
                launch bitcore
              </button>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
      <img src="~assets/img/tutorial/frames.png" alt="Frames" class="frames" />
    </section>
    <section class="community-section">
      <b-container fluid>
        <b-row>
          <b-col lg="3">
            <div data-aos="fade-right">
              <img src="~assets/img/tutorial/wen.png" class="wen" alt="hero" />
            </div>
          </b-col>
          <b-col lg="5">
            <h2>
              UNA COMUNIDAD DE INADAPTADOS
            </h2>
            <div class="text mb-5">
              Como jugadores, sabemos que es muy importante tener buena
              compañía... y mejor equipo.
            </div>
            <div class="text">
              Te armamos con condecoraciones y logros para que comentes no sólo
              con ingenio, sino también con estilo.
            </div>
          </b-col>
          <b-col lg="4">
            <transition
              name="custom-classes-transition"
              enter-active-class="bounceLeft-enter"
              leave-active-class="bounceRight-leave"
            >
              <div data-aos="fade-left" data-aos-delay="300">
                <img
                  src="~assets/img/tutorial/miranda-cass.png"
                  alt="MirandaCass"
                  class="miranda-cass"
                />
              </div>
            </transition>
          </b-col>
        </b-row>
      </b-container>
      <img
        data-aos="zoom-out-up"
        src="~assets/img/tutorial/community-frames.png"
        class="frames"
        alt="CommunityFrames"
      />
    </section>
    <section class="avatars-section">
      <b-container fluid>
        <b-row>
          <b-col lg="5"> </b-col>
          <b-col lg="6">
            <h2>100% INDEPENDIENTES</h2>
            <div class="text mb-5">
              Una turbina inquebrantable e incorruptible: no aceptamos
              microtransacciones de la industria.
            </div>
            <div class="text">
              Si un indie sale bien horneado, aplaudimos; si un triple A viene
              del vertedero, allí es a donde volverá.
            </div>
          </b-col>
        </b-row>
        <nuxt-link to="/login">
          <button class="accent-btn">Únete a la resistencia</button>
        </nuxt-link>
        <!-- <a href="https://www.patreon.com/bitcoregaming"> </a> -->
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  layout: "landing",
  created() {
    if (process.browser) {
      window.AOS.init();
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "EthnocentricRg";
  src: url("~assets/fonts/ethnocentricRg.ttf") format("truetype");
}
#tutorial-page {
  * {
    font-family: "EthnocentricRg";
  }
  .container-fluid {
    overflow: hidden;
    height: 100%;
  }
  .accent-btn {
    font-size: 18px;
    position: relative;
    background: #000;
    // padding: 18px 76px;
    padding-top: 18px;
    padding-bottom: 18px;
    width: 384px;
    color: #f8d000;
    cursor: pointer;
    z-index: 2;
    margin-top: 65px;
    border: 4px solid #b1b1b1;
  }
  section {
    // overflow: hidden;
  }
  .main-section {
    h1 {
      color: #fff;
      font-size: 33px;
      position: relative;
      margin-top: 183px;
      letter-spacing: 3px;
    }
    background-image: url("~assets/img/tutorial/town.png");
    background-repeat: no-repeat;
    height: 100vh;
    background-size: cover;
    .left-clip {
      background-color: #f8d000;
      opacity: 0.27;
      height: 100%;
      clip-path: polygon(0 0, 32% 0, 62% 100%, 0% 100%);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .right-clip {
      background-image: url("~assets/img/tutorial/team.png");
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.58;
      height: 100%;
      clip-path: polygon(32% 0, 100% 0, 100% 100%, 62% 100%);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .darkide {
      height: 100%;
      width: 100%;

      position: absolute;
      top: 0;
      left: 0;
      background-image: url("~assets/img/tutorial/darkide.png");
      background-repeat: no-repeat;
    }
    .triangles {
      opacity: 0.15;
      background-image: url("~assets/img/tutorial/triangles.png");
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    text-align: center;
    .head-logo {
      margin-top: 22vh;
      position: relative;
      z-index: 2;
    }
  }
  .news-section {
    height: 815px;
    background-image: url("~assets/img/tutorial/news-triangles.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .text {
      width: 500px;
    }
    .dude {
      background-image: url("~assets/img/tutorial/dude.png");
      background-repeat: no-repeat;
      overflow: unset;
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
      clip-path: polygon(0 0, 62% 0, 89% 100%, 0% 100%);
      background-size: cover;
      height: 100%;
      width: 100%;
    }
    .triangles-container {
      position: relative;
      img {
        width: 916px;
        height: 656px;
        position: absolute;
        top: -29px;
        left: 55px;
      }
    }

    .news-container {
      padding-top: 115px;
      padding-bottom: 115px;
    }
    .frames {
      position: absolute;
      bottom: -225px;
      left: 20px;
      z-index: 2;
    }
  }
  .community-section {
    height: 1030px;
    position: relative;
    background: url("~assets/img/tutorial/community-bg.png") no-repeat;
    background-size: cover;
    .wen {
      position: absolute;
      top: 0;
      left: -15px;
    }
    .miranda-cass {
      position: absolute;
      height: 1000px;
      top: -187px;
      left: -107px;
    }
    .text {
      max-width: 648px;
    }
    .frames {
      position: absolute;
      bottom: -188px;
      left: 29%;
      z-index: 2;
    }
    .container-fluid {
      padding-top: 183px;
      overflow: hidden;
    }
  }
  h2 {
    font-size: 44px;
    color: #fff;
    padding: 0px;
    margin-bottom: 60px;
  }
  .text {
    font-size: 26px;
    color: #fff;
  }
  .avatars-section {
    height: 925px;
    background: url("~assets/img/tutorial/avatars-bg.png") no-repeat;
    background-size: cover;
    overflow: hidden;
    .accent-btn {
      position: relative;
      display: block;
      margin: 140px auto 0px;
    }
    .container-fluid {
      padding-top: 200px;
    }
    .text {
      max-width: 646px;
    }
  }
}
</style>
