<template>
  <v-list >
    <v-list-item>
      <v-textarea
          label="neuer Aufruf"
          v-model="postText"
          outlined
          rows="3"
          row-height="25"
          no-resize
          append-icon="mdi-send"
          @click:append="createPost"
          class="mt-1 mr-5"
          ref="postText"
          required
          :rules="[(v) => !!v || 'Bitte gib einen Text ein']"
      ></v-textarea>
    </v-list-item>
    <perfect-scrollbar >
      <v-list-item v-for="post in posts" :key="post.id">
        <card-post :post="post" class="mt-1 mr-5"></card-post>
      </v-list-item>
    </perfect-scrollbar>
  </v-list>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";
import CardPost from "@/components/CardPost";

export default {
  name: "HomePostColumn",
  components: {CardPost},
  data: () => ({
    posts: [],
    postText: "",
  }),
  async created() {
    RequestHandler.getPosts().then((response) => (this.posts = response.data));
  },
  methods: {
    createPost() {
      if (this.$refs.postText.validate()) {
        RequestHandler.createPost(this.postText, null).then((response) => {
          this.postText = "";
          this.posts.push(response.data);
        });
      }
    },
  }
}
</script>

<style scoped>
.ps {
  height: 100%;
}
</style>