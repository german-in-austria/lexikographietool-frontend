<template>
  <v-dialog v-model="dialog" persistent max-width="30rem" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        {{ $t("general.settings") }}</v-list-item
      >
    </template>
    <v-card>
      <v-card-title class="headline">
        Einstellungen
        <v-spacer></v-spacer>
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <collection-properties-form
          :collection="col"
          :group="!!collection.group"
        ></collection-properties-form>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="dialog = false"> Verwerfen </v-btn>
        <v-btn text @click="update"> Änderungen speichern </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import CollectionPropertiesForm from "./CollectionPropertiesForm.vue";

export default {
  components: { CollectionPropertiesForm },
  name: "CollectionSettingsDialog",
  props: ["collection"],
  data: function () {
    return {
      dialog: false,
      col: { categories: {} },
    };
  },
  watch: {
    dialog(visible) {
      if (visible) {
        this.col.name = this.collection.name;
        this.col.description = this.collection.description;
        this.col.pub = this.collection.public;
        this.col.organization = this.collection.organization;
        this.col.categories = {
          value: this.collection.categories.map((x) => {
            return { category: x };
          }),
        };
        this.col.canAddLexemePublic = this.collection.can_add_lexemes_public;
        this.col.canRemoveLexemePublic = this.collection.can_remove_lexemes_public;
        this.col.canAddLexemeGroup = this.collection.can_add_lexemes_group;
        this.col.canRemoveLexemeGroup = this.collection.can_remove_lexemes_group;
        this.col.group = this.collection.group;
      }
    },
  },
  methods: {
    async update() {
      var categories = this.col.categories.value.map((x) => {
        return x.category;
      });

      for (const item of categories) {
        await axios.post("category_create/", { category: item });
      }
      axios
        .put("collection/" + this.collection.id + "/", {
          id: this.collection.id,
          name: this.col.name,
          description: this.col.description,
          organization: this.col.organization,
          public: this.col.pub,
          categories: categories,
          can_add_lexemes_group: this.col.canAddLexemeGroup,
          can_remove_lexemes_group: this.col.canRemoveLexemeGroup,
          can_add_lexemes_public: this.col.canAddLexemePublic,
          can_remove_lexemes_public: this.col.canRemoveLexemePublic,
        })
        .then(() => {
          this.collection.name = this.col.name;
          this.collection.description = this.col.description;
          this.collection.categories = categories;
          this.collection.public = this.col.pub;
          this.collection.organization = this.col.organization;
          this.collection.can_add_lexemes_group = this.col.canAddLexemeGroup;
          this.collection.can_remove_lexemes_group = this.col.canRemoveLexemeGroup;
          this.collection.can_add_lexemes_public = this.col.canAddLexemePublic;
          this.collection.can_remove_lexemes_public = this.col.canRemoveLexemePublic;
          this.dialog = false;
        });
    },
  },
};
</script>

<style scoped>
</style>