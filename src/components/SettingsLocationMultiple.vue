<template>
  <div>
    <v-radio-group v-model="favorite" mandatory>
      <v-row
        no-gutters
        v-for="(item, i) in items"
        :key="i"
        class="text-fields-row"
      >
        <v-radio :value="item"></v-radio>
        <v-col cols="6">
          {{ item.value.name }}
        </v-col>
        <v-col
          ><v-icon @click="remove(i)" class="mt-7">mdi-delete</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <input-field-location v-model="newLoc"></input-field-location
        ><v-btn @click="addLine">zusätzlichen Ort hinzufügen</v-btn>
      </v-row>
    </v-radio-group>
  </div>
</template>
<script>
import InputFieldLocation from "./InputFieldLocation.vue";

export default {
  name: "SettignsLocationMultiple",
  props: ["value", "label"],
  components: { InputFieldLocation },
  data: () => ({
    favorite:null,
    newLoc: { name: "" },
  }),
  methods: {
    addLine() {
      this.value.push({ value: this.newLoc });
      this.newLoc = { name: "" };
    },
    remove(index) {
      this.items.splice(index, 1);
    },
  },
  computed: {
    items() {
      if (this.value.length === 0)
        return [{ value: { id: -1, zipcode: "", place: "" } }];
      return this.value;
    },
  },
  watch: {
    favorite() {
      this.$emit("inputFav", this.favorite);
    },
  },
};
</script>