<template>
  <b-modal
    class="modal-user-profile"
    ref="EditProfileModal"
    title="Editar Perfil"
    id="EditProfileModal"
    ok-title="Guardar"
    ok-only
    :ok-disabled="saveDisabled"
    @ok="saveChanges"
  >
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
          @click="currentTab = 4"
        >
          Avatar
        </button>
      </div>

      <div class="ach-image-list" v-if="currentTab === 1">
        <div
          class="ach-image-div"
          v-for="achievement in achievements"
          :key="achievement.slug"
          :class="{
            'active-ach': selectedAchievements.includes(achievement.slug),
            'new-ach': achievement.new
          }"
          @click="selectAchievement(achievement.slug)"
        >
          <img :src="mediaUrl('achievements/' + achievement.slug + '.png')" />
        </div>
      </div>

      <div class="ach-image-list" v-if="currentTab === 2">
        <div
          class="ach-frame-div"
          v-for="border in borders"
          :key="border.slug"
          :class="{
            'active-ach': border.slug === selectedBorderSlug,
            'new-ach': border.new
          }"
          @click="selectBorder(border.slug)"
        >
          <img :src="mediaUrl('frames/' + border.slug + '.png')" />
        </div>
      </div>

      <div class="ach-image-list" v-if="currentTab === 3">
        <div
          class="title-div"
          v-for="title in titles"
          :key="title.slug"
          :class="{
            'active-ach': title.name === selectedTitleName,
            'new-ach': title.new
          }"
          @click="selectTitle(title.name)"
        >
          <span>{{ title.name }}</span>
        </div>
      </div>

      <div class="avatar-editor" v-if="currentTab === 4">
        <div class="container" style="height: 350px">
          <vue-cropper
            ref="cropper"
            :img="avatarImageData"
            :info="true"
            :size="1"
            :canScale="false"
            :autoCrop="true"
            :autoCropWidth="300"
            :autoCropHeight="300"
            :fixed="true"
            :fixedNumber="[1, 1]"
          >
          </vue-cropper>
        </div>
        <div class="cropper-footer">
          <div class="checkbox-group">
            <input
              type="checkbox"
              id="saveSlection"
              name="saveSlection"
              v-model="avatarChanged"
            />
            <label for="saveSlection">
              Guardar selección
            </label>
            <input
              id="image-file"
              type="file"
              style="display: none"
              accept="image/*"
              @change="newPictureSelected"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary upload-picture"
          @click="uploadPicture"
        >
          <i class="fa fa-upload" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import _ from "lodash";
import { uploadAvatarToS3 } from "~/services/s3";
// import VueCropper from 'vue-cropper';
import { mapGetters } from "vuex";
import mime from "mime-types";

export default {
  data() {
    return {
      currentTab: 1,
      selectedBorderSlug: "",
      selectedTitleName: "",
      selectedAchievements: [],
      avatarImageData: "",
      avatarChanged: false
    };
  },
  computed: {
    selectedTitlesDiference() {
      return (
        [...this.selectedAchievements].sort().join() !==
        [...this.active_achievements].sort().join()
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
  methods: {
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    selectAchievement(achievementSlug) {
      if (this.selectedAchievements.includes(achievementSlug)) {
        // remove
        if (this.selectedAchievements.length > 1) {
          this.selectedAchievements = _.without(
            this.selectedAchievements,
            achievementSlug
          );
        }
      } else {
        // add
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
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = event => {
          this.avatarImageData = event.target.result;
          this.avatarChanged = false;
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", this.avatar);
      xhr.responseType = "blob";
      xhr.send();
    },
    onShowProfileSelectModal() {
      this.selectedAchievements = _.clone(this.active_achievements);
      this.selectedBorderSlug = this.active_border;
      this.selectedTitleName = this.active_title;
      this.fetchAvatarImageData();
    },
    uploadPicture() {
      $("#image-file").click();
    },
    newPictureSelected(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = event => {
        this.avatarImageData = event.target.result;
        this.avatarChanged = true;
      };
      reader.readAsDataURL(file);
    },
    uploadAvatars() {
      return new Promise((resolve, reject) => {
        if (!this.avatarChanged) {
          resolve({});
          return;
        }
        this.$refs["cropper"].getCropBlob(croppedBlob => {
          let avatarName = "";
          let croppedAvatarName = "";
          fetch(this.avatarImageData)
            .then(res => res.blob())
            .then(avatarBlob => {
              const dateNow = Date.now();
              avatarName = dateNow + "." + mime.extension(avatarBlob.type);
              croppedAvatarName =
                dateNow + "_crop." + mime.extension(croppedBlob.type);
              return Promise.all([
                uploadAvatarToS3(avatarBlob, avatarName),
                uploadAvatarToS3(croppedBlob, croppedAvatarName)
              ]);
            })
            .then(() => {
              resolve({
                avatar: avatarName,
                avatar_cropped: croppedAvatarName
              });
            })
            .catch(error => reject(error));
        });
      });
    },
    saveChanges(bvEvt) {
      bvEvt.preventDefault();
      const data = {};
      if (this.selectedBorderSlug !== this.active_border) {
        data["active_border"] = this.selectedBorderSlug;
      }
      if (this.selectedTitleName !== this.active_title) {
        // const selectedTitleSlug = (_.find(this.allTitles, {name: this.selectedTitleName}) || {}).id;
        // console.log(selectedTitleSlug)
        data["active_title"] = this.selectedTitleName;
      }
      if (this.selectedTitlesDiference) {
        data["active_achievements"] = this.selectedAchievements;
      }
      // this.$Progress.start();
      return this.uploadAvatars()
        .then(avatarNames => {
          Object.assign(data, avatarNames);
          return this.updateProfile(data);
        })
        .then(() => {
          this.$notify({
            group: "main",
            type: "success",
            title: "Welcome",
            text: "Perfil actualizado correctamente"
          });
          this.$refs.profileModal.hide();
        })
        .catch(error => {
          console.error(error);
          this.$notify({
            group: "main",
            type: "error",
            title: "Login Error",
            text: "Something went wrong"
          });
        });
      // .finally(() => this.$Progress.finish());
    }
  }
};
</script>

<style lang="scss">}
.modal-user-profile {
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
          appearance: none;
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
    }
    .avatar-editor {
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      /*justify-content: center;*/
      align-items: flex-end;
      position: relative;
    }
    .upload-picture {
      position: absolute;
      padding: 5px 10px;
      right: 15px;
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
    .modal-footer {
      .btn-primary {
        background: color("yellow");
        display: inline-block;
        border: none;
        outline: none;
        appearance: none;
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
        appearance: none;
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
</style>
