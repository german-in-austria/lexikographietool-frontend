<template>
  <v-container fluid v-if="post">
    <card-post :post="post" :recursive="true"></card-post>

  </v-container>

</template>

<script>
import RequestHandler from "../utils/RequestHandler.js";
import CardPost from "../components/CardPost"

export default {
  components: { CardPost},
  data: () => ({
    post: '',
  }),
  mounted() {
    RequestHandler.getPost(this.$route.params.id).then((response) => {
      this.post = response.data;
    });
  },
};
</script>