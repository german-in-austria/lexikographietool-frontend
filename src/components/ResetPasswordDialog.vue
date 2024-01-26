<template>
  <v-dialog v-model="dialog" max-width="40rem" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on" class="error--text">Passwort zurücksetzen</a>
    </template>
    <v-card>
      <v-card-title>Passwort zurücksetzen</v-card-title>
      <v-card-text>
        <p>
          Gib bitte deine e-mail Adresse ein. Dein neues Passwort wird dir per
          Mail zugesendet.
        </p>
        <v-text-field v-model="email" label="e-mail"></v-text-field>
        <v-btn @click="reset">zurücksetzen</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    email: "",
  }),
  methods: {
    reset() {
      if (this.email)
        axios.post("account/resetpassword/", { email: this.email }).then(() => {
          this.dialog = false;
          this.email=''
        });
    },
  },
};
</script>