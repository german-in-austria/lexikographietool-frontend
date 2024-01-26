<template>
  <v-dialog v-model="dialog" scrollable max-width="70vh">
    <template v-slot:activator="{ on: dialog , attrs }">
      <v-tooltip bottom max-width="40vh">
        <template v-slot:activator="{ on : tooltip }">
          <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...dialog }" v-on:click.prevent="load()">
            <v-icon>mdi-file-plus-outline</v-icon></v-btn
          >
        </template>
        {{ $t("card.addToCollectionToolTip") }}
      </v-tooltip>
    </template>
    <v-card height="80vh">
      <v-card-title>{{ $t("card.myCollections") }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-group
            :value="false"
            no-action
            sub-group
            v-for="(group) in groups"
            :key="group.id"
            v-model="group.active"
            ><template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  >{{ group.name }}</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="collection in group.collections"
              :key="collection.id"
              link
            >
              <v-list-item-title v-text="collection.name"></v-list-item-title>

              <v-list-item-icon>
                <v-icon
                  v-if="collection.in_collection"
                  @click="removeFromCollection(collection)"
                  >mdi-delete</v-icon
                >
                <v-icon v-else @click="add(collection)">mdi-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";
import axios from "axios";

export default {
  name: "CollectionAddLexeme",
  props: ["cardId"],
  data: () => ({
    dialog: false,
    groups: [],
  }),
  methods: {
    load() {
      RequestHandler.getGroupsWithCollections(this.cardId).then((response) => {
        this.groups = response.data;
        this.groups[0].active = true;
      });
    },
    add(collection) {
      collection.in_collection = true;
      RequestHandler.addLexemeToCollection(collection.id, this.cardId);
    },

    removeFromCollection(collection) {
      axios.delete(`collection/${collection.id}/${this.cardId}/`).then(() => {
        collection.in_collection = false;
      });
    },
  },
};
</script>

<style scoped>
</style>