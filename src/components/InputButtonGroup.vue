<template>
  <v-btn-toggle
      v-bind:value="value"
      @change="$emit('input',$event)"
      dense
  >
    <v-tooltip bottom max-width="30vh"  v-for="item in items"
               :key="item.id">

      <template v-slot:activator="{ on, attrs }">
    <v-btn


        :value="item.value"

        v-bind="attrs"

        v-on="on"
    >
      {{item.name}}

    </v-btn>
      </template>
        {{item.tooltip}}
  </v-tooltip>
  </v-btn-toggle>
</template>

<script>
export default {
name: "InputButtonGroup",
  props:['value','items'],
  data:()=>({
  }),
  computed:{
  buttonValue: function (){
    return this.value
  }
  }
}
</script>

<style scoped>

</style>