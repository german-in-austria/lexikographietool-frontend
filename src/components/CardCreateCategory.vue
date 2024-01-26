<template><div>
  <v-combobox
  v-model="value"
  :items="items"
  :return-object="false"
  item-text="category"
  label="Kategorie"
  hide-no-data
  :search-input.sync="load"
  :loading="isLoading"
  multiple
  chips
  loaderHeight=10
  @change="updateParent"
  append-icon=""

  >


  </v-combobox>
</div>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";

export default {
name: "CardCreateCategory",
  data : () =>({
    isLoading: false,
    load: null,
    value: null,
    items: []
  }),
  props: ['selected'],
  updated: function(){
    // this.isLoading = true
    this.value = this.selected;
    // this.isLoading = false
  },
  methods:{
    updateParent(){
      this.$emit('inputData',this.value)
    }
  },
  watch: {
    load () {
      if (this.load.length != 1) return
      this.isLoading = true
      RequestHandler.searchCategories(this.load).then(response => (
          this.items = response.data
      )).catch(err => {
      })
          .finally(() => (this.isLoading = false))
    },
  },
}
</script>

<style scoped>

</style>