<template>

  <v-sheet  style="z-index: 4;  transition: width 0.2s; " :width=width>
    <v-list color="transparent" class="mt-8 pa-2">
      <v-list-item @click="collapsed = !collapsed; $emit('input',collapsed)">
        <v-icon v-if="!collapsed">mdi-chevron-left</v-icon>
        <v-icon v-else>mdi-chevron-right</v-icon>
      </v-list-item>
      <NavigationListItem link="/Start" icon="mdi-home-outline" name="Start"></NavigationListItem>
      <v-divider></v-divider>

      <NavigationListItem link="/Lexemes" icon="mdi-sofa-outline" name="Wörter"></NavigationListItem>
      <v-divider v-if="authenticated"></v-divider>
      <NavigationListItem v-if="authenticated" link="/dashboard" icon="mdi-view-dashboard-variant-outline"
                          name="Pinnwand"></NavigationListItem>
      <v-divider v-if="authenticated"></v-divider>
      <NavigationListItem v-if="authenticated" link="/collections" icon="mdi-file-multiple-outline"
                          name="Sammlungen"></NavigationListItem>
      <v-divider v-if="authenticated"></v-divider>

      <NavigationListItem v-if="authenticated" link="/groups" icon="mdi-account-group-outline"
                          name="Gruppen"></NavigationListItem>

      <v-divider v-if="authenticated"></v-divider>

      <NavigationListItem v-if="authenticated" link="/postings" icon="mdi-chat-processing-outline"
                          name="Fragen"></NavigationListItem>
      <v-divider v-if="authenticated"></v-divider>

      <NavigationListItem v-if="authenticated" link="/card-create" icon="mdi-plus"
                          name="Wort erstellen"></NavigationListItem>
      <v-divider></v-divider>
      <NavigationListItem link="/highscore" icon="mdi-chart-line"
                          name="Bestenliste"></NavigationListItem>
      <v-divider v-if="isSuperUser"></v-divider>
      <NavigationListItem :badge-content="amountReports" v-if="isSuperUser" link="/reports" icon="mdi-alert-decagram"
                          name="Meldungen"></NavigationListItem>
      <v-divider></v-divider>
      <NavigationListItem link="/faq" icon="mdi-help-circle-outline"
                          name="Hilfe"></NavigationListItem>
      <v-divider></v-divider>


    </v-list>
  </v-sheet>
</template>

<script>
import {mapGetters} from 'vuex';
import NavigationListItem from "@/components/NavigationListItem";


export default {
  name: "Navigation",
  components: {NavigationListItem},
  data: () => ({
    collapsed: false,
  }),
  computed: {
    ...mapGetters(
        {
          authenticated: 'auth/authenticated',
          isSuperUser: 'auth/isSuperUser',
          amountReports: 'reports/amountReports'
        }),
    width() {
      if (this.collapsed)
        return "70px"
      return "200px"
    }
  },

}
</script>

<style scoped>

</style>