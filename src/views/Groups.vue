<template>
  <v-container fluid v-scroll="onScroll">
    <v-row>
      <v-col>
        <p class="text-h4">{{ $t("groups.title") }}</p>
      </v-col>
      <v-col class="col-auto">
        <v-menu left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
          </template>
          <v-list>
            <group-create-button></group-create-button>

            <trash-can-dialog :itemList="groups" :group="true"></trash-can-dialog>

          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <i18n class="text-body-1" path="groups.description" tag="p">
        <template v-slot:createGroup>
          <group-create-button class="d-inline-block" :text="$t('groups.createGroup')"></group-create-button>
        </template>
      </i18n>
    </v-row>
    <v-row no-gutters class="pt-5">
      <v-btn-toggle
          color="primary"
          class="pb-2"
          style="width: 100%"
          v-model="pub"
          mandatory

      >
        <v-btn :small="$vuetify.breakpoint.xs" width="50%" class="text-truncate" :value="false"> Meine Gruppen</v-btn>
        <v-btn :small="$vuetify.breakpoint.xs"  :width="isSuperUser ? '25%' : '50%'" class="text-truncate" :value="true"> öffentliche Gruppen</v-btn>
        <v-btn v-if="isSuperUser" :small="$vuetify.breakpoint.xs"  width="25%" class="text-truncate"  @click="loadAllGroups" >alle Gruppen</v-btn>
      </v-btn-toggle>
      <v-text-field
          v-model="search"
          label="Suche"
          single-line
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"

      ></v-text-field>


    </v-row>
    <v-row no-gutters>
      <p v-if="!groups.length">Du bist momentan in keiner Gruppe.
        <group-create-button class="d-inline-block"  :text="'Erstelle eine neue Gruppe'"></group-create-button>
        oder suche bei öffentliche Gruppen nach einer Gruppe, der du beitreten möchtest.</p>


      <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="group in groups"
          :key="group.id"
          class="pa-3"
      >
        <v-hover v-slot="{ hover }">
          <v-card
              :to="'/groups/' + group.id"
              :elevation="hover ? 4 : 0"
              class="mx-auto"
              outlined
          >
            <v-card-title>{{ group.name }}</v-card-title>
            <v-card-text>{{ group.description }}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <p class="text-body-1" v-if="(!groups.length) & !!search">
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
import TrashCanDialog from "../components/TrashCanDialog.vue";
import Axios from "axios";
import GroupCreateButton from "../components/GroupCreateButton.vue";
import {mapGetters} from "vuex";

export default {
  components: {TrashCanDialog, GroupCreateButton},
  name: "Group",
  data: () => ({
    groups: [],
    next: null,
    search: "",
    pub: false,
    tab: null,
    groupTitle: "",
    groupDescription: "",
    loading:false,
    timeout: null,
  }),
  methods: {
    loadGroups() {
      const public_python_param = this.pub ? "True" : "False";
      this.loading=true
      Axios.get(
          "groups/public/?page=1&page_size=25&public=" +
          public_python_param +
          "&search=" +
          this.search
      ).then((response) => {
        this.groups = response.data.results;
        this.next = response.data.links.next;
      }).finally(()=>this.loading=false);
    },
    loadAllGroups() {
      this.loading=true
      Axios.get(
          "groups/public/?page=1&page_size=25&all" +
          "&search=" +
          this.search
      ).then((response) => {
        this.groups = response.data.results;
        this.next = response.data.links.next;
      }).finally(()=>this.loading=false);
    },
    onScroll(e) {
      if (
          e.target.scrollingElement.scrollTop + 1000 >
          document.body.scrollHeight &&
          !!this.next
      ) {
        const next = this.next;
        this.next = null;
        this.loading =true;
        Axios.get(next).then((response) => {
          this.groups = this.groups.concat(response.data.results);
          this.next = response.data.links.next;
        }).finally(()=>this.loading=false);
      }
    },
    loadMore() {
      this.loading=true;
      Axios.get(this.next).then((response) => {
        this.groups = this.groups.concat(response.data.results);
        this.next = response.data.links.next;
      }).finally(()=>this.loading=false);
    }
  },
  mounted() {
    this.loading=true
    Axios.get("groups/public/?page=1&public=False&page_size=25").then(
        (response) => {
          this.groups = response.data.results;
          this.next = response.data.links.next;
        }
    ).finally(()=>this.loading=false);
  },
  watch: {
    pub() {
      this.loadGroups();
    },
    search() {
      clearTimeout(this.timeout);

      let self = this;
      this.timeout = setTimeout(function () {
        self.loadGroups();
      }, 500);
    },
  },
  computed:{
    ...mapGetters({
      isSuperUser: 'auth/isSuperUser',
    })
  }
};
</script>

<style scoped>
</style>