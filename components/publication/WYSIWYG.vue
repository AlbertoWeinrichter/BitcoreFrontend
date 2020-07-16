<template>
  <div class="comment-section">
    <div
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      v-quill:QuillEditor="editorOption"
    ></div>

    <div class="comment-footer">
      <b-button class="yellow-btn"  @click="sendComment()">
        Publicar
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WYSIWYG",
  props: ["slug", "parentId"],
  data() {
    return {
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block", "image"]
          ]
        }
      }
    };
  },
  methods: {
    sendComment() {
      let dataToSend = {
        publication: this.slug,
        parent: this.parentId,
        body: this.content
      };
      this.$axios.$post("/comentarios", dataToSend).then(response => {
        if (response.status === "Success") {
          this.$notify({
            group: "bitcore-notification",
            type: "success",
            title: "¡Éxito!",
            text: "¡Comentario enviado correctamente!"
          });
          this.refreshComments();
          this.content = "";
        } else {
          this.$notify({
            group: "bitcore-notification",
            type: "error",
            title: "¡No se ha podido enviar el comentario!",
            text: "Un flechazo en la rodilla del mensajero..."
          });
        }
      });
    },
    refreshComments() {
      this.$emit("clicked");
    },
    onEditorChange({ quill, html }) {//eslint-disable-line
      this.content = html;
    }
  }
};
</script>

<style scoped lang="scss">
.yellow-btn {
  margin: 10px;
  border-radius: 10px;
  color: black;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  padding: 8px 10px;
  letter-spacing: 0.1em;
  background: #ffc107;
  &:hover {
    background: darken(color("yellow"), 5);
  }
}
</style>
