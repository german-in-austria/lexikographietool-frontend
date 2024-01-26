<template>
  <v-dialog v-model="dialog" scrollable max-width="60vh">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" >{{$t("general.trash")}}</v-list-item>
    </template>
    <v-card height="80vh">
      <v-card-title>Papierkorb</v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item v-if="loading">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-list-item>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-icon @click="restore(item, index)">mdi-plus</v-icon>
            <span class="font-aweight-bold">{{ item.dialectWord }}</span>
            {{ item.name }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["itemId", "itemList", "group", "collection"],
  data: () => ({
    dialog: false,
    items: [],
    loading: true,
  }),
  watch: {
    dialog() {
      if (this.collection)
        axios
          .get("collections_deleted/")
          .then(
            (response) => ((this.items = response.data), (this.loading = false))
          );
      if (this.group)
        axios
          .get("groups_deleted/")
          .then(
            (response) => ((this.items = response.data), (this.loading = false))
          );
    },
  },
  methods: {
    restore(item, index) {
      if (this.collection)
        axios.post("collection_restore/" + item.id + "/").then((response) => {
          this.itemList.push(response.data);
          this.items.splice(index, 1);
        });
      if (this.group)
        axios.post("group_restore/" + item.id + "/").then((response) => {
          this.itemList.push(response.data);
          this.items.splice(index, 1);
        });
    },
  },
};
</script>