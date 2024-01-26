<template>
  <v-container fluid v-scroll="onScroll">
    <v-row no-gutters>
      <v-col>
        <p class="mb-0">

          <span class="text-h4">{{ collection.name }}</span>

          <span v-if="collection.public" style="color: red">
            ({{ $t("general.public") }})</span
          >
        </p>
        <p class="text-caption my-0">{{ collection.description }}</p>
        <p class="text-caption my-0">{{ collection.organization }}</p>
        <p class="text-caption my-0" v-if="collection.categories.length !== 0">
          <span >Kategorien:</span>
          <span

              :key="index"
              v-for="(category, index) in collection.categories"
          >{{ category }}
          </span>
        </p>
<p class="caption">Diese Sammlung enthält <span class="font-weight-bold">{{collection.count_lexemes}}</span> Begriffe.</p>
      </v-col>

      <v-col class="col-auto" >
        <v-menu left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
          </template>
          <v-list>
            <v-list-item @click="createPdf">{{ $t("collectionDetail.pdf") }}</v-list-item>
            <v-list-item @click="beforeConvert" >{{ $t("collectionDetail.csv") }}</v-list-item>

            <collection-settings-dialog
                v-if="collection.is_owner"
                :collection="collection"
            ></collection-settings-dialog>
            <collection-detail-trash-can-dialog
                v-if="collection.is_owner"
                :collectionId="collection.id"
                :lexemes="lexemes"
            ></collection-detail-trash-can-dialog>
            <v-list-item
                v-if="collection.is_owner & collection.name != 'Favoriten'"
                @click="deleteCollection"><span
                class="error--text">{{ $t("collectionDetail.deleteCollection") }}</span></v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-text-field
          v-model="search"
          :label="$t('general.search')"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-spacer></v-spacer>
      <collection-add-lexeme-dialog
          :collection="collection"
          :lexemes="lexemes"
          v-if="collection.can_add_lexeme_to_collection"
      ></collection-add-lexeme-dialog>
      <v-spacer></v-spacer>
      <v-btn-toggle color="primary"
                    v-model="view" dense>
        <v-btn>
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-view-headline</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <p v-if="lexemes.length === 0" class="pa-10 text-body-1">
      {{ $t("collectionDetail.collectionEmpty") }}
    </p>
    <v-scale-transition v-if="!view & !!lexemes.length" group class="row no-gutters">

      <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(card, index) in lexemes"
          :key="card.id"
      >
        <card-dialect :card="card" class="ma-3">
          <template
              slot="menuItem"
              v-if="collection.can_remove_lexeme_from_collection"
          >
            <v-list-item @click="removeLexeme(card, index)">
              {{ $t("card.removeFromCollection") }}
            </v-list-item>
          </template>
        </card-dialect>
      </v-col>
    </v-scale-transition>


    <v-row no-gutters v-if="view & !!lexemes.length">
      <v-simple-table id="printMe">
        <template v-slot:default>
          <thead>
          <tr>
            <th
                class="text-left"
                v-for="(header, index) in headers"
                :key="index"
            >
              {{ header.text }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in lexemes" :key="index">
            <td>{{ item.dialectWord }}</td>
            <td>{{ item.word }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.variety }}</td>
            <td>
              <div v-if="item.origin"><span>{{ item.origin.name }}</span><span
                  v-if="!!item.origin.state">, {{ item.origin.state }}</span>
              </div>
            </td>
            <td v-if="!printing">
              <a @click="$router.push('/lexeme/' + item.id)">alle Infos</a>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <v-row>
      <v-progress-circular
          class="ma-auto"
          v-if="!!loading"
          :size="150"
          indeterminate
      ></v-progress-circular>
      <v-btn v-if="!loading & !!next " class="ma-auto" outlined @click="loadMore">Mehr laden</v-btn>
    </v-row>
    <loading-overlay :loading="loadData" :overlay="printing"></loading-overlay>
  </v-container>
</template>

