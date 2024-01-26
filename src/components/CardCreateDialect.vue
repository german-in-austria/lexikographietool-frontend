<template><div>
  <v-col><v-row>
    <v-combobox
  v-model="value"
  :items="items"
  :disabled="disabled"
  item-text="dialect"
  label="Welcher Dialekt is das?"
  hide-no-data

  menu-props="closeOnClick"
  :return-object="false"
  :search-input.sync="load"
  :loading="isLoading"
  append-icon=""
  :required = "!disabled"
  :rules="[v => !!v || disabled || 'Dialekt muss angeführt werden']"


    >


  </v-combobox>
  </v-row>
  </v-col>

</div>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";
export default {
name: "CardCreateDialect",
  data : () =>({
    isLoading: false,
    items: [],
    load: null,
    value: null,
  }),
  props:['disabled'],
  watch: {
    load () {
      this.$emit('inputData',this.load);
      if (this.load.length != 1) return

      this.isLoading = true


      RequestHandler.searchDialects(this.load).then(response => (
          this.items = response.data
      )).catch(err => {
      })
          .finally(() => (this.isLoading = false))
    },
  },
  methods: {
  loadLexeme() {
    this.$emit('inputData',this.value);
    this.$emit('loadLexeme', this.value)
  }
  }
}
</script>

<style scoped>

</style>