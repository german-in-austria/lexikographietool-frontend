<template>
  <v-container fluid>

    <p class="text-h3">{{ $t("card_create.title") }}</p>
    <p class="text-body-1">{{ $t("card_create.description") }}</p>
    <v-btn-toggle color="primary"
                  style="width: 100%" v-model="level" mandatory class="pb-2">
      <v-btn :width="100/3 + '%'" value="easy"> {{ $t("card_create.tab_title1") }}</v-btn>
      <v-btn :width="100/3 + '%'" value="medium">{{ $t("card_create.tab_title2") }}</v-btn>
      <v-btn :width="100/3 + '%'" value="expert">{{ $t("card_create.tab_title3") }}</v-btn>

    </v-btn-toggle>
    <v-form ref="form"
            v-model="valid"
            lazy-validation>
      <card-create-form :level="level" :loadHome="true" :lexeme="lex"></card-create-form>
    </v-form>
    <v-row no-gutters class="mb-3 mt-3 create-section">
      <v-col cols="12">
        <v-subheader>{{ $t("createWord.collection") }}
          <input-tool-tip
              :tip="$t('createWord.collectionToolTip')"
          ></input-tool-tip>
        </v-subheader>
        <CardCreateAddCollection :solo="true" :model="collections"></CardCreateAddCollection>
      </v-col>
    </v-row>
    <v-col>
      <v-btn :disabled="commitDisabled" color="primary" @click="submit">{{
          $t("card_create.createButton1")
        }}
      </v-btn>
    </v-col>
    <!--    <v-btn @click="createNewLexeme('reset')">{{ $t("card_create.createButton2") }}</v-btn>-->
    <!--    <v-btn @click="createNewLexeme('addMeaning')">{{ $t("card_create.createButton3") }}</v-btn>-->
    <v-expand-transition>
      <v-snackbar
          multi-line
          min-height="500"
          min-width="500"
          v-model="snackbarSuccessful"
          :timeout="2000"
          color="success"
          style="margin-top: 100px"
          top
      >
        {{ $t("card_create.successMessage") }}
      </v-snackbar>
    </v-expand-transition>
    <v-snackbar v-model="snackbarFailure" :timeout="2000" color="error" top>
      {{ $t("card_create.failureMessage") }}
    </v-snackbar>
    <confirm-dialog-lexeme-already-exists ref="confirm" :items="similarLexemes"></confirm-dialog-lexeme-already-exists>
  </v-container>
</template>

<script>


import requestHandler from "@/utils/RequestHandler";
import Lexeme from "@/objects/Lexeme";
import RequestHandler from "@/utils/RequestHandler";
import CardCreateForm from "@/components/CardCreateForm";
import InputToolTip from "@/components/InputToolTip";
import CardCreateAddCollection from "@/components/CardCreateAddCollection";
import axios from "axios";
import ConfirmDialogLexemeAlreadyExists from "@/components/ConfirmDialogLexemeAlreadyExists";

export default {
  name: "CardCreate",
  components: {
    ConfirmDialogLexemeAlreadyExists,
    CardCreateAddCollection,
    CardCreateForm,
    InputToolTip
  },
  data: () => ({
    lex: {
      dialectWord: "",
      variety: "",
      lexeme: "",
      description: "",
      examples: [{value: ""}],
      pronunciations: [{value: ""}],
      etymologies: [{value: ""}],
      kind: null,
      location: {},
      categories: {value: []},
      sensitive: false,
      genus: null,
      source: '',
    },
    commitDisabled: false,
    snackbarSuccessful: false,
    snackbarFailure: false,
    valid: false,
    tab: null,
    collections: {value: []},
    level: "easy",
    similarLexemes: []
  }),
  methods: {
    async createNewLexeme(finishedOption) {
      this.commitDisabled = true
      let location = {data: {id: this.lex.location.id}}
      if (this.lex.location.id === '-1')
        location = await axios.post('location/', this.lex.location)


      let lexeme = new Lexeme(
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

      var similar = await axios.post("identical/", lexeme)
      this.similarLexemes = similar.data
      if (similar.data && similar.data.length != 0)
        if (!await this.$refs.confirm.open('Delete', 'Are you sure?', {color: 'primary'}))
          return

      lexeme = await requestHandler.postLexeme(lexeme);


      requestHandler.postEtymologies(this.lex.etymologies.filter(value => {
        return !!value.value
      }), lexeme.data.id)
      requestHandler.postExamples(this.lex.examples.filter(value => {
        return !!value.value
      }), lexeme.data.id)
      requestHandler.postPronunciations(this.lex.pronunciations.filter(value => {
        return !!value.value
      }), lexeme.data.id)
      requestHandler.addCategoriesWithLexeme(this.lex.categories.value, lexeme.data.id)
      this.snackbarSuccessful = true;


      //add to collections
      this.commitDisabled = false


      this.addToCollection(lexeme.data.lexeme)
      if (finishedOption == 'leave')
        this.$router.push('/lexeme/' + lexeme.data.lexeme)
      else if (finishedOption == 'reset')
        this.resetForm();
      else if (finishedOption == 'addMeaning')
        this.resetPartForm();
    },
    async submit() {

      if (this.$refs.form.validate()) {
        this.createNewLexeme('leave');
      }
    },
    addToCollection(lexemeId) {
      this.collections.value.forEach((item) => {
        //check if collection needs to be created
        if (!item.id) {
          axios.post('collection/', {name: item.name}).then(response => {
            axios.put('collection/' + response.data.id + '/' + lexemeId + '/')
          })
        } else {
          axios.put('collection/' + item.id + '/' + lexemeId + '/')
        }
      })
    },
    resetForm() {
      this.lex.dialectWord = ''
      this.lex.variety = ''
      this.lex.lexeme = ''
      this.lex.description = ''
      this.lex.examples = []
      this.lex.pronunciations = []
      this.lex.etymologies = []
      this.lex.kind = 'N'
      this.lex.categories = []
      this.lex.sensitive = false
      this.lex.source = false

    },
    resetPartForm() {
      this.lex.variety = ''
      this.lex.lexeme = ''
      this.lex.description = ''
      this.lex.examples = []
      this.lex.pronunciations = []
      this.lex.etymologies = []
      this.lex.categories = []
      this.lex.source = false

    },
  },
  mounted() {
    RequestHandler.searchCategories('').then(response => this.category_list = response.data)

  }
};
</script>

<style scoped>
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 56px;
}

.create-section {
  padding: 20px;
  border-radius: 20px;
  border-color: lightgray;
  margin-top: 10px;
  background-color: rgb(0, 0, 0, 0.05);
}
</style>