<template>
  <v-footer padless>
    <v-card
        flat
        tile
        img="src/assets/mountains.png"
        max-width="100vw"
    >
      <div  :class="$vuetify.breakpoint.smAndDown ?  'mobile-footer-big-img ' :'' +'footer-big-img'">
        <!--        <v-img :class="$vuetify.breakpoint.smAndDown ?  'mobile-footer-big-img ' :'' +'footer-big-img'"-->
        <!--               min-width="5000px" position="bottom center"-->
        <!--               src="https://iam.dioe.at/fileadmin/img/mountains.png">-->
        <!--        </v-img>-->
        <div class="footer-logos">

          <a href="http://www.univie.ac.at/" target="_blank">
            <v-img class="footer-img" src="https://dioe.at/fileadmin/img/logos/uni-wien.png" contain
                   max-height="50px"></v-img>
          </a>
          <a href="https://www.uni-salzburg.at/" target="_blank">
            <v-img class="footer-img" src="https://iam.dioe.at/fileadmin/img/logos/uni-sbg.png" contain
                   max-height="50px"></v-img>
          </a>
          <a href="http://www.oeaw.ac.at/" target="_blank">
            <v-img class="footer-img" src="https://iam.dioe.at/fileadmin/img/logos/oeaw.png" contain
                   max-height="50px"></v-img>
          </a> <a href="https://www.fwf.ac.at/" target="_blank">
          <v-img class="footer-img" src="https://iam.dioe.at/fileadmin/img/logos/fwf.png" contain
                 max-height="50px"></v-img>
        </a> <a href="http://www.uni-graz.at/" target="_blank">
          <v-img class="footer-img" src="https://iam.dioe.at/fileadmin/img/logos/uni-graz.png" contain
                 max-height="50px"></v-img>
        </a>

        </div>
        <div class="footer-btn-grp"
        >
          <router-link to="/dataprotection">
            <div class="footer-btn"><span>{{ $t("footer.dataProtection") }}</span></div>
          </router-link>
          <router-link to="/imprint">
            <div class="footer-btn"><span>{{ $t("footer.imprint") }}</span></div>
          </router-link>
          <div class="footer-btn">
            <span>{{ $t("footer.followUs") }} </span>
            <a class="footer-icn" href="https://www.facebook.com/projectdioe/" target="_blank">
              <v-avatar size="15px">
                <img
                    src="https://dioe.at/fileadmin/img/FB-f-Logo__blue_29.png"
                    alt="John"

                >
              </v-avatar>

              <a class="footer-icn" href="https://twitter.com/sfb_dioe" target="_blank">
                <v-avatar size="15px">
                  <img
                      src="https://dioe.at/fileadmin/img/Twitter_Logo_White_On_Blue.png"
                      alt="John"

                  >
                </v-avatar>
              </a>
            </a>
            <a class="footer-icn" href="https://www.dioe.at/rss.xml" target="_blank">
              <v-avatar size="15px">
                <img
                    src="https://dioe.at/fileadmin/img/feed-icon-28x28.png"
                    alt="John"

                >
              </v-avatar>
            </a>
          </div>

        </div>
      </div>

    </v-card>

  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    openLink() {
      // window.location.href = 'http://example.com/';
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_variables';


.footer-img {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  max-width: 20vw;
  display: inline-block;
}

.footer-btn {
  display: inline;
  background-color: rgba(0, 0, 0, .2);
  color: white;
  padding: 5px;
  margin: 5px;

}

.footer-btn-grp {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

a {
  text-decoration: none;
}

.footer-icn {
  margin-left: 3px;
}

.footer-logos {
  text-align: center;
  position: absolute;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
  top: 50px;
  right: 0;
  left: 0;

}

.footer-big-img {

  position: relative;

  height: 200px;
  width: 100vw;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-size: contain;
  background: url(https://iam.dioe.at/fileadmin/img/mountains.png) no-repeat center bottom;
  bottom: 0;

}

.mobile-footer-big-img {
  position: relative;
  width: 100vw;
  height: 250px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  bottom: 50px;
  background-size: contain;
  background: url(https://iam.dioe.at/fileadmin/img/mountains.png) no-repeat center bottom;

}
</style>