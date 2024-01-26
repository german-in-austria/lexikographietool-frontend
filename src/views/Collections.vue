<template>
  <v-container fluid v-scroll="onScroll">
    <v-row>
      <v-col>
        <p class="text-h4">{{ $t("collections.title") }}</p>

      </v-col>
      <v-col class="col-auto">
        <v-menu left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
          </template>
          <v-list>
            <collection-create-button class="d-inline-block"
                                      @created="collectionCreated"

            >
              <template v-slot="{dialog}">
                <v-list-item @click.stop="dialog.dialog=true">neue Sammlung erstellen</v-list-item>

              </template>
            </collection-create-button>
            <trash-can-dialog
                :itemList="collections"
                :collection="true"
            ></trash-can-dialog>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <i18n class="text-body-1" path="collections.description" tag="p">
        <template v-slot:createCollection>
          <collection-create-button class="d-inline-block"
                                    @created="collectionCreated"

          >
            <template v-slot="{dialog}">
              <a class="success--text" @click="dialog.dialog=true">{{ $t("collections.createCollection") }}
              </a>
            </template>
          </collection-create-button>
        </template>
      </i18n>
    </v-row>
    <v-row no-gutters class="pt-5">
      <v-col cols="12">
        <v-btn-toggle color="primary" style="width: 100%" v-model="pub" mandatory class="pb-2">
          <v-btn :small="$vuetify.breakpoint.xs" width="50%" :value="false"> {{
              $t("collections.myCollections")
            }}
          </v-btn>
          <v-btn :small="$vuetify.breakpoint.xs" width="50%" :value="true">{{
              $t("collections.publicCollections")
            }}
          </v-btn>

        </v-btn-toggle>
      </v-col>
      <v-col class="transition-ease-in-out">
        <v-text-field
            dense
            v-model="search"
            :label=' $t("general.search") '
            single-line
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"

        ></v-text-field>
      </v-col>
      <v-col v-if="groups.length >= 2 && !pub">
        <v-select

            dense @input="pub=false;loadCollections" return-object
            item-text="name" v-model="selectedGroup" :items="groups"
            label="Gruppe" solo-inverted flat></v-select>
      </v-col>

    </v-row>
    <v-row no-gutters>

      <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="collection in collections"
          :key="collection.id"
          class="pa-3"
      >
        <card-collection :collection="collection"></card-collection>
      </v-col>
      <p class="text-body-1" v-if="(!collections.length) & !!search">
        Keine Treffer
      </p>

    </v-row>
    <v-row>
      <v-progress-circular
          class="ma-auto"
          v-if="!!loading"
          :size="150"
          indeterminate
      ></v-progress-circular>
      <v-btn v-if="!loading & !!next" class="ma-auto" outlined @click="loadMore">Mehr laden</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CardCollection from "../components/CardCollection.vue";
import CollectionCreateButton from "../components/CollectionCreateButton.vue";
import TrashCanDialog from "../components/TrashCanDialog.vue";
import Axios from "axios";

export default {
  name: "Collections",

  components: {CardCollection, CollectionCreateButton, TrashCanDialog},
  data: () => ({
    collections: [],
    search: "",
    pub: false,
    tab: null,
    next: null,
    timeout: null,
    groups: [{name: "Meine eigenen Sammlungen", id: -1}],
    selectedGroup: {name: "Meine eigenen Sammlungen", id: -1},
    loading: false,
  }),
  mounted() {
    this.loading = true
    Axios.get("/collections/?public=False").then((response) => {
      this.collections = response.data.results;
      this.next = response.data.links.next;
    }).finally(() => this.loading = false);
    Axios.get("/groups/").then(response => this.groups = this.groups.concat(response.data))
  },
  watch: {
    pub() {
      this.loadCollections();
    },
    selectedGroup() {
      this.pub = false;
      this.loadCollections();


    },
    search() {

      clearTimeout(this.timeout);

      let self = this;
      this.timeout = setTimeout(function () {

        self.loadCollections();
      }, 500);
    },
  },
  methods: {
    loadCollections() {
      //true in python is True
      this.loading = true
      const public_python_param = this.pub ? "True" : "False";

      const groupSelection = this.selectedGroup.id === -1 ? "" : "&group=" + this.selectedGroup.id
      Axios.get(
          "/collections/?search=" +
          this.search +
          "&public=" +
          public_python_param + groupSelection
      ).then((response) => {
        this.collections = response.data.results;
        this.next = response.data.links.next;
      }).finally(() => this.loading = false);
    },

    collectionCreated(value) {
      this.collections.unshift(value);
      this.search = "";
    },

    onScroll(e) {
      if (
          e.target.scrollingElement.scrollTop + 1000 >
          document.body.scrollHeight &&
          !!this.next
      ) {
        const next = this.next
        this.next = null
        Axios.get(next).then((response) => {
          this.collections = this.collections.concat(response.data.results);
          this.next = response.data.links.next;
        });
      }
    },
    loadMore() {
      this.loading=true;
      Axios.get(this.next).then((response) => {
        this.collections = this.collections.concat(response.data.results);
        this.next = response.data.links.next;
      }).finally(()=>this.loading=false);
    }
  },
}
;
</script>

<style scoped>

</style>