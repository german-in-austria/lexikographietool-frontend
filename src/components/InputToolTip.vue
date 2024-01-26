<template>
  <v-tooltip v-model="show" bottom max-width="30vh" >
    <template v-slot:activator="{ on }">
      <v-icon small v-on="on" @click="!show"> mdi-help-circle-outline </v-icon>
    </template>
    {{tip}}
  </v-tooltip>
</template>

<script>
export default {
  props:['tip'],
  data:()=>({
    show:false
  })
}
</script>