<script>
import RequestHandler from "../utils/RequestHandler.js";
import Collection from "../objects/Collection.js";
import CardDialect from "@/components/CardDialect";
import CollectionSettingsDialog from "@/components/CollectionSettingsDialog";
import CollectionAddLexemeDialog from "@/components/CollectionAddLexemeDialog";
import CollectionDetailTrashCanDialog from "@/components/CollectionDetailTrashCanDialog";
import axios from "axios";
import LoadingOverlay from "@/components/LoadingOverlay";
import ObjectToCsv from "@/components/ObjectToCsv.js";

import Axios from "axios";

export default {
  components: {
    LoadingOverlay,
    CollectionAddLexemeDialog,
    CollectionSettingsDialog,
    CollectionDetailTrashCanDialog,
    CardDialect,
  },
  data: () => ({
    collection: new Collection(),
    search: "",
    lexemes: [],
    next: null,
    view: false,
    headers: [
      {text: "Lemma", value: "dialectWord"},
      {text: "hochdeutsche Bedeutung", value: "word"},
      {text: "Bedeutung", value: "description"},
      {text: "Varietät", value: "variety"},
      {text: "Ursprung", value: "origin"},
      {text: "", value: "info"},
    ],
    printing: false,
    loadData: false,
    convert:false,
    loading:false,
  }),
  mounted() {
    RequestHandler.getCollection(this.$route.params.id).then((response) => {
      this.collection = response.data;
    });
    this.loading=true
    axios
        .get("lexemes/?page=1&collection=" + this.$route.params.id)
        .then((response) => {
          this.lexemes = response.data.results;
          this.next = response.data.links.next;
        }).finally(()=>this.loading=false);
  },
  watch: {
    search() {
      axios
          .get(
              "lexemes/?page=1&search=" +
              this.search +
              "&collection=" +
              this.$route.params.id
          )
          .then((response) => {
            this.lexemes = response.data.results;
            this.next = response.data.links.next;
          });
    },
  },
  methods: {
    createPdf() {
      this.loadData = true;
      this.loadAll().then(() => {
              ObjectToCsv.toPdf(this.lexemes, this.collection.name, this.collection.description,this.collection.organization)

        }).finally(()=>this.loadData=false);
    },
    removeLexeme(card, index) {
      this.lexemes.splice(index, 1);

      axios.delete("collection/" + this.collection.id + "/" + card.id + "/");
    },

    onScroll(e) {
      if (
          e.target.scrollingElement.scrollTop + 1000 >
          document.body.scrollHeight &&
          !!this.next
      ) {
        const next = this.next;
        this.next = null;
        this.loading=true
        axios.get(next).then((response) => {
          this.lexemes = this.lexemes.concat(response.data.results);
          this.next = response.data.links.next;
        }).finally(()=>this.loading=false);
      }
    },
    deleteCollection() {
      axios.delete("collection/" + this.collection.id + "/").then(() => {
        this.dialog = false;
        this.$router.push("/collections");
      });
    },
    async loadAll() {
      if (this.next) {
        const response = await axios.get(this.next);
        this.lexemes = this.lexemes.concat(response.data.results);
        this.next = response.data.links.next;
        await this.loadAll()
      }
    },
    print() {
      this.printing = true;
      const oldview = this.view
      this.view = true;
      this.loadData = true;
      this.loadAll().then(() => {
        this.loadData = false
        // Use nextTick to trigger the print on next update
        this.$nextTick(() => {
          this.$htmlToPaper("printMe", null, () => {
            this.view = oldview
            this.printing = false;
          });
        });
      })
    },
    loadMore() {
      this.loading=true;
      Axios.get(this.next).then((response) => {
        this.lexemes = this.lexemes.concat(response.data.results);
        this.next = response.data.links.next;
      }).finally(()=>this.loading=false);
    },
   async beforeConvert(){

     this.loadData = true;
     await this.loadAll()
     this.loadData = false;
     ObjectToCsv.convert(this.lexemes, this.collection.name)
    }
  },
};
</script>

<style scoped>
</style>