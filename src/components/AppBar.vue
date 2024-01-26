<template>
<div style="position: sticky; top:0; z-index: 5;">
    <v-app-bar  flat height="90rem" >


      <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = true"
      ></v-app-bar-nav-icon>

      <template v-slot:img="{ props }">
        <v-img
            style="float: right"
            v-bind="props"
            :src="require('@/assets/colorPeople.png')"
            max-width="800px"
        ></v-img>
      </template>

      <v-img
          @click="$router.push('/lexemes')"

          class="clickable hidden-sm-and-down"
          :src="require('@/assets/IamDioeLogo.png')"
          alt="LOGO"
          contain
          height="100%"
          max-width="200px"
          style="background-color: rgb(255, 255, 255, 0.4)"
      ></v-img>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <p class="hidden-sm-and-down text-h3 logocolor--text font-weight-bold mt-2">WORTGUT</p>
      <v-spacer></v-spacer>

      <v-text-field
          label="Suche"
          class="pt-3 mr-2"
          outlined
          height="3vh"
          append-icon="mdi-send"
          dense
          v-model="search"
          style="width: 50%; max-width: 20rem"
          @click:append="doSearch"
          @keyup.enter="doSearch"
          background-color="rgb(255, 255, 255, 0.7)"
      ></v-text-field>
      <v-spacer></v-spacer>
      <div
          class="hidden-sm-and-down"
          v-if="!$vuetify.breakpoint.xs || !searchActive"
      >
        <v-btn-toggle color="primary"
                      dense v-if="authenticated" class="ml-2 mb-4">
          <v-btn to="/account">
            <span class="hidden-sm-and-down">{{ user.username }}</span>
            <v-icon :right="!$vuetify.breakpoint.xs">mdi-cog</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="signOut">mdi-logout</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn outlined v-else to="/login" class="mb-4">Login</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer disable-resize-watcher  v-model="drawer" app absolute   style="z-index: 999999 !important;">
      <v-list nav dense>
        <v-list-item-group
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/start">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Start</v-list-item-title>
          </v-list-item>
          <v-divider v-if="authenticated"></v-divider>

          <v-list-item to="/dashboard" v-if="authenticated">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard-variant-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Pinnwand</v-list-item-title>
          </v-list-item>
          <v-divider ></v-divider>

          <v-list-item to="/highscore">
            <v-list-item-icon>
              <v-icon> mdi-chart-line
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Bestenliste</v-list-item-title>
          </v-list-item>
          <v-divider v-if="authenticated"></v-divider>
          <v-list-item to="/account" v-if="authenticated">
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Einstellungen</v-list-item-title>
          </v-list-item>
          <v-divider v-if="isSuperUser"></v-divider>
          <v-list-item v-if="isSuperUser" to="/reports">
            <v-list-item-icon>
              <v-badge overlap color="error" :value="!!amountReports" :content="amountReports">
                <v-icon>mdi-alert-decagram</v-icon>
              </v-badge>
            </v-list-item-icon>
            <v-list-item-title>Meldungen</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="isSuperUser" to="/faq">
            <v-list-item-icon>
                <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Hilfe</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>


        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2 mb-15 pb-10">

          <v-btn block  color="primary" v-if="!authenticated" to="/login">
              <v-icon>mdi-login</v-icon>
            Einloggen
          </v-btn>
          <v-btn block  color="error" v-if="authenticated" @click="signOut">
            <v-icon>mdi-logout</v-icon>
            Abmelden
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AppBar",

  data: () => ({
    drawer: false,
    search: "",
    searchActive: false,
  }),
  methods: {
    signOut() {
      this.signOutAction();
      this.$router.push("/")
    },
    ...mapActions({
      signOutAction: "auth/signOut",
    }),
    doSearch() {
      this.$router.push('/search/' + this.search)
      this.search = ''

    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      isSuperUser: "auth/isSuperUser",
      amountReports: "reports/amountReports"
    }),
  },
};
</script>

<style scoped>
</style>
