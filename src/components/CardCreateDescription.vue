<template><div>
  <v-col cols='1'><v-row>
    <v-combobox
  v-model="value"

  label="Beschreibung"
  hide-no-data

  menu-props="closeOnClick"
  :return-object="false"
  :search-input.sync="load"
  :loading="isLoading"
  append-icon=""
:rules="rules"
    >


  </v-combobox>
  </v-row>
  </v-col>

</div>
</template>

<script>
export default {
name: "CardCreateDescription",
  data : () =>({
    isLoading: false,
    items: [],
    load: null,
    value: null
  }),
  props:['rules'],
  watch: {
    load () {
      this.$emit('inputData',this.load);
      if (this.load.length != 1) return
    },
  }
}
</script>

<style scoped>

</style>