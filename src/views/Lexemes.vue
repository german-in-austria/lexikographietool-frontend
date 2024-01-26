<template>
  <v-app>
    <v-container fluid v-scroll="onScroll">
      <div class="sticky1">
        <v-row>
          <v-col><p class="text-h4">Wörterecke </p></v-col>
          <v-col v-if="$vuetify.breakpoint.xs">
            <v-btn-toggle color="primary"
                          v-model="view" dense style="position: absolute;right: 25px;">
              <v-btn :small="$vuetify.breakpoint.xs">
                <v-icon>mdi-view-grid</v-icon>
              </v-btn>
              <v-btn :small="$vuetify.breakpoint.xs">
                <v-icon>mdi-view-headline</v-icon>
              </v-btn>
            </v-btn-toggle>

          </v-col>
          <v-col class="col-auto">
            <v-menu left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-list>
                <v-list-item @click="createPdf">{{ $t("collectionDetail.pdf") }}</v-list-item>
                <v-list-item @click="beforeConvert">{{ $t("collectionDetail.csv") }}</v-list-item>
                <v-list-item @click="convertAllToCsv">{{ $t("lexemes.downloadAllAsCSV") }}</v-list-item>


              </v-list>
            </v-menu>
          </v-col>

        </v-row>
      </div>
      <v-row no-gutters>

        <p class="text-body-1">

        {{ $t("lexemes.desciption", {amount: lexemeAmount}) }}
        <span v-if="authenticated && myLexemeAmount >= 1">{{
            $t("lexemes.authorizedAdded", {amount: myLexemeAmount})
          }}</span>
        <span v-if="!authenticated">{{ $t("lexemes.notAuthorized") }}</span>
      </p></v-row>

      <div class="sticky2">
        <v-app-bar
            hide-on-scroll
            absolute
            :height="searchBarHeight"
            fixed
            flat
        >
          <v-row no-gutters>
            <v-col>
              <search-bar @searchBarHeight="updateSearchHeight"
                          class="" v-on:input="search = $event"></search-bar>
            </v-col>
            <v-col v-if="!$vuetify.breakpoint.xs" class="col-auto">
              <v-btn-toggle color="primary"
                            v-model="view" dense style="margin-top: 22px;">
                <v-btn>
                  <v-icon>mdi-view-grid</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon>mdi-view-headline</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-app-bar>
      </div>


      <v-row no-gutters v-if="!view" style="margin-top: 8rem">
        <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(item, index) in items"
            :key="index"
        >
          <card-dialect class="ma-3" :card="item"></card-dialect>
        </v-col>

      </v-row>
      <v-row no-gutters v-else>
        <v-simple-table style="margin-top: 8rem">
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
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.dialectWord }}</td>
              <td>{{ item.word }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.variety }}</td>
              <td>
                <div v-if="item.origin"><span>{{ item.origin.name }}</span><span
                    v-if="!!item.origin.state">, {{ item.origin.state }}</span></div>
              </td>
              <td>
                <CollectionAddLexeme :card-id="item.id"></CollectionAddLexeme>
              </td>
              <td>
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

    </v-container>
    <loading-overlay :loading="loadData"></loading-overlay>

  </v-app>
</template>

<script>
import axios from "axios";
import CardDialect from "../components/CardDialect.vue";
import SearchBar from "../components/SearchBar.vue";
import CollectionAddLexeme from "../components/CollectionAddLexeme.vue";
import {mapGetters} from "vuex";
import Axios from "axios";
import ObjectToCsv from "@/components/ObjectToCsv";
import LoadingOverlay from "@/components/LoadingOverlay";

export default {
  components: {LoadingOverlay, CardDialect, SearchBar, CollectionAddLexeme},
  data: () => ({
    items: [],
    pageCount: 0,
    count: 0,
    loading: true,
    page: 1,
    search: "ordering=-date_created",
    next: null,
    view: 0,
    headers: [
      {text: "Lemma", value: "dialectWord"},
      {text: "hochdeutsche Bedeutung", value: "word"},
      {text: "Bedeutung", value: "description"},
      {text: "Varietät", value: "variety"},
      {text: "Ursprung", value: "origin"},
      {text: "", value: "info"},
      {text: "", value: "addToCollection"},
    ],
    scroller: {},
    timeout: null,
    lexemeAmount: 0,
    myLexemeAmount: 0,
    searchBarHeight: "100px",
    loadData: false,

  }),
  mounted() {


    this.loadFromApi();
    axios.get('lexemes_count/').then(response => this.lexemeAmount = response.data)
    axios.get('lexemes_my_count/').then(response => this.myLexemeAmount = response.data)


  },
  watch: {
    search() {

      clearTimeout(this.timeout);

      let self = this;
      this.timeout = setTimeout(function () {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.page = 1;
        self.loadFromApi();
      }, 500);

    },
  },
  methods: {
    updateSearchHeight(value) {
      this.searchBarHeight = value
    },
    loadFromApi() {
      this.loading = true;
      axios
          .get("/lexemes/?page=" + this.page + "&page_size=24&" + this.search)
          .then((response) => {
            this.items = response.data.results;
            this.pageCount = response.data.total_pages;
            this.count = response.data.count;
            this.next = response.data.links.next;
          })
          .finally(() => (this.loading = false));
    },
    onScroll(e) {

      console.log(e.target.scrollingElement)
      if (
          e.target.scrollingElement.scrollTop + 1000 >
          document.body.scrollHeight &&
          !!this.next
      ) {

        this.next = null
        this.page += 1;
        this.loading = true;
        axios
            .get("/lexemes/?page=" + this.page + "&page_size=24&" + this.search)
            .then((response) => {
              this.items = this.items.concat(response.data.results);
              this.pageCount = response.data.total_pages;
              this.count = response.data.count;
              this.next = response.data.links.next;
            })
            .finally(() => (this.loading = false));
      }
    },
    loadMore() {
      this.loading = true;
      Axios.get(this.next).then((response) => {
        this.items = this.items.concat(response.data.results);
        this.pageCount = response.data.total_pages;
        this.count = response.data.count;
        this.next = response.data.links.next;
      }).finally(() => this.loading = false);
    },

    createPdf() {

      ObjectToCsv.toPdf(this.items, "Wörterecke", null, null)

    },
    async loadAll() {
      if (this.next) {
        const response = await axios.get(this.next);
        this.items = this.items.concat(response.data.results);
        this.next = response.data.links.next;
        await this.loadAll()
      }
    },
    async convertAllToCsv() {
      this.loadData = true;
      await this.loadAll()
      ObjectToCsv.convert(this.items, "Wortgut.csv")
      this.loadData = false;
    },
    async beforeConvert() {

      ObjectToCsv.convert(this.items, "wortgut")
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated"
    }),

  }
};
</script>

<style>
.sticky1 {
  background-color: white;
  height: 70px;
  position: sticky;
  top: 5.6rem;
  z-index: 3;
}

.sticky2 {
  top: 10rem;
  position: sticky;
  z-index: 2;
}
</style>