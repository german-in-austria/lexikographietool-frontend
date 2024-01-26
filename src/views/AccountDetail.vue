<template>
  <v-container fluid v-scroll="onScroll">
    <v-row no-gutters>
      <v-col>
        <p class="mb-0">

          <span class="text-h4 text-capitalize">{{ $route.params.username }}</span>


        <p class="caption"> <span class="text-capitalize">{{ $route.params.username}}</span> hat bereits <span class="font-weight-bold">{{ count }}</span>
          Begriffe hinzugefügt.</p>
      </v-col>

      <v-col class="col-auto">
        <v-menu left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
          </template>
          <v-list>
            <v-list-item @click="createPdf">{{ $t("collectionDetail.pdf") }}</v-list-item>
            <v-list-item @click="beforeConvert">{{ $t("collectionDetail.csv") }}</v-list-item>
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
      <span class="font-weight-bold text-capitalize">{{  $route.params.username }}</span> hat noch keine Wörter hizugefügt.
    </p>
    <v-scale-transition v-if="!view & !!lexemes.length" group class="row no-gutters">

      <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(card) in lexemes"
          :key="card.id"
      >
        <card-dialect :card="card" class="ma-3">

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

import CardDialect from "@/components/CardDialect";
import axios from "axios";
import LoadingOverlay from "@/components/LoadingOverlay";
import ObjectToCsv from "@/components/ObjectToCsv.js";

import Axios from "axios";

export default {
  components: {
    LoadingOverlay,
    CardDialect,
  },
  data: () => ({
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
    convert: false,
    loading: false,
    count:0,
  }),
  mounted() {

    this.loading = true
    axios
        .get("lexemes/?page=1&author__username__iexact=" + this.$route.params.username)
        .then((response) => {
          this.lexemes = response.data.results;
          this.next = response.data.links.next;
          this.count = response.data.count
        }).finally(() => this.loading = false);
  },
  watch: {
    search() {
      axios
          .get(
              "lexemes/?page=1&search=" +
              this.search +
              "&author__username__iexact=" +
              this.$route.params.username
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
        ObjectToCsv.toPdf(this.lexemes, this.$route.params.username, null,null)

      }).finally(() => this.loadData = false);
    },

    onScroll(e) {
      if (
          e.target.scrollingElement.scrollTop + 1000 >
          document.body.scrollHeight &&
          !!this.next
      ) {
        const next = this.next;
        this.next = null;
        this.loading = true
        axios.get(next).then((response) => {
          this.lexemes = this.lexemes.concat(response.data.results);
          this.next = response.data.links.next;
        }).finally(() => this.loading = false);
      }
    },

    async loadAll() {
      if (this.next) {
        const response = await axios.get(this.next);
        this.lexemes = this.lexemes.concat(response.data.results);
        this.next = response.data.links.next;
        await this.loadAll()
      }
    },

    loadMore() {
      this.loading = true;
      Axios.get(this.next).then((response) => {
        this.lexemes = this.lexemes.concat(response.data.results);
        this.next = response.data.links.next;
      }).finally(() => this.loading = false);
    },

    async beforeConvert() {

      this.loadData = true;
      await this.loadAll()
      this.loadData = false;
      await ObjectToCsv.convert(this.lexemes, this.$route.params.username)
    }
  },
};
</script>

<style scoped>
</style>
