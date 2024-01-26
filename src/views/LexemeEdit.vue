<template>
  <v-container fluid>

    <p class="text-h3">{{ $t("card.editTitle") }}</p>
    <card-create-form :lexeme="lex" :loadHome="false"></card-create-form>
    <v-btn color="primary" @click="createNewLexeme">{{
        $t("general.save")
      }}
    </v-btn>
  </v-container>
</template>

<script>
import CardCreateForm from "@/components/CardCreateForm";
import RequestHandler from "@/utils/RequestHandler";
import Axios from "axios";
import Lexeme from "@/objects/Lexeme";
import requestHandler from "@/utils/RequestHandler";
export default {
name: "LexemeEdit",
  components: {CardCreateForm},
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
  }),
  mounted() {
    RequestHandler.getLexeme(this.$route.params.id).then((response) => {
      const lexeme = response.data;
      this.lex.dialectWord = lexeme.dialectWord;
      this.lex.word = lexeme.word;
      this.lex.description = lexeme.description;
      this.lex.variety = lexeme.veriety;
      this.lex.kind = lexeme.kind;
      this.lex.genus = lexeme.genus;
      this.lex.source = lexeme.source;
      this.lex.location = lexeme.origin;
      this.lex.categories = {value: lexeme.categories}
      this.lex.examples = lexeme.examples.map((item) => {
        return {value: item.example};
      });
      this.lex.pronunciations = lexeme.pronunciations.map((item) => {
        return {value: item.pronunciation};
      });
      this.lex.etymologies = lexeme.etymologies.map((item) => {
        return {value: item.etymology};
      });

      this.lex.sensitive = lexeme.sensitive;

    });
  },
  methods: {
    async createNewLexeme() {
      // var categories = [];
      // this.categories.forEach((item) => categories.push(new Category(item)));


      let location = {data: {id: this.lex.location.id}}
      if (this.lex.location.id === '-1')
        location = await Axios.post('location/', this.lex.location)


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
      Axios.put('lexeme/' + this.$route.params.id + '/', lexeme)
          .then((response) => {
            lexemeId = response.data.id;
            requestHandler.postEtymologies(this.lex.etymologies, lexemeId);
            requestHandler.postExamples(this.lex.examples, lexemeId);
            requestHandler.postPronunciations(this.lex.pronunciations, lexemeId);
            requestHandler.addCategoriesWithLexeme(this.lex.categories.value, lexemeId);

            this.$router.push("/lexeme/" + this.$route.params.id)
          });
    },
  }
}
</script>

<style scoped>

</style>