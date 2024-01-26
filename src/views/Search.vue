<template>
  <v-container fluid >
    <p class="text-h3">Suche nach: {{ $route.params.search }}</p>
    <v-card class="my-2" outlined>
      <v-card-title>Wörter</v-card-title>
      <v-card-text class="body-1">
        <v-list v-if="lexemes.length != 0">

        <v-list-item
            v-for="(lexeme, index) in lexemes"
            :key="index"
            @click="$router.push('/lexeme/' + lexeme.id)"

        >
          <v-list-item-content class="pa-0">

          <p>
          <span class="font-weight-bold mr-2">{{lexeme.dialectWord}}</span> -
            <span class="body-2 ml-2">{{lexeme.word}}</span><span v-if="!!lexeme.word & !!lexeme.description">,</span> <span class=" text-body2 text--secondary">{{lexeme.description}}</span>
          </p>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!!lexemesNext" @click="loadMoreLexemes">
          Mehr...
        </v-list-item>
      </v-list></v-card-text>
    </v-card>
    <v-card class="my-2" v-if="collections.length != 0" outlined>
      <v-card-title>Sammlungen</v-card-title>
      <v-card-text class="body-1">
        <v-list >
          <v-list-item
              v-for="(collection, index) in collections"
              :key="index"
              @click="$router.push('/collections/' + collection.id)"
          >
           <v-list-item-content>

             <p> {{ collection.name }} </p><p class="body-2 text--secondary">{{ collection.description }}</p>

           </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!!collectionNext">
            <v-btn text @click="loadMoreCollections"> Mehr..</v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>



    <v-card class="my-2" v-if="collections.length != 0" outlined>
      <v-card-title>Gruppen</v-card-title>
      <v-card-text class="body-1">
        <v-list >
          <v-list-item
              v-for="(group, index) in groups"
              :key="index"
              @click="$router.push('/groups/' + group.id)"
          >
            <v-list-item-content>

              <p> {{ group.name }} </p><p class="body-2 text--secondary">{{ group.description }}</p>

            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!!groupsNext">
            <v-btn text @click="loadMoreGroups"> Mehr..</v-btn>
          </v-list-item>

        </v-list>
      </v-card-text>
    </v-card>


    <p v-if="groups.length + collections.length + lexemes.length===0">{{$t("search.noResults")}}</p>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    lexemes: [],
    lexemesNext: null,
    collections: [],
    collectionNext: null,
    groups: [],
    groupsNext: null,
  }),
  mounted() {
    axios
      .get("lexemes/?search=" + this.$route.params.search + "&page_size=5")
      .then((response) => {
        this.lexemes = response.data.results;
        this.lexemesNext = response.data.links.next;
      });

    axios
      .get(
        "collections/?search=" +
          this.$route.params.search +
          "&page_size=5"
      )
      .then((response) => {
        this.collections = response.data.results;
        this.collectionsNext = response.data.links.next;
      });

    axios
      .get(
        "groups/public/?search=" + this.$route.params.search + "&page_size=5"
      )
      .then((response) => {
        this.groups = response.data.results;
        this.groupsNext = response.data.links.next;
      });
  },
  methods: {
    loadMoreLexemes() {
      this.$router.push({ name: 'lexemes', params: { search: this.$route.params.search }})
      axios.get(this.lexemesNext).then((response) => {
        this.lexemes = this.lexemes.concat(response.data.results);
        this.lexemesNext = response.data.links.next;
      });
    },
    loadMoreCollections() {
      axios.get(this.collectionsNext).then((response) => {
        this.collections = this.collections.concat(response.data.results);
        this.collectionsNext = response.data.links.next;
      });
    },
    loadMoreGroups() {
      axios.get(this.groupsNext).then((response) => {
        this.groups = this.groups.concat(response.data.results);
        this.groupsNext = response.data.links.next;
      });
    },
  },
};
</script>