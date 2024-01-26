<template>
  <v-container class="px-15" fluid>
    <p class="error-message" v-if="this.$route.query.nextUrl">{{$t("login.notAuhtenticated")}}</p>
    <v-tabs v-model="tab" icons-and-text grow>
      <v-tab v-for="i in tabs" :key="i.name">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" >
      <v-tab-item key="Login">
        <v-card class="px-4">
          <v-card-text>
            <v-form
              ref="loginForm"
              @submit="login"
              v-model="valid"
              lazy-validation
              onsubmit="return false"
            >
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginEmail"
                    :rules="loginEmailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginPassword"
                    :append-icon="show1 ? 'eye' : 'eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Passwort"
                    hint="Passwort braucht mindestens 8 Zeichen"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                <v-spacer></v-spacer>
              <v-col><reset-password-dialog></reset-password-dialog></v-col>
                <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                  <v-btn
                    x-large
                    block
                    :disabled="!valid"
                    color="success"
                    type="submit"
                  >
                    Login</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item key="Register">
        <v-card class="px-4" flat>
          <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    hint="wird benötigt damit das Passwort zurückgesetzt werden kann."
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    :rules="[rules.required]"
                    label="Benutzername"
                    required
                    hint="ist öffentlich sichtbar"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <input-field-location
                    v-model="location"
                  ></input-field-location>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Passwort"
                    hint="mindestens 8 Zeichen"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    block
                    v-model="verify"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, passwordMatch]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Passwort erneut eingeben"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-checkbox v-model="dataprotection"
                  
                    :rules="[rules.required]">
                    <template v-slot:label><p>Ich habe die <data-protection-dialog></data-protection-dialog> gelesen und akzeptiere sie.</p></template></v-checkbox
                  >
                  
                </v-col>

                <v-spacer></v-spacer>
                <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                  <v-btn
                    x-large
                    block
                    :disabled="!valid"
                    color="success"
                    @click="register"
                    >Registrieren</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar
      v-model="snackbarSuccessful"
      :timeout="2000"
      color="success"
      top
    >
      {{ successMessage }}
    </v-snackbar>

    <v-snackbar v-model="snackbarFailure" :timeout="2000" color="error" top>
      {{ failureMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import Login from "@/objects/Login";
import Register from "@/objects/Register";
import { mapActions } from "vuex";
import InputFieldLocation from "../components/InputFieldLocation.vue";
import DataProtectionDialog from "../components/DataProtectionDialog.vue";
import axios from "axios";
import ResetPasswordDialog from '../components/ResetPasswordDialog.vue';

export default {
  components: { InputFieldLocation, DataProtectionDialog,
    ResetPasswordDialog },
  data: () => ({
    successMessage: "Erfolgreich",
    dataprotection:false,
    snackbarSuccessful: false,
    snackbarFailure: false,
    failureMessage: "Fehler!",
    dialog: false,
    tab: null,
    tabs: [
      { name: "Login", icon: "mdi-account" },

      { name: "Registrieren", icon: "mdi-account-outline" },
    ],
    valid: true,
    age: 21,
    email: "",
    password: "",
    username: "",
    verify: "",
    location: { name: "" },
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "wird benötigt",
      (v) => /.+@.+\..+/.test(v) || "E-mail ist ungültig",
    ],
    emailRules: [
      (v) => !!v || "wird benötigt",
      (v) => /.+@.+\..+/.test(v) || "E-mail ist ungültig",
    ],
    show1: false,
    rules: {
      required: (value) => !!value || "wird benötigt",
      min: (v) => (v && v.length >= 8) || "mindestens 8 Zeichen",
    },
  }),
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.verify || "Passwörter stimmen nicht überein";
    },
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        //
        //
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      if (this.$refs.loginForm.validate()) {
        this.signIn(new Login(this.loginEmail.toLowerCase(), this.loginPassword))
          .then(() => {
            if (this.$route.query.nextUrl)
              this.$router.push(this.$route.query.nextUrl);
            else this.$router.push("/");
          })
          .catch(() => {
            this.failureMessage = "Benutzername oder Passwort stimmen nicht!";
            this.snackbarFailure = true;
          });
      }
    },
    async register() {
      if (this.$refs.registerForm.validate()) {
        //first create new location, then register
        try {
          let location = await axios.post("location/", this.location);

          this.signUp(
            new Register(
              this.username,
              this.email.toLowerCase(),
              this.password,
              this.password,
              location.data.id,
              this.age
            )
          );
          if (this.$route.query.nextUrl)
            this.$router.push(this.$route.query.nextUrl);
          else this.$router.push("/start");
        } catch {
          this.failureMessage = "Benutzername oder Passwort stimmen nicht!";
          this.snackbarFailure = true;
        }
      }
    },
    ...mapActions({
      signIn: "auth/signIn",
      signUp: "auth/register",
    }),
    updateParent: function () {
      this.$emit("inputData", this.zip);
    },
  },

};
</script>

<style scoped>
.error-message{
  border-radius: 10px;
  border: thin solid red;
  padding: 7px;

}
</style>