<template>
  <div>
      <v-row no-gutters class="mb-3 mt-3 create-section">
      <v-col cols="12">
        <v-subheader>{{$t('createWord.lemma')}}<input-tool-tip
            :tip="$t('createWord.lemmaToolTip')"
        ></input-tool-tip></v-subheader>
        <v-text-field
            solo
            flat

            v-model="lexeme.dialectWord"
            :label="$t('createWord.lemma')"
            :rules="[(v) => !!v || 'Lemma muss angegeben werde']"
            required
        >
      
        </v-text-field>
      </v-col>
        <v-expand-transition>
      <v-col cols="12" v-if="!easy & !medium">
        <v-subheader>{{$t('createWord.pronunciation')}}<input-tool-tip
            :tip="$t('createWord.pronunciationToolTip')"
            
        ></input-tool-tip></v-subheader>
        <input-multiple
        :ipa="true"
            :label="$t('createWord.pronunciation')"
            v-model="lexeme.pronunciations"
        >
        
        </input-multiple>
      </v-col>
        </v-expand-transition>
        <v-expand-transition>

        <v-col cols="12" v-if="!easy">

        <input-button-group
            v-model="lexeme.kind"
            :items="kindItems"
        ></input-button-group>
      </v-col>
          </v-expand-transition>

          <v-expand-transition>
      <v-col class="mt-4" cols="12" v-if="lexeme.kind=='N' && !easy">

        <input-button-group
            v-model="lexeme.genus"
            :items="genusItems"
        ></input-button-group>
      </v-col>
      </v-expand-transition>
      </v-row>

      <v-row no-gutters class="mb-3 mt-3  create-section">
      <v-col cols="12">

        <v-subheader>
          {{$t('createWord.lexeme')}}<input-tool-tip
            :tip="$t('createWord.lexemeToolTip')"
        ></input-tool-tip></v-subheader>
        <input-lemma-box
            :rules="[(v) => !!v | !!lexeme.description || 'standarddeutsche Entsprechung oder Beschreibung muss angegeben werden']"
            :label="$t('createWord.lexeme')"
            v-model="lexeme.word"
            type="lexeme"
        >
         
        </input-lemma-box>
      </v-col>
      <v-col cols="12">
        <v-subheader>
          {{$t('createWord.description')}}<input-tool-tip
            :tip="$t('createWord.descriptionToolTip')"
        ></input-tool-tip></v-subheader>
        <v-textarea
            solo
            rows="2"
            :rules="[(v) => !!v | !!lexeme.word || 'standarddeutsche Entsprechung oder Beschreibung muss angegeben werden']"
            
            flat
            v-model="lexeme.description"
            :label="$t('createWord.description')"
            required
        >

        </v-textarea>
      </v-col>
        <v-expand-transition>

      <v-col cols="12" v-if="!easy">
        <v-subheader>
          {{$t('createWord.example')}}<input-tool-tip
            :tip="$t('createWord.exampleToolTip')"
        ></input-tool-tip></v-subheader>
        <input-multiple :label="$t('createWord.example')" v-model="lexeme.examples">
        </input-multiple>
      </v-col>
          </v-expand-transition>

      <v-expand-transition>
      <v-col cols="12" v-if="!easy & !medium">
        <v-subheader>
          {{$t('createWord.etymology')}}<input-tool-tip
            :tip="$t('createWord.etymologyToolTip')"
        ></input-tool-tip></v-subheader>
        <input-multiple :label="$t('createWord.etymology')" v-model="lexeme.etymologies">

        </input-multiple>
      </v-col>
      </v-expand-transition>

      </v-row>
    <v-row no-gutters class="mb-3 mt-3  create-section">
      <v-expand-transition>

      <v-col cols="12" v-if="!easy">
        <v-subheader>
          {{$t('createWord.category')}}<input-tool-tip
            :tip="$t('createWord.categoryToolTip')"
        ></input-tool-tip></v-subheader>
        <card-create-add-category :solo="true" :model="lexeme.categories"></card-create-add-category>

      </v-col>
        </v-expand-transition>

      <v-col cols="12">
        <v-subheader>
          {{$t('createWord.variety')}}<input-tool-tip
            :tip="$t('createWord.varietyToolTip')"
        ></input-tool-tip></v-subheader>
        <input-lemma-box
            :label="$t('createWord.variety')"
            v-model="lexeme.variety"
            type="variety"
        >

        </input-lemma-box>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-3 mt-3  create-section">
      <v-subheader>
        {{$t('createWord.usedIn')}}</v-subheader>
      <v-col cols="12">
        <input-field-location :solo="true" :loadHome="loadHome" v-model="lexeme.location"></input-field-location>
      </v-col>
      <v-expand-transition>

      <v-col cols="12" v-if="!easy">
        <v-textarea
            solo

            flat
            v-model="lexeme.source"
            :label="$t('createWord.source')"
            single-line
        >

        </v-textarea>
      </v-col>
        </v-expand-transition>

        <v-col>
        <v-checkbox
            v-model="lexeme.sensitive"
            :label="$t('createWord.sensitive')"

        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import InputLemmaBox from "@/components/InputLemmaBox";
import InputMultiple from "@/components/InputMultiple";
import InputButtonGroup from "@/components/InputButtonGroup";
import InputFieldLocation from "@/components/InputFieldLocation";
import InputToolTip from "./InputToolTip.vue";
import Axios from "axios";
import CardCreateAddCategory from "@/components/CardCreateAddCategory";

export default {
  props: ["lexeme",'loadHome', 'level'],
  components: {
    CardCreateAddCategory,
    InputButtonGroup,
    InputMultiple,
    InputLemmaBox,
    InputToolTip,
    InputFieldLocation,
  },
  data: function () {
    return {
      kindItems: [
        {
          id: 1,
          name: this.$t("createWord.noun"),
          value: "N",
          tooltip:  this.$t("createWord.noun"),
        },
        {
          id: 2,
          name:  this.$t("createWord.verb"),
          value: "V",
          tooltip:  this.$t("createWord.verbTooltip"),

        },
        {
          id: 3,
          name: this.$t("createWord.adjective"),
          value: "Aj",
          tooltip:  this.$t("createWord.adjectiveTooltip"),

        },
        {
          id: 4,
          name:  this.$t("createWord.adverb"),
          value: "Av",
          tooltip:  this.$t("createWord.adverbTooltip"),

        },
        {
          id: 5,
          name: this.$t("createWord.interjection"),
          value: 'I',
          tooltip:  this.$t("createWord.interjectionTooltip"),

        },
        {
          id: 6,
          name:  this.$t("createWord.phrase"),
          value: "P",
          tooltip:  this.$t("createWord.phraseTooltip"),
        },
      ],
      genusItems: [
        {
          id: 1,
          name: this.$t("createWord.female"),
          value: "F",
          tooltip: this.$t("createWord.femaleToolTip"),
        },
        {
          id: 2,
          name:this.$t("createWord.male"),
          value: "M",
          tooltip: this.$t("createWord.maleToolTip"),

        },
        {
          id: 3,
          name: this.$t("createWord.neuter"),
          value: "N",
          tooltip: this.$t("createWord.neuterToolTip"),

        }]
    }
  },
  mounted() {
    Axios.get("categories/").then(
        (response) => (this.category_list = response.data)
    );
  },
  computed:{
      easy(){
        return this.level==='easy'
      },
      medium(){
          return this.level==='medium'

      }
  }

};
</script>
<style>
.create-section{
  padding:20px;
  border-radius: 20px;
  border-color: lightgray;
  background-color: rgb(0,0,0,0.05);
}

</style>