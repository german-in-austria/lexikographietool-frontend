<template>
  <div>
    <v-col>
      <v-row>
        <v-combobox

            v-model="value"
            :items="items"
            item-text="word"
            label="Hauptlexem"
            hide-no-data

            menu-props="closeOnClick"
            :return-object="false"
            :search-input.sync="load"
            :loading="isLoading"
            @change="loadLexeme"
            @keyup.enter="loadLexeme"
            append-icon=""
            :rules="rules"
            required
        >


        </v-combobox>
      </v-row>
    </v-col>

  </div>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";

export default {
  name: "CardCreateLexem",
  data: () => ({
    isLoading: false,
    items: [],
    load: null,
    value: null
  }),
  props: ['rules'],
  watch: {
    load() {
      this.$emit('inputData', this.load);
      if (this.load.length != 1) return

      this.isLoading = true


      RequestHandler.searchLexemesByWord(this.load).then(response => (
          this.items = response.data
      )).catch(err => {
      })
          .finally(() => (this.isLoading = false))
    },
  },
  methods: {
    loadLexeme() {
      this.$emit('inputData', this.value);
      this.$emit('loadLexeme', this.value)
    }
  }
}
</script>

<style scoped>

</style>