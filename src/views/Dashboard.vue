<template>
  <v-container  fluid>
    <div class="hidden-md-and-up">
      <p class="text-h4">{{ $t("dashboard.title") }}</p>

      <p class="text-h5">{{ $t("dashboard.myWords") }}</p>

      <div class="scrollmenu">
        <div class="card">
          <v-hover v-slot="{ hover }" >
            <v-card
              :to="'card-create'"
              class="mt-1 mr-5 mb-1"
              :elevation="hover ? 4 : 0"
              outlined
              min-height="15rem"
              min-width="10rem"
            >
              <v-card-actions class="justify-center">
                <v-icon
                  style="margin-top:80px"
                  size="48
"
                  >mdi-plus
                </v-icon>
              </v-card-actions>
            </v-card>
          </v-hover>
        </div>
        <div v-for="(item, index) in myWords" :key="index" class="card">
          <card-dialect :small="true" :card="item"></card-dialect>
        </div>
        <div class="card">
          <v-card
              v-if="!!myWordsNext"
              @click="loadNextMyWords"
              class="mt-4 mr-5"
              elevation="0"
            >
              <v-card-title>mehr laden</v-card-title>
            </v-card>
        </div>
      </div>

      <p class="text-h5">{{ $t("dashboard.myCollections") }}</p>
      <div class="scrollmenu">
        <div class="card" style="min-width: 180px">
          <collection-create-button @created="collectionCreated"></collection-create-button>
        </div>
        <div v-for="(item, index) in myCollections" :key="index" class="card">
          <card-collection
            style="padding-left: 10px"
            :collection="item"
          ></card-collection>
        </div>
        <div class="card">
          <v-card
              v-if="!!myCollectionsNext"
              @click="loadNextMyCollections"
              class="mt-4 mr-5"
              elevation="0"
            >
              <v-card-title>mehr laden</v-card-title>
            </v-card>
        </div>
      </div>

      <p class="text-h5">{{ $t("dashboard.discover") }}</p>
      <div class="scrollmenu">
        <div v-for="(item, index) in randomLexemes" :key="index" class="card">
          <card-dialect :small="true" :card="item"></card-dialect>
        </div>
        <div class="card">
          <v-card
              @click="loadNextRandomLexemes"
              class="mt-4 mr-5"
              elevation="0"
            >
              <v-card-title>mehr laden</v-card-title>
            </v-card>
        </div>
      </div>

      <p class="text-h5">{{ $t("dashboard.posts") }}</p>
      <div class="scrollmenu">
        <div class="card">
        <v-textarea
            outlined
            class="post-textarea"
            placeholder="Stell der Community eine Frage!"
            v-model="newPost"
            auto-grow
            rows="4"
            append-icon="mdi-send"
            @click:append="createPost"
          ></v-textarea>
          </div>
        <div v-for="(item, index) in posts" :key="index" class="card">
          <card-post :small="true" :post="item"></card-post>
        </div>
        <div class="card">
          <v-card
              v-if="!!postsNext"
              @click="loadNextPosts"
              class="mt-4 mr-5"
              elevation="0"
            >
              <v-card-title>mehr laden</v-card-title>
            </v-card>
        </div>
      </div>
    </div>
    <div
      class="hidden-sm-and-down"
      :style="
        $vuetify.breakpoint.lgAndUp
          ? ' height:85vh;'
          : ' height:85vh;' + ' margin-top:3rem;'
      "
    >
      <p class="text-h4">{{ $t("dashboard.title") }}</p>

      <v-row no-gutters style="height: 100%">
        <v-col cols="3" style="height: 44rem">
          <p class="text-h5">{{ $t("dashboard.myWords") }}</p>

          <v-hover v-slot="{ hover }">
            <v-card
              :to="'card-create'"
              class="mt-1 mr-5 mb-1"
              :elevation="hover ? 4 : 0"
              outlined
            >
              <v-card-actions class="justify-center">
                <v-icon
                  size="48
"
                  >mdi-plus
                </v-icon>
              </v-card-actions>
            </v-card>
          </v-hover>
          <perfect-scrollbar>
            <div v-for="card in myWords" :key="card.id">
              <card-dialect :card="card" class="mt-2 mr-5"></card-dialect>
            </div>
            <v-card @click="loadNextMyWords" class="mt-4 mr-5" elevation="0">
              <v-card-title v-if="!!myWordsNext">mehr laden</v-card-title>
            </v-card>
          </perfect-scrollbar>
        </v-col>
        <v-col cols="3" style="height: 44rem">
          <p class="text-h5">{{ $t("dashboard.myCollections") }}</p>

          <collection-create-button
            @created="collectionCreated"
            class="mt-1 mr-5 mb-1"
          ></collection-create-button>
          <perfect-scrollbar>
            <v-scale-transition group >
            <div v-for="collection in myCollections" :key="collection.id">
              <card-collection
                :collection="collection"
                class="mb-2 mr-5"
              ></card-collection>
            </div>
            </v-scale-transition>

            <v-card
              v-if="!!myCollectionsNext"
              @click="loadNextMyCollections"
              class="mt-4 mr-5"
              elevation="0"
            >
              <v-card-title>mehr laden</v-card-title>
            </v-card>
          </perfect-scrollbar>
        </v-col>
        <v-col cols="3" style="height: 48.5rem">
          <p class="text-h5">{{ $t("dashboard.discover") }}</p>

          <perfect-scrollbar>
            <div v-for="card in randomLexemes" :key="card.id">
              <card-dialect :card="card" class="mb-2 mr-5"></card-dialect>
            </div>

            <v-card
              @click="loadNextRandomLexemes"
              class="mt-4 mr-5"
              elevation="0"
            >
              <v-card-title>mehr laden</v-card-title>
            </v-card>
          </perfect-scrollbar>
        </v-col>
        <v-col cols="3" style="height: 40rem">
          <p class="text-h5">{{ $t("dashboard.posts") }}</p>

          <v-textarea
            outlined
            class="post-textarea"
            placeholder="Stell der Community eine Frage!"
            v-model="newPost"
            auto-grow
            rows="4"
            append-icon="mdi-send"
            @click:append="createPost"
          ></v-textarea>

          <perfect-scrollbar>
            <v-scale-transition group >
            <div v-for="post in posts" :key="post.id" class="mb-2">
              <card-post :post="post" class="mt-1 mr-5"></card-post>
            </div>
            </v-scale-transition>
            <v-card @click="loadNextPosts" class="mt-4 mr-5" elevation="0">
              <v-card-title v-if="!!postsNext">mehr laden</v-card-title>
            </v-card>
          </perfect-scrollbar>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import CardDialect from "@/components/CardDialect";
import CardCollection from "@/components/CardCollection";
import CollectionCreateButton from "@/components/CollectionCreateButton";
import CardPost from "@/components/CardPost";

export default {
  name: "Dashboard",
  components: { CardPost, CollectionCreateButton, CardCollection, CardDialect },
  data: () => ({
    myWords: [],
    myCollections: [],
    randomLexemes: [],
    posts: [],
    myWordsNext: null,
    myCollectionsNext: null,
    postsNext: null,

    newPost: "",
  }),
  mounted() {
    axios.get("/lexemes/?mine&ordering=-date_created").then((response) => {
      (this.myWords = response.data.results),
        (this.myWordsNext = response.data.links.next);
    });

    axios.get("/collections/?public=False").then((response) => {
      (this.myCollections = response.data.results),
        (this.myCollectionsNext = response.data.links.next);
    });

    axios.get("/lexemes/random/").then((response) => {
      this.randomLexemes = response.data;
    });

    axios.get("/posts/?ordering=-date_created").then((response) => {
      (this.posts = response.data.results),
        (this.postsNext = response.data.links.next);
    });
  },
  methods: {
    collectionCreated(value) {
      this.myCollections.unshift(value);
    },
    loadNextMyWords() {
      axios.get(this.myWordsNext).then((response) => {
        (this.myWords = this.myWords.concat(response.data.results)),
          (this.myWordsNext = response.data.links.next);
      });
    },
    loadNextMyCollections() {
      axios.get(this.myCollectionsNext).then((response) => {
        (this.myCollections = this.myCollections.concat(response.data.results)),
          (this.myCollectionsNext = response.data.links.next);
      });
    },
    loadNextRandomLexemes() {
      axios.get("/lexemes/random/").then((response) => {
        this.randomLexemes = this.randomLexemes.concat(response.data);
      });
    },
    loadNextPosts() {
      axios.get(this.postsNext).then((response) => {
        (this.posts = this.posts.concat(response.data.results)),
          (this.postsNext = response.data.links.next);
      });
    },
    createPost() {
      axios.post("post/", { text: this.newPost }).then((response) => {
        response.data.is_author = true;

        this.posts.unshift(response.data);
        this.newPost = "";
      });
    },
  },
};
</script>

<style scoped>
.scrollmenu {
  overflow: auto;
  white-space: nowrap;
}

.card {
  display: inline-block;
  color: white;
  padding: 14px;
  text-decoration: none;
  max-width: 300px;
  vertical-align: middle;
}
.ps {
  height: 100%;
}
</style>