<template>
  <div>
    <v-text-field v-model="collection.name" label="Sammlungsname"></v-text-field>
    <v-text-field v-model="collection.description" label="Beschreibung"></v-text-field>
    <v-text-field v-model="collection.organization" label="Organisation"></v-text-field>
   
    <card-create-add-category :model="collection.categories">  </card-create-add-category>
    <!-- <v-combobox
      v-model="collection.categories"
      label="Kategorien"
      item-text="category"
      :items="categoryList"
      multiple
      :return-object="false"
    ></v-combobox> -->
    <v-switch v-model="collection.pub" label="öffentlich"></v-switch>
    <v-switch
      v-model="collection.canAddLexemePublic"
      :disabled="!collection.pub"
      label="jeder kann Wörter zur Sammlung hinzufügen"
    ></v-switch>
    <v-switch
      v-model="collection.canRemoveLexemePublic"
      :disabled="!collection.pub"
      label="jeder kann Wörter aus der Sammlung entfernen"
    ></v-switch>

    <v-switch v-if="group"
      v-model="collection.canAddLexemeGroup"
      label="jedes Gruppenmitglied kann Wörter zur Sammlung hinzufügen"
    ></v-switch>
    <v-switch v-if="group"
      v-model="collection.canRemoveLexemeGroup"
      label="jedes Gruppenmitglied kann Wörter aus der Sammlung entfernen"
    ></v-switch>
  </div>
</template>
<script>

    import RequestHandler from '@/utils/RequestHandler'
import CardCreateAddCategory from './CardCreateAddCategory.vue';

export default {
  components: { CardCreateAddCategory },
  props: ["collection","group"],
  data: () => ({
    cat:{},
    description: "",
    categories: [],
    categoryList: [],
    organization: "",
    pub: false,
    canAddLexemePublic: false,
    canRemoveLexemePublic: false,
    canAddLexemeGroup: false,
    canRemoveLexemeGroup: false,
    name: "",
  }),
  mounted() {
    RequestHandler.searchCategories("").then(
      (response) => (this.categoryList = response.data)
    );
  },
};
</script>