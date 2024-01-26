<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
          :elevation="hover && !allInformation ? 5 : 0"

          :to="allInformation ? null : '/lexeme/' + card.id"
          :color="color + ' lighten-4'"
          class="transition-swing"
      >
        <v-card-text style="min-height: 200px" class="text-body-2">
          <p v-if="card.sensitive">
            <v-icon color="error"> mdi-alert</v-icon>
            <span class="text-caption error--text"> {{ $t("card.sensitive") }}</span>
          </p>
          <span>{{ card.word }}</span>

          <v-tooltip bottom open-delay="100" v-if="!allInformation">
            <template v-slot:activator="{ on, attrs }">
              <p v-bind="attrs"
                 v-on="on" :class="color + '--text text--darken-4 text-h4 text-truncate' ">
                {{ card.dialectWord }}
              </p>
            </template>
            {{ card.dialectWord }}
          </v-tooltip>
          <p v-else
             :class="color + '--text text--darken-4 text-h4' ">
            {{ card.dialectWord }}
          </p>

          <p><span v-if="card.kind">{{ kind }}</span><span v-if="card.kind === 'N'">, {{ genus }}</span>
          </p>

          <p v-if="card.description">
            <span class="font-weight-bold">Beschreibung:</span> {{ card.description }}
          </p>
          <p v-if="!!card.examples && !!card.examples.length && allInformation">
            <span class="font-weight-bold">  Beispiel:</span>
            <span v-for="(example, index) in card.examples" :key="index">
              {{ example.example }},
            </span>
          </p>

          <p v-if="card.variety"><span class="font-weight-bold">Varietät:</span> {{ card.variety }}</p>

          <p v-if="!!card.origin & !!card.origin.name"><span class="font-weight-bold">Verwendet in</span>
            {{ card.origin.name }}</p>

          <p v-if="!!card.categories && !!card.categories.length && allInformation">
            <span class="font-weight-bold"> Kategorie:</span>
            <span v-for="(category, index) in card.categories" :key="index">
              {{ category.category }},
            </span>
          </p>

          <p
              v-if="!!card.pronunciations && !!card.pronunciations.length && allInformation"
          >
            <span class="font-weight-bold">  Aussprache:</span>
            <span
                v-for="(pronunciation, index) in card.pronunciations"
                :key="index"
            >
              {{ pronunciation.pronunciation }},
            </span>
          </p>

          <p v-if="!!card.etymologies && !!card.etymologies.length && allInformation">
            <span class="font-weight-bold">Etymologie:</span>
            <span v-for="(etymology, index) in card.etymologies" :key="index">
              {{ etymology.etymology }},
            </span>
          </p>
          <p v-if="allInformation" class="mt-5">
            <span class="font-weight-bold"> erstellt von </span><router-link :to="'/account/' + card.author"  class="text-decoration-none font-weight-bold" >{{ card.author }}</router-link>
          </p>
          <p v-if="allInformation">
            <span class="font-weight-bold">  zuletzt geändert: </span><span
              class="font-weight-bold">{{ dateCreated(card.date_updated) }}</span>
          </p>
        </v-card-text>
        <v-card-actions class="pb-0" v-if="authenticated">
          <v-btn text @click.prevent="like">
            <v-icon v-if="!card.liked"
            >mdi-thumb-up-outline
            </v-icon
            >
            <v-icon v-else color="success"
            >mdi-thumb-up
            </v-icon
            >
           <span :class="card.liked ? 'success--text' :''">{{ likeName }}</span>

          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon v-if="!card.in_favorites" @click.prevent="addToFavorites">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <v-btn icon v-else @click.prevent="removeFromFavorites">
            <v-icon color="red">mdi-heart</v-icon>
          </v-btn>
          <CollectionAddLexeme :cardId="card.id"></CollectionAddLexeme>

          <slot name="button"></slot>

          <v-menu left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  style="position: absolute; top: 6px; right: 6px"
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent=""
              >mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <report-dialog
                  :button="true"
                  kind="lexeme"
                  :item="card"
              ></report-dialog>
              <lexeme-edit-dialog v-if="card.can_edit" :lexeme="card"></lexeme-edit-dialog>
<!--              <v-list-item :to="'/lexeme_edit/' + card.id" v-if="card.can_edit">{{ $t("card.edit") }}</v-list-item>-->
              <slot name="menuItem"></slot>
              <v-divider v-if="isSuperUser"></v-divider>
              <v-list-item v-if="isSuperUser" @click="deleteLexeme">
                <span class="error--text">{{ $t("general.delete") }}</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
        <v-card-text class="mt-n2 pt-0 pb-3" style="min-height: 30px">
          <v-expand-transition>
            <div v-if="!!card.likes_amount">
            <span v-if="card.likes_amount == 1" class="text-caption">findet eine Person {{likedName}}</span>

          <span v-if="card.likes_amount >= 2" class="text-caption">finden {{ card.likes_amount }} Personen {{likedName}}</span>
          </div>
          </v-expand-transition>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>


<script>
import RequestHandler from "../utils/RequestHandler.js";
import CollectionAddLexeme from "@/components/CollectionAddLexeme";
import ReportDialog from "@/components/ReportDialog";
import {mapGetters} from "vuex";
import axios from "axios";
import moment from "moment";
import LexemeEditDialog from "@/components/LexemeEditDialog";

export default {
  components: {LexemeEditDialog, CollectionAddLexeme, ReportDialog},
  props: ["card", "allInformation"],
  name: "CardDialect",
  data: () => ({
    collectionsDialog: false,
    collections: [],
  }),
  methods: {
    openCollectionDialog() {
      this.collectionsDialog = true;
      RequestHandler.getCollections().then((response) => {
        this.collections = response.data;
      });
    },
    addToFavorites() {
      RequestHandler.addLexemeToFavorite(this.card.id).then(
          () => (this.card.in_favorites = true)
      );
    },
    removeFromFavorites() {
      RequestHandler.removeLexemeFromFavorite(this.card.id).then(
          () => (this.card.in_favorites = false)
      );
    },
    getColor() {
    },
    like() {
      if (this.card.liked) {
        this.unlike();
        return;
      }
      axios
          .post("/lexeme/like/" + this.card.id + "/")
          .then(() => {
            this.card.liked = true
            this.card.likes_amount++
          });
    },
    unlike() {
      axios
          .delete("/lexeme/like/" + this.card.id + "/")
          .then(() => {
            this.card.liked = false
            this.card.likes_amount--
          });
    },
    deleteLexeme() {
      axios.delete("lexeme/" + this.card.id + "/");
    },
    dateCreated(time) {
      moment.locale("de");
      return moment(time).fromNow();
    },
  },
  computed: {
    color() {
      const crypto = require("crypto");
      const hash = crypto
          .createHash("sha1")
          .update(this.card.dialectWord + this.card.word + this.card.description)
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
    ...mapGetters({
      isSuperUser: "auth/isSuperUser",
      authenticated: "auth/authenticated",

    }),
    kind() {
      switch (this.card.kind) {
        case "N":
          return this.$t("createWord.noun");
        case "Aj":
          return this.$t("createWord.adjective");

        case "V":
          return this.$t("createWord.verb");
        case "Av":
          return this.$t("createWord.adverb");
        case "I":
          return this.$t("createWord.interjection");
        case "P":
          return this.$t("createWord.phrase");
        default:
          return null;
      }
    },
    genus() {
      if (!this.card.kind)
        return null
      switch (this.card.genus) {

        case "F":
          return this.$t("createWord.female");
        case "M":
          return this.$t("createWord.male");

        case "N":
          return this.$t("createWord.neuter");

        default:
          return null;
      }
    },
    likeName(){
      const likeNames=[
        "gfallt ma",
        "nice",
        "cool",
        "fulminant",
        "exquisit",
        "lässig",
        "positiv",
        "leiwand",
        "bärig",
        "dufte",
        "knorke",
        "formidabel",
        "edel",
        "fett",
        "schnafte",
        "astrein",
        "toll",
        "klass",
        "klasse",
        "urig",
        "räntig"]
      return likeNames[Math.floor(Math.random() * likeNames.length)];
    },
    likedName(){
      const likeNames=[
        "nice",
        "cool",
        "fulminant",
        "exquisit",
        "lässig",
        "positiv",
        "leiwand",
        "hammermäßig",
        "bärig",
        "dufte",
        "knorke",
        "formidabel",
        "edel",
        "fett",
        "schnafte",
        "astrein",
        "tolll",
        "klass",
        "klasse",
        "urig",
        "räntig",
        "hervorragend",
        "ausgezeichnet"]
      return likeNames[Math.floor(Math.random() * likeNames.length)];
    }

  },
};
</script>

<style scoped>
p {
  margin-bottom: 3px;

  text-align: left;

}

</style>
