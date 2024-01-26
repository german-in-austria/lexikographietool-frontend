<template>
  <v-row>
    <v-col>
      <v-subheader>Ort</v-subheader>
      <v-autocomplete
        solo
        flat
        v-model="value.place"
        :items="items"
        :loading="isLoading"
        hide-no-data
        hide-selected
        item-text="place"
        label="Ort"
        return-object
        :search-input.sync="searchplace"
        @change="change(value.place)"
        append-icon=""
        :rules="[(v) => !!v || 'Ort muss angegeben werde']"
        required
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-subheader>Plz</v-subheader>
      <v-autocomplete
        solo
        flat
        v-model="value.zipcode"
        :items="items"
        :loading="isLoading"
        hide-no-data
        hide-selected
        :search-input.sync="searchzip"
        item-text="zipcode"
        append-icon=""
        label="Plz"
        return-object
        @change="change(value.zipcode)"
        :rules="[(v) => !!v || 'Ort muss angegeben werde']"
        required
      ></v-autocomplete>
    </v-col>
    <v-col cols="auto" class="mt-4">
      <slot name="append"></slot>
    </v-col>
  </v-row>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";
import axios from "axios";

export default {
  name: "InputLocation",
  props: ["value", "loadHome"],
  data: () => ({
    items: [],
    isLoading: false,
    zipcode: "",
    searchplace: "",
    searchzip: "",
  }),
  methods: {
    change(obj) {
      if (typeof obj == "object") {
        this.value.zipcode = obj.zipcode;
        this.value.place = obj.place;
        this.value.id = obj.id;
      } else this.value.id = -1;
    },
    reload: function (search) {
      //Lazily load input items
      axios
        .get("/origin/" + search + "/")
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res;
        })
        .catch((err) => {
        })
        .finally(() => (this.isLoading = false));
    },
    updateParent: function () {
      this.$emit("inputData", this.zip);
    },
  },
  watch: {
    searchplace() {
      // Items have already been loaded
      if (this.searchplace == null) return;

      if (this.searchplace.length <= 1) {
        this.items = [];
        return;
      }
      if (this.searchplace.length > 2) return;
      this.isLoading = true;
      axios
        .get("/locations/?place=" + this.searchplace)
        .then((response) => (this.items = response.data))
        .finally(() => (this.isLoading = false));
      this.isLoading = true;
    },
    searchzip() {
      // Items have already been loaded
      if (this.searchzip == null) return;
      if (this.searchzip.length != 1) return;

      this.isLoading = true;
      axios
        .get("/locations/?zip=" + this.searchzip)
        .then((response) => (this.items = response.data))
        .finally(() => (this.isLoading = false));
      this.isLoading = true;
    },
  },
  created() {
    this.items = [this.value];
    if (this.loadHome)
      RequestHandler.getHome().then((response) => {
        this.items = [response.data];
        this.value.zipcode = response.data.zipcode;
        this.value.place = response.data.place;
        this.value.id = response.data.id;
      });
  },
};
</script>

<style scoped>
</style>