<template>
  <v-dialog v-model="dialog" scrollable max-width="90vh">
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on"> Datenschutzrichtlinien </a>
    </template>
    <v-card height="80vh">
      <v-card-text
        ><data-protection-content></data-protection-content
      ></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import DataProtectionContent from "./DataProtectionContent.vue";
export default {
  components: { DataProtectionContent },
};
</script>