<template>
  <v-btn-toggle

      v-model="value"
      @change="updateParent"
      color="primary"
    mandatory
      >
    <v-btn
        v-for="item in items"
        :key="item.id"
        :value="item.value"
    >
      {{item.name}}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "CardCreateButtonGroup",
  props: ['items','selected'],
  data: () => ({
    value: '',

  }),
  updated: function(){
    // this.isLoading = true
    this.value = this.selected;
    // this.isLoading = false
  },
  methods: {
    updateParent(){
      this.$emit('inputData',this.value);
    }
  }
}
</script>

<style scoped>

</style>