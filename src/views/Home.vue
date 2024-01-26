<template>
  <v-container fluid>
    <div v-if="authenticated">
      <home-logged-in></home-logged-in>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="9">
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="card in cards" :key="card.id">
              <CardDialect :card="card" class="ma-0"></CardDialect>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <home-post-column style="height: 68vh"></home-post-column>
        </v-col>
      </v-row>

    </div>
  </v-container>
</template>

<script>
import CardDialect from "@/components/CardDialect";
import RequestHandler from "@/utils/RequestHandler";
import {mapGetters} from "vuex";
import HomeLoggedIn from "./HomeLoggedIn.vue";
import HomePostColumn from "@/components/HomePostColumn";

export default {
  name: "Home",
  components: {HomePostColumn, CardDialect, HomeLoggedIn},
  data: () => ({
    cards: [],
  }),

  beforeRouteEnter(to, from, next) {
    RequestHandler.getCards().then((response) =>
        next((vm) => {
          vm.cards = response.data;
        })
    );
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
};
</script>

<style scoped>
.ps {
  height: 81vh;
}
</style>