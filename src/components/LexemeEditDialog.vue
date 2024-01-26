<template>
    <v-dialog v-model="dialog" max-width="40rem" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on.native.stop="on" >
                   {{$t('card.edit')}}
        </v-list-item>
      </template>
      <v-card>
        <v-card-title :class="color + ' lighten-4 headline'">
         {{$t('card.editTitle')}}
        </v-card-title>

        <v-divider></v-divider>
        <v-card-text>
          <v-btn-toggle

              color="primary"
                              style="width: 100%" v-model="level" mandatory class="py-2">
            <v-btn small :width="100/3 + '%'" value="easy"> {{ $t("card_create.tab_title1") }}</v-btn>
            <v-btn small :width="100/3 + '%'" value="medium">{{ $t("card_create.tab_title2") }}</v-btn>
            <v-btn small :width="100/3 + '%'" value="expert">{{ $t("card_create.tab_title3") }}</v-btn>
          </v-btn-toggle>
          <card-create-form :level="level"  :lexeme="lex" :loadHome="false"></card-create-form>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="createNewLexeme">Speichern</v-btn>
        </v-card-actions>
      </v-card>
      
    <v-snackbar
      v-model="snackbarSuccessful"
      :timeout="2000"
      color="success"
      centered
      height="500"
    >
      Wort bearbeitet!
    </v-snackbar>
    </v-dialog>
</template>

<script>
import CardCreateForm from "@/components/CardCreateForm";
import requestHandler from "@/utils/RequestHandler"
import Lexeme from "@/objects/Lexeme"
import Axios from 'axios';

export default {
  components: {CardCreateForm},
  props: ["lexeme"],
  data: () => ({
    dialog: false,
    snackbarSuccessful: false,
    lex: {
      dialectWord: "",
      variety: "",
      lexeme: "",
      description: "",
      examples: [{value: ""}],
      pronunciations: [{value: ""}],
      etymologies: [{value: ""}],
      kind: null,
      genus: null,
      location: {},
      categories: {value:[]},
      sensitive: false,
      source: '',
    },
    level:'expert',

  }),
  watch: {
    dialog() {
      this.lex.dialectWord = this.lexeme.dialectWord;
      this.lex.word = this.lexeme.word;
      this.lex.description = this.lexeme.description;
      this.lex.variety = this.lexeme.veriety;
      this.lex.kind = this.lexeme.kind;
      this.lex.genus = this.lexeme.genus;
      this.lex.source = this.lexeme.source;
      this.lex.location = this.lexeme.origin;
      this.lex.categories = {value: this.lexeme.categories}
      this.lex.examples = this.lexeme.examples.map((item) => {
        return {value: item.example};
      });
      this.lex.pronunciations = this.lexeme.pronunciations.map((item) => {
        return {value: item.pronunciation};
      });
      this.lex.etymologies = this.lexeme.etymologies.map((item) => {
        return {value: item.etymology};
      });

      this.lex.sensitive = this.lexeme.sensitive;
    },
  },
  computed: {
    color() {
      const crypto = require("crypto");
      const hash = crypto
          .createHash("sha1")
          .update(
              this.lexeme.dialectWord + this.lexeme.word + this.lexeme.description
          )
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
  methods: {
    async createNewLexeme() {
      // var categories = [];
      // this.categories.forEach((item) => categories.push(new Category(item)));
   

        let location = {data:{id:this.lex.location.id}}
      if (this.lex.location.id === '-1')
        location = await Axios.post('location/',this.lex.location)


      var lexemeId;
      var lexeme = new Lexeme(
          this.lex.word,
          this.lex.description,
          this.lex.dialectWord,
          this.lex.kind,
          location.data.id,
          this.lex.sensitive,
          this.lex.variety,
          this.lex.source,
          this.lex.genus,
      );
      Axios.put('lexeme/' + this.lexeme.id + '/', lexeme)
          .then((response) => {
            lexemeId = response.data.id;
            requestHandler.postEtymologies(this.lex.etymologies, lexemeId);
            requestHandler.postExamples(this.lex.examples, lexemeId);
            requestHandler.postPronunciations(this.lex.pronunciations, lexemeId);
            requestHandler.addCategoriesWithLexeme(this.lex.categories.value, lexemeId);

            this.snackbarSuccessful = true;
            this.updateParent()
            this.dialog = false
          });
    },
    updateParent() {
      this.lexeme.dialectWord = this.lex.dialectWord;
      this.lexeme.word = this.lex.word;
      this.lexeme.description = this.lex.description;
      this.lexeme.veriety = this.lex.variety;
      this.lexeme.kind = this.lex.kind;
      this.lexeme.genus = this.lex.genus;
      this.lexeme.source = this.lex.source;
      this.lexeme.origin = this.lex.location;
      this.lexeme.examples = this.lex.examples.map((item) => {
        return {example: item.value};
      });
      this.lexeme.pronunciations = this.lex.pronunciations.map((item) => {
        return {pronunciation: item.value};
      });
      this.lexeme.etymologies = this.lex.etymologies.map((item) => {
        return {etymology: item.value};
      });
      this.lexeme.categories = this.lex.categories.value;
      this.lexeme.sensitive = this.lex.sensitive;
    }
  },
};
</script>