<template>
    <v-container fluid style="height:85vh">
      <v-row no-gutters>
        <v-col>
          <p class="text-h5">meine Wörter</p>
        </v-col>
        <v-col>
          <p class="text-h5">meine Sammlungen</p>
        </v-col>
        <v-col>
          <p class="text-h5">allgemeines Wörterbuch</p>
        </v-col>
        <v-col>
          <p class="text-h5">aktuelle Aufrufe</p>
        </v-col>
      </v-row>
      <v-row no-gutters style="height: 100%">
        <v-col style="height: 85%">
          <v-hover v-slot="{ hover }">
            <v-card
                :to="'card-create'"
                class="mt-1 mr-5 mb-1"
                :elevation="hover ? 4 : 0"
                outlined
            >
              <v-card-actions class="justify-center"
              >
                <v-icon
                    size="48
"
                >mdi-plus
                </v-icon
                >
              </v-card-actions
              >
            </v-card>
          </v-hover>
          <perfect-scrollbar>
            <div v-for="card in ownCards" :key="card.id">
              <card-dialect :card="card" class="mt-1 mr-5"></card-dialect>
            </div>
          </perfect-scrollbar>
        </v-col>
        <v-col style="height: 85%">

          <collection-create-button
              class="mt-1 mr-5 mb-1"
              @created="collectionCreated"
          ></collection-create-button>
          <perfect-scrollbar>
            <div v-for="collection in collections" :key="collection.id">
              <card-collection
                  :collection="collection"
                  class="mt-1 mr-5"
              ></card-collection>
            </div>
          </perfect-scrollbar>
        </v-col>
        <v-col style="height: 93%">
          <perfect-scrollbar>
            <div v-for="card in cards" :key="card.id">
              <card-dialect :card="card" class="mt-1 mr-5"></card-dialect>
            </div>
          </perfect-scrollbar>
        </v-col>
        <v-col style="height: 100%">
          <home-post-column style="height: 64vh"></home-post-column>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";
import CardDialect from "../components/CardDialect.vue";
import CardCollection from "../components/CardCollection.vue";
import CollectionCreateButton from "../components/CollectionCreateButton.vue";
import HomePostColumn from "@/components/HomePostColumn";

export default {
  components: {
    HomePostColumn,
    CardDialect,
    CardCollection,
    CollectionCreateButton,
  },

  data: () => ({
    cards: [],
    ownCards: [],
    collections: [],
    posts: [],
    postText: "",
  }),

  async created() {
    RequestHandler.getLexemesRandom().then((response) => (this.cards = response.data));
    RequestHandler.getCollections().then(
        (response) => (this.collections = response.data)
    );
    RequestHandler.getCardsCreated().then(
        (response) => (this.ownCards = response.data)
    );
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

    collectionCreated(value) {
      this.collections.push(value);
    },
  },
};
</script>

<style scoped>
.ps {
  height: 100%;
}
</style>