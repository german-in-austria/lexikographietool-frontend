<template>
  <div>
    <v-combobox
        solo
        flat
        v-model="model.value"
        :items="items"
        :search-input.sync="search"
        item-text="name"
        hide-selected
        :label="$t('card_create.chooseCollection')"
        append-icon=""
        multiple
        small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">{{ $t('card_create.createCollection') }}</span>
          <v-chip
              label
              small
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
            v-if="item === Object(item)"
            v-bind="attrs"
            :input-value="selected"
            label
            small
            color="primary"
        >
          <span class="pr-2">
            {{ item.name }}
          </span>
          <v-icon
              small
              @click="parent.selectItem(item)"
          >
            mdi-close
          </v-icon>
        </v-chip>

      </template>

    </v-combobox>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CardCreateAddCollection",
  props: ['model'],
  data: () => ({
    items: [],
    search: null,
  }),
  mounted() {
    axios.get('collections/owner/').then(response => this.items = response.data)
  },
  watch: {
    search() {
      const a= 0
      if( a==1)
        return
      if (!this.search) {
        axios.get('collections/owner/').then(response => this.items = response.data)
      } else
        axios.get(
            "/collections/?search=" +
            this.search).then(response => this.items = response.data.results)
    },
    'model.value': function(val, prev) {


        if (val.length === prev.length) return

        this.model.value = val.map(v => {
          if (!!v & typeof v === 'string') {
            v = {
              name: v,
            }

            this.items.push(v)
          }
          return v
        })
        this.search = '';
      },
  }
}
</script>

<style scoped>

</style>