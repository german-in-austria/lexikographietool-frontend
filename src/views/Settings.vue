<template>
  <v-container fluid>
    <div class="text-h5 py-1">Einstellungen</div>
    <v-form ref="registerForm" v-model="valid" lazy-validation>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
              solo-inverted
              flat
              readonly v-model="email" label="E-mail"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
              solo-inverted
              flat
              v-model="username"
              label="Benutzername"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field

              solo-inverted
              flat
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.min]"
              name="input-10-1"
              label="neues Passwort"
              hint="mindestens 8 Zeichen"
              counter
              @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field

              solo-inverted
              flat
              block
              v-model="verify"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.min, passwordMatch]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Passwort erneut eingeben"
              counter
              @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <div class="text-h7 py-1">Meine Orte</div>
          <settings-location-multiple
              v-model="locations"
              @inputFav="location = $event.value"
          ></settings-location-multiple>
        </v-col>

        <v-spacer></v-spacer>
        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
          <v-btn
              x-large
              block
              :disabled="!valid"
              color="success"
              @click.prevent="save()"
          >Speichern
          </v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-switch
              v-model="showSensitiveData"
              label="zeige mir sensible Wörter an"
          ></v-switch>
        </v-col>
      </v-row>
      <v-snackbar top :color="snackbarColor" v-model="snackbar" timeout="2000">{{ snackBarMessage }}</v-snackbar>
    </v-form>

  </v-container>
</template>

<script>
import axios from "axios";
import RequestHandler from "@/utils/RequestHandler";
import SettingsLocationMultiple from "../components/SettingsLocationMultiple.vue";
import {mapActions} from "vuex";

export default {
  name: "Settings",
  components: {SettingsLocationMultiple},
  data: () => ({
    valid: true,
    location: "",
    locations: [{name: ''}],
    age: 21,
    email: "",
    password: "",
    username: "",
    verify: "",
    show1: false,
    show2: false,
    showSensitiveData: false,
    snackbar: false,
    snackbarColor: "success",
    snackBarMessage: "Erfolgreich gespeichert",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || !v || "mindestens 8 Zeichen",
    },
  }),
  created() {
    axios.get("account/me/").then((response) => {
      this.username = response.data.username;
      this.email = response.data.email;
      this.location = response.data.home;
      this.locations = response.data.locations;
      this.locations = this.locations.map((val) => {
        return {value: val};
      });
      this.locations = [{value: this.location}].concat(this.locations);
      this.locations = this.locations.filter(
          (v, i, a) => a.findIndex((t) => t.value.id === v.value.id) === i
      );
      this.showSensitiveData = response.data.show_sensitive_words;
    });
  },

  computed: {
    passwordMatch() {
      return () =>
          this.password === this.verify || "Passwörter stimmen nicht überein";
    },
  },
  methods: {
    ...mapActions(
        {  setUser: 'auth/setUser'
        }
    ),
    async save() {
      if (this.$refs.registerForm.validate()) {

        const locs = this.locations.map(({value}) => value);
        var createdLocations = [];

        for (const location of locs) {
          var createdLocation = {data: location};
          if (createdLocation.data.id === "-1")
            createdLocation = await axios.post("location/", location);
          createdLocations.push(createdLocation.data);
        }

        this.location.id = String(this.location.id)

        RequestHandler.updateAccount({
          email: this.email,
          username: this.username,
          home: this.location,
          age: 18,
          locations: createdLocations,
          show_sensitive_words: this.showSensitiveData,
        }).then(() => {
          this.snackbarColor = "success"
          this.snackBarMessage = "gespeichert"
          this.snackbar = true
        }).catch((e) => {
          if (e.request.response.includes("account with this username already exists.")) {
            this.snackbarColor = "error"
            this.snackBarMessage = "Dieser Benutzername ist bereits vergeben."
            this.snackbar = true
          }

        });

        if (!!this.password && !!this.valid)
          RequestHandler.updatePassword({
            email: this.email,
            username: this.username,
            password: this.password,
            password2: this.verify,
          }).then(() => {
            this.snackbarColor = "success"
            this.snackBarMessage = "gespeichert"
            this.snackbar = true
          });
      }
    }
    ,
  },
  watch: {
    locations() {
      if (this.locations.length === 0)
        this.locations = [{value: {id: -1, zipcode: "", place: ""}}];
    }
    ,
  }
  ,
}
;
</script>

<style scoped>
</style>