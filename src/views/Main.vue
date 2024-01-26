<template>
  <v-app>
    <div class="dioe-nav">
      <ul>
        <li><a href="https://www.dioe.at/">SFB DiÖ</a></li>
        <li><a href="https://iam.dioe.at/">IamDiÖ</a></li>
        <li><a href="https://lex.dioe.at/" class="active">Wortgut</a></li>
      </ul>
    </div>

    <AppBar class="appbar"></AppBar>


    <!--        <div class="hidden-sm-and-down" style="position: sticky; top:50px; background-color: green ">-->
    <!--          <Navigation-->
    <!--              v-model="collapsedNav"-->

    <!--              style="position: absolute; top: 0;height: 200px; "-->
    <!--          ></Navigation>-->
    <!--        </div>-->
    <!--        <v-container-->
    <!--            style="min-height: 50rem"-->
    <!--            class="containerContent"-->
    <!--            :style="cssVars"-->
    <!--            fluid-->

    <!--        >-->
    <!--          <router-view :key="$route.fullPath"/>-->

    <!--        </v-container>-->

    <Navigation
        class="sidebar hidden-sm-and-down"
        v-model="collapsedNav"
    ></Navigation>
    <div class="containerContent"
                 :style="cssVars">
      <router-view :key="$route.fullPath"/>
      <notification-pop-up></notification-pop-up>

    </div>

    <Footer style="z-index: 4; position: relative"></Footer>

    <navigation-mobile style="z-index: 4;" class="hidden-md-and-up"></navigation-mobile>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import NavigationMobile from "@/components/NavigationMobile";
import AppBar from "@/components/AppBar";
import {mapGetters} from "vuex";
import Footer from "@/components/Footer";
import NotificationPopUp from "@/components/NotificationPopUp";

export default {
  components: {NotificationPopUp, Footer, AppBar, NavigationMobile, Navigation},
  data: () => ({
    collapsedNav: false
  }),
  computed: {

    ...mapGetters({
      authenticated: "auth/authenticated",
      notifications: "notifications/notifications"
    }),
    styleClass() {
      if (!this.collapsedNav) return "notcollapsed"
      return "collapsed"
    },
    cssVars() {
      if (this.$vuetify.breakpoint.smAndDown)
        return {'--margin-left': 0 + 'px', '--padding': 1 + 'rem','--margin-top': 0 + 'px','--margin-bottom': 5 + 'rem' }
      if (!this.collapsedNav) return {'--margin-left': 200 + 'px', '--padding': 2 + 'rem','--margin-top': -600 + 'px','--margin-bottom': 0+ 'rem'}
      return {'--margin-left': 70 + 'px', '--padding': 2 + 'rem','--margin-top': -600 + 'px','--margin-bottom': 0 + 'rem'}
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  overflow-y: auto;
  justify-content: space-between;

}



.sidebar {
  height: 600px;
  position: sticky;
  top: 80px;
}

.appbar {
  border-bottom: solid;
  border-bottom-color: lightgray;
  border-width: 1px;
}

.containerContent {
  width: auto;
  border-left: solid 1px lightgray;
  min-height: 120vh;
  margin-top: var(--margin-top);
  transition: all 0.2s;
  margin-left: var(--margin-left);
  margin-bottom: var(--margin-bottom);
  padding: var(--padding);
  padding-top: 2rem;


}

/* DiÖ Nav */
.dioe-nav {
  font-family: 'Lato', 'Open Sans', sans-serif !important;
  font-size: 16px;
  line-height: 2.1;
  background-color: #e2e2e2;
  position: relative;
  z-index: 1031;
}

.dioe-nav > ul {
  display: -ms-flexbox !important;
  display: flex !important;
  margin: 0 auto;
  max-width: 450px;
  list-style: none;
  padding: 0;
}

.dioe-nav > ul > li {
  -ms-flex: 1 1 auto !important;
  flex: 1 1 auto !important;
}

.dioe-nav > ul > li > a {
  display: block;
  position: relative;
  width: 100%;
  padding: 5px;
  font-weight: 400;
  text-align: center;
  color: #a7a7a7;
}

.dioe-nav > ul > li > a:hover, .dioe-nav > ul > li > a:focus {
  background: #a7a7a7;
  color: #fff;
  text-decoration: none;
}

.dioe-nav > ul > li > a.active::after {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  left: calc(50% - 8px);
  bottom: 0;
  height: 0;
  width: 0;
  background: transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff;
}

a:link {
  text-decoration: none;
}
</style>
