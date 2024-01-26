<template>
  <v-row>
    <v-col cols="4">
      <v-combobox
          v-model="value.zipcode"
          :items="locations"
          item-text="zipcode"
          label="Postleitzahl"
          hide-no-data
          menu-props="closeOnClick"
          :return-object="true"
          append-icon=""
          :search-input.sync="searchzip"
          @change="change(value.zipcode)"

      ></v-combobox>
    </v-col>
    <v-col cols="4">
      <v-combobox
          v-model="value.place"
          :items="locations"
          item-text="place"
          label="Gemeinde"
          hide-no-data
          menu-props="closeOnClick"
          append-icon=""
          :search-input.sync="searchplace"
          @change="change(value.place)"

      ></v-combobox>
    </v-col>
    <v-col cols="4">
      <v-combobox
          v-model="value.state"
          :items="locations"
          item-text="state"
          label="Bundesland"
          hide-no-data
          menu-props="closeOnClick"
          append-icon=""
          @change="change(locState)"

      ></v-combobox>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "LocationComboBox",
  props: ['zip', 'place', 'state', 'value'],
  data: () => ({
    locations: [],
    searchplace: null,
    searchzip: null,
    newLocation: false,
  }),
  methods: {
    change(obj) {
      if (typeof obj == 'object') {
        this.value.zipcode = obj.zipcode
        this.value.place = obj.place
        this.value.state = obj.state
        this.value.id = obj.id
      } else
        this.value.id = -1
    },
    reload: function (search) {
      //Lazily load input items
      axios.get('origin/' + search + '/')
          .then(res => {
            this.locations = res.data
          })
          .catch(err => {
          })
          .finally(() => (this.isLoading = false))
    },
  },
  watch: {
    searchplace() {
      // Items have already been loaded
      if (this.searchplace.length <= 1) {
        this.items = []
        return
      }
      if (this.searchplace.length > 2) return
      this.isLoading = true
      this.reload(this.searchplace)

    }
    ,
    searchzip() {
      // Items have already been loaded
      if (this.searchzip.length != 1) return

      this.isLoading = true
      this.reload(this.searchzip)

    }
  }
}
</script>

<style scoped>

</style>