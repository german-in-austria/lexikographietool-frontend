<template>
    <v-dialog v-model="dialog" max-width="40rem" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <slot name="activator">
          <v-list-item v-bind="attrs" v-on.native.stop="on" text
          >{{ $t("reportDialog.report") }}
          </v-list-item>
        </slot>
      </template>
      <v-card>
        <v-card-title>{{ $t("reportDialog.title") }}</v-card-title>
        <v-card-text>
          <v-textarea v-model="reportMessage" required :label='$t("reportDialog.subtitle")'></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="report">{{ $t("reportDialog.report") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import Axios from "axios";

export default {
  name: "ReportDialog",
  props: {
    item: Object,
    button: Boolean,
    kind: {
      type: String,
      validator: (val) => ['lexeme', 'post'].includes(val)
    }
  },
  data: () => ({
    dialog: false,
    reportMessage: '',
  }),
  methods:
      {
        report() {
          Axios.post('report/' + this.kind + '/' + this.item.id + '/', {message: this.reportMessage}).then(() => {
            this.dialog = false;
            this.reportMessage = '';
          })
        }
      }
}
</script>

<style scoped>

</style>