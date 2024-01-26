<template>
  <v-combobox
      v-model="value"
      :label="label"
      hide-no-data
      menu-props="closeOnClick"
      return-object
      multiple
      @change="updateParent"
      append-icon=""
      chips

  >

  </v-combobox>
</template>

<script>
export default {
  name: "CardCreateMultipleDropDown",
  props: {
    label: String,
  },
  data : () => ({
    value: null,
  }),
  methods:{
    updateParent(){
      this.$emit('inputData',this.value)
    }
  }
}
</script>

<style scoped>

</style>