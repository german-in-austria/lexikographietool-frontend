<template>
  <div>
    <v-form autocomplete="off">
    <v-autocomplete
       autocomplete="off"
      :solo="solo"
      flat
      v-model="valueComp"
      :items="items"
      hide-no-data
      hide-selected
      item-text="name"
      label="Ort / Region"
      return-object
      :search-input.sync="search"
      @change="$emit('input', $event)"
      append-icon=""
      :rules="[(v) => !!v || 'Ort muss angegeben werde']"
      required
    >
      <template v-slot:item="{ item, attrs, on }">
        <v-list-item v-bind="attrs" v-on="on">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ item.state
              }}<span v-if="!!item.state && !!item.country">, </span
              >{{ item.country }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template></v-autocomplete
    ></v-form>
  </div>

</template>

<script>
import axios from "axios";
export default {
  props: ["value", "loadHome","solo"],
  data: () => ({
    search: "",
    items: [],
    timeout: null,
  }),
  watch: {
    search() {
      if (!this.search) {
        this.items = [];
        return;
      }
      clearTimeout(this.timeout);
      const self = this;
      this.timeout = setTimeout(function () {
        axios
          .get(
            "https://photon.komoot.io/api/?q=" +
              self.search +
              "&bbox=9,45.41,18,55&limit=4"
          )
          .then((response) => {
            self.items = response.data.features.map((x) => {
              return {
                id: "-1",
                name: x.properties.name,
                state: x.properties.state,
                country: x.properties.country,
                osm_id: x.properties.osm_id,
                osm_value: x.properties.osm_value,
                latitude: x.geometry.coordinates[1],
                longitude: x.geometry.coordinates[0],
              };
            });
          });
      }, 500);
    },
  },
  computed: {
    valueComp() {
      return this.value;
    },
  },
  created() {
    if (this.loadHome)
      axios.get("account/me/").then((response) => {
        this.items = response.data.locations.map((x) => {
          x.id = String(x.id);
          return x;
        });
        let value = response.data.home;
        value.id = String(value.id);
        this.items.push(value);

        this.$emit("input", response.data.home);
      });
    else {
      this.items = [this.valueComp]
    }
  },
};
</script>