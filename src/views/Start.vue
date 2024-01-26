<template>
  <v-container fluid>
        <v-row>
          <p class="text-h3">{{ $t("start.title") }}</p>

           <p
          v-html="$t('start.introductionText')"
        ></p>
        </v-row>

    <v-row no-gutters style="min-height: 400px">
          <v-col cols="12" class="ma-auto"  sm="12" md="6"  v-if="!!popular.length">

            <p class="text-h4">{{$t("start.popular")}}</p>
            <v-hover v-slot:default="{ hover }">
            <v-carousel light v-model="carousel"
                        :cycle="hover ? false : true"
                        height="auto"
                        hide-delimiter-background
                        show-arrows-on-hover>
              <v-carousel-item
                  v-for="(lexeme) in popular"
                  :key="lexeme.id"

              >
                <v-sheet  :class="$vuetify.breakpoint.xs ? 'pt-0 pb-15' : 'pa-15 pt-0'">
                  <card-dialect :card="lexeme"></card-dialect>
                </v-sheet>
              </v-carousel-item>

            </v-carousel>
            </v-hover>
          </v-col>
          <v-col cols="12" class="ma-auto" md="6" v-if="!!discussed.length">
            <p class="text-h4">{{$t("start.discussed")}}</p>
            <v-hover v-slot:default="{ hover }">

            <v-carousel light v-model="carousel2"
                                                :cycle="hover ? false : true"

                        height="auto"
                        hide-delimiter-background
                        show-arrows-on-hover
                        :interval="7000">
              <v-carousel-item
                  v-for="(lexeme) in discussed"
                  :key="lexeme.id"

              >
                <v-sheet :class="$vuetify.breakpoint.xs ? 'pb-15 pt-0' : 'pa-15 pt-0'">
                  <card-dialect :card="lexeme"></card-dialect>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
            </v-hover>
          </v-col>
        </v-row>
        <v-row v-if="authenticated">
          <p class="text-h4">{{$t("start.title2")}}</p>
          <p class="">{{$t("start.chapter2text")}}</p>
        </v-row>
        <v-row v-if="authenticated" no-gutters class="pa-5">

          <v-col cols="12"  align="center">
            <card-dialect-prototype></card-dialect-prototype>
          </v-col>

        </v-row>


        <v-row v-if="authenticated" no no-gutters class="mt-10">
          <v-col cols="12">
            <p class="text-h4">{{$t("start.title3")}}</p>

            <i18n path="start.chapter3text" tag="p">
              <template v-slot:postings>
                <router-link to="postings">{{ $t('start.postings') }}</router-link>
              </template>
            </i18n>
          </v-col>
          <v-col class="ma-auto" cols="12">
            <v-textarea
                label="neue Frage"
                placeholder="Stelle deine Frage hier!"
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
          </v-col>
        </v-row>
  </v-container>
</template>
<script>
import RequestHandler from "@/utils/RequestHandler";
import CardDialect from "../components/CardDialect.vue";
import CardDialectPrototype from "../components/CardDialectPrototype.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { CardDialect, CardDialectPrototype },
  data: () => ({
    cards: [],
    cardActive: false,
    popular: [],
    discussed: [],
    random: { examples: [] },
    postText: "",
    carousel: null,
    carousel2: null,
  }),
  mounted() {
    RequestHandler.getLexemesRandom().then((response) => {
      this.cards = response.data;
    });
    axios
      .get("lexemes/popular/")
      .then((response) => (this.popular = response.data));
    axios
      .get("lexemes/discussed/")
      .then((response) => (this.discussed = response.data));
  },
  methods: {
    createPost() {
      if (this.$refs.postText.validate()) {
        RequestHandler.createPost(this.postText, null).then(() => {
          this.postText = "";
          this.$router.push("/postings");
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
};
</script>
