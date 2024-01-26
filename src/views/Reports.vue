<template>
  <v-container fluid>
    <v-row no-gutters>
      <span class="text-h3">{{ $t("reports.title") }}</span>
    </v-row>
    <v-row no-gutters class="pt-5">
      <v-tabs v-model="tabs">
        <v-tab>{{ $t("reports.tabTitle1") }}</v-tab>
        <v-tab>{{ $t("reports.tabTitle2") }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  {{ $t("reports.word") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.author") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.reportedFrom") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.reportetAt") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.message") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.edit") }}
                </th>
                <th></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in reportsLexeme"
                  :key="item.name"

                  :style="item.active  ? '': 'opacity: 30%'"
              >
                <td class="clickable" @click="$router.push('/lexeme/' + item.lexeme.id)">{{
                    item.lexeme.dialectWord
                  }}
                </td>
                <td>{{ item.reported_user }}</td>
                <td>{{ item.report_from }}</td>
                <td>{{ timeSince(item.date_created) }}</td>
                <td>{{ item.message }}</td>
                <td>
                  <lexeme-edit-dialog :lexeme="item.lexeme"></lexeme-edit-dialog>
                </td>
                <td v-if="!item.lexeme.deleted_at">
                  <v-btn color="error" @click="deleteWord(item.lexeme)">Wort Löschen</v-btn>
                </td>
                <td v-else>
                  <p class="ma-0 error--text">Wort ist gelöscht</p>
                  <p @click="restoreWord(item.lexeme)" class="clickable ma-0 success--text">wiederherstellen</p>
                </td>
                <td v-if="item.active & item.already_changed">Vorsicht! Wort wurde zwischenzeitlich geändert</td>
                <td>
                  <v-btn small outlined @click.stop="deactivateLexemeReport(item)">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <v-tab-item>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  {{ $t("reports.post") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.author") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.reportedFrom") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.reportetAt") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.message") }}
                </th>
                <th class="text-left">
                  {{ $t("reports.edit") }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in reportsPost"
                  :key="item.name"
                  :style="item.active  ? '': 'opacity: 30%'"
              >
                <td>{{ item.post.text }}</td>
                <td>{{item.reported_user}}</td>
                <td>{{ item.report_from }}</td>
                <td>{{ timeSince(item.date_created) }}</td>
                <td>{{ item.message }}</td>
                <td>
                  <v-btn @click="deletePost(item)">Post löschen</v-btn>
                </td>
                <td v-if="item.active & item.already_changed">Vorsicht! Wort wurde zwischenzeitlich geändert</td>
                <td>
                  <v-btn small outlined @click.stop="deactivatePostReport(item)">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
import LexemeEditDialog from "@/components/LexemeEditDialog";
import axios from "axios";
import moment from "moment";
import {mapActions} from "vuex";

export default {
  name: "Reports",
  components: {LexemeEditDialog},
  data: () => ({
    reportsLexeme: [],
    reportsPost: [],
    tabs: null,
  }),
  mounted() {
    Axios.get('reports/lexeme/?ordering=-active,-date_created').then(response => {
      this.reportsLexeme = response.data.results
    })

    Axios.get('reports/post/?ordering=-active,-date_created').then(response => {
      this.reportsPost = response.data.results
    })
  },
  methods: {
    ...mapActions({
      updateAmountReports: "reports/updateAmountReports"
}),
    deleteWord(lexeme){
      axios.delete("lexeme/" + lexeme.id + "/").then(()=>lexeme.deleted_at='asd');
    },
    restoreWord(lexeme){
      axios.post("restore/" + lexeme.id + "/").then(()=>lexeme.deleted_at = null);
    },
    deactivateLexemeReport(report) {
      Axios.put('report/lexeme/deactivate/' + report.id + '/').then(() => {
        report.active = !report.active
        this.updateAmountReports(report.active)
      })
    },
    deactivatePostReport(report) {
      Axios.put('report/post/deactivate/' + report.id + '/').then(() => {
        report.active = !report.active
        this.updateAmountReports(report.active)
      })
    },
    deletePost(report) {
      axios.delete('post/' + report.post.id + '/').then(() => this.deactivatePostReport(report))
    },
    timeSince(timecode) {
      moment.locale('de');
      return moment(timecode).fromNow()
    }
  }
}
</script>

<style scoped>

</style>