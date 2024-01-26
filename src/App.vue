<template>

  <Main ></Main>
</template>

<script>

// import 'vuetify/dist/vuetify.min.css'

import Main from "@/views/Main";
import axios from "axios";
import {mapActions} from "vuex";
import {mapGetters} from "vuex";

export default {
  components: {Main},
  name: 'App',
  mounted() {
    process.env.BABEL_DISABLE_CACHE = 1;
    if(this.isSuperUser){
      axios.get("reports/amount/").then(response => this.setAmountReports(response.data))
    }
    if(this.authenticated){
      axios.get("notifications/").then(response => this.setNotifications(response.data))
    }
  },
  methods:{
    ...mapActions({
      setAmountReports: 'reports/setAmountReports',
      setNotifications: "notifications/setNotifications"
    })
  },
  computed:{
    ...mapGetters({
      isSuperUser: 'auth/isSuperUser',
      authenticated: "auth/authenticated"
    })
  },
  watch:{
    isSuperUser(){
      if(this.isSuperUser){
        axios.get("reports/amount/").then(response => this.setAmountReports(response.data))
      }
    }
  }
}
</script>

<style>
p {
  text-align: justify;
}




</style>