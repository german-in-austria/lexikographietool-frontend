<template>
  <div >
    <slot :dialog="dialog">

    <v-hover v-slot="{ hover }">
      <v-card
        @click.prevent="dialog.dialog = true"
        :elevation="hover ? 4 : 0"
        class="mx-auto"
        outlined
      >
        <v-card-actions class="justify-center"
          ><v-icon
            size="48
"
            >mdi-plus</v-icon
          ></v-card-actions
        >
      </v-card>

    </v-hover>
    </slot>

    <v-dialog v-model="dialog.dialog" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Neue Sammlung</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <collection-properties-form
          :group="group"
            :collection="collection"
          ></collection-properties-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="createCollection"
            >erstellen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
import CollectionPropertiesForm from "./CollectionPropertiesForm.vue";
import Axios from "axios";

export default {
  components: { CollectionPropertiesForm },
  name: "CollectionCreateButton",
  props: ["organization",'group'],
  data: () => ({
    dialog: {dialog:false},
    collectionTitle: "",
    collectionDescription: "",
    collectionCategories: [],
    collOrg: null,

    collection: {
      name: "",
      description: "",
      organization: "",
      categories: {value:[]},
      pub: false,
      canAddLexemePublic: false,
      canRemoveLexemePublic: false,
      canAddLexemeGroup: true,
      canRemoveLexemeGroup: false,
    },
  }),
  methods: {
    async createCollection() {
      var categories = this.collection.categories.value.map(x =>{ return x.category})

      for (const item of categories) {
           await Axios.post("category_create/",{category:item})
        }
      Axios.post("collection/", {
        name: this.collection.name,
        description: this.collection.description,
        organization: this.collection.organization,
        public: this.collection.pub,
        categories: categories,
        can_add_lexemes_group: this.collection.canAddLexemeGroup,
        can_remove_lexemes_group: this.collection.canRemoveLexemeGroup,
        can_add_lexemes_public: this.collection.canAddLexemePublic,
        can_remove_lexemes_public: this.collection.canRemoveLexemePublic,
      }).then((response) => {
        this.$emit("created", response.data);
        this.dialog.dialog = false;
        this.collectionTitle = "";
      });
    },
  },
  computed: {
    collectionOrganization: {
      get: function () {
        return this.collOrg || this.organization || "";
      },
      set: function (newValue) {
        this.collOrg = newValue;
      },
    },
  },
};
</script>