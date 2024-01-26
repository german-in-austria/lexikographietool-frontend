<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <p class="text-h4">{{ $t("highscore.title") }}</p>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>Insgesamt</v-card-title>
          <v-simple-table v-if="highscore.results">
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Position
                </th>
                <th class="text-left">
                  Benutzer
                </th>
                <th class="text-left">
                  angelegte Begriffe
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item,index) in highscore.results"
                  :key="item.name"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <router-link :to="'/account/' + item.username" class="text-decoration-none">{{
                      item.username
                    }}
                  </router-link>
                </td>
                <td>{{ item.count }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center" v-if="highscore.total_pages > 1">
            <v-pagination
                v-model="highscorePage"
                :length="highscore.total_pages"
                :total-visible="5"
                circle
            ></v-pagination>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined>
          <v-card-title>In den letzten zwei Wochen</v-card-title>
          <v-simple-table v-if="highscoreLastTwoWeeks.results">
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Position
                </th>
                <th class="text-left">
                  Benutzer
                </th>
                <th class="text-left">
                  angelegte Begriffe
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item,index) in highscoreLastTwoWeeks.results"
                  :key="item.name"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <router-link :to="'/account/' + item.username" class="text-decoration-none">{{ item.username }}</router-link>

                </td>
                <td>{{ item.count }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center" v-if="highscoreLastTwoWeeks.total_pages > 1">
            <v-pagination
                v-model="highscoreLastTwoWeeksPage"
                :length="highscoreLastTwoWeeks.total_pages"
                :total-visible="5"
                circle
            ></v-pagination>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Highscore",
  data: () => ({
    highscore: {},
    highscorePage: 1,
    highscoreLastTwoWeeks: {},
    highscoreLastTwoWeeksPage: 1,

  }),
  mounted() {
    axios.get("highscore/").then(response => this.highscore = response.data)
    axios.get("highscore/?daysPast=14").then(response => this.highscoreLastTwoWeeks = response.data)
  },
  watch: {
    highscorePage() {
      axios.get("highscore/?page=" + this.highscorePage).then(response => this.highscore = response.data)
    },
    highscoreLastTwoWeeksPage() {
      axios.get("highscore/?daysPast=14&page=" + this.highscoreLastTwoWeeksPage).then(response => this.highscoreLastTwoWeeks = response.data)
    }
  }
}
</script>

<style scoped>

</style>
