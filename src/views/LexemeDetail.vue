<template>
  <v-container v-if="lexeme" class="pa-15">
    <v-row>
      <v-col cols="12" sm="">
        <card-dialect
            style="max-width: 25rem"
            class="ma-auto"
            :all-information="true"

            :card="lexeme"
        >
          <template slot="button"></template>
        </card-dialect>

      </v-col>
      <v-col cols="12" sm="3" v-if="!!similarWords.length || !!similarDialectWords.length">
        <div class="mb-5" v-if="!!similarDialectWords.length">
          <p class="text-overline">andere Beschreibungen für {{ lexeme.dialectWord }}</p>
          <v-chip class="mr-2 mb-1" :to="'/lexeme/' + item.id" :color="color(item)" label outlined
                  v-for="(item, index) in similarDialectWords" :key="index">{{ item.word }} <span
              v-if="!item.word">{{ item.description }}</span></v-chip>
        </div>
        <div v-if="!!similarWords.length">
          <p class="text-overline">andere Beschreibungen für {{ lexeme.word }}</p>
          <v-chip class="mr-2" :to="'/lexeme/' + item.id" :color="color(item)" label outlined
                  v-for="(item, index) in similarWordsFiltered" :key="index">{{ item.dialectWord }}
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <p class="text--secondary mt-15">Meinungen</p>
    <p class="body-1" v-if="!posts.length">Hier hat noch niemand kommentiert. Lass uns deine Meinung zu diesem Wort hören.</p>
    <v-list>
      <v-scale-transition group>
      <v-list-item  class="grey lighten-3 rounded-lg  ma-2" v-for="(answer, index) in posts" :key="index">
        <v-list-item-content>
          <p style="white-space: pre-line" class="text-body-2">{{ answer.text }} </p>

          <v-list-item-subtitle>
            <router-link class="text-decoration-none font-weight-bold text--secondary" :to="`/account/${answer.author.username}`">


            {{
              answer.author.username
            }}
            </router-link>, {{ dateCreated(answer.date_created) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      </v-scale-transition>

        <v-textarea
            v-if="authenticated"
            label="Senf dazugeben"
            v-model="postText"
            rows="1"
            outlined
            auto-grow
            ref="postText"
            required
        >
          <template slot="append">
            <v-fab-transition>
            <v-icon @click="createPost" v-if="!!postText.length">mdi-send</v-icon>
            </v-fab-transition>
          </template>
        </v-textarea>
    </v-list>
  </v-container>
</template>

<script>
import RequestHandler from "../utils/RequestHandler.js";
import CardDialect from "@/components/CardDialect";
import axios from "axios";
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  components: {CardDialect},
  data: () => ({
    lexeme: null,
    postText: "",
    posts: [],
    similarDialectWords: [],
    similarWords: [],
  }),
  created() {
    RequestHandler.getLexeme(this.$route.params.id).then((response) => {
      this.lexeme = response.data;
    });
    RequestHandler.getPostsByLexemeId(this.$route.params.id).then(
        (response) => (this.posts = response.data)
    );
    axios
        .get("lexemes/similar/" + this.$route.params.id + "/?dialectword")
        .then((response) => (this.similarDialectWords = response.data));
    axios
        .get("lexemes/similar/" + this.$route.params.id + "/?word")
        .then((response) => (this.similarWords = response.data));
  },
  methods: {
    createPost() {
      if (this.$refs.postText.validate()) {
        RequestHandler.createPost(this.postText, null, this.lexeme.id).then(
            (response) => {
              this.postText = "";
              this.posts.push(response.data);
            }
        );
      }
    },
    addToFavorites() {
      RequestHandler.addLexemeToFavorite(this.lexeme.id).then(
          () => (this.lexeme.in_favorites = true)
      );
    },
    dateCreated(time) {
      moment.locale("de");
      return moment(time).fromNow();
    },
    removeFromFavorites() {
      RequestHandler.removeLexemeFromFavorite(this.lexeme.id).then(
          () => (this.lexeme.in_favorites = false)
      );
    },
    color(lexeme) {
      const crypto = require("crypto");
      const hash = crypto
          .createHash("sha1")
          .update(lexeme.dialectWord + lexeme.word + lexeme.description)
          .digest("hex");

      const colors = [
        "card1",
        "card2",
        "card3",
        "card4",
        "card5",
        "card6",
        "card7",
      ];
      return colors[Math.floor(parseInt(hash, 16) % colors.length)];
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
    similarDialectWordsFiltered() {
      return [...new Map(this.similarDialectWords.map(item =>
          [item["word"], item])).values()];
    },

    similarWordsFiltered() {
      return [...new Map(this.similarWords.map(item =>
          [item["dialectWord"], item])).values()];
    }
  },
};
</script>

<style>

</style>
