import Vue from 'vue'
import Vuetify from 'vuetify'

// import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import "@/sass/variables.scss"

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)


const vuetify = new Vuetify({

    theme: {
        themes: {
            light: {
                primary: colors.cyan.darken1,
                secondary: colors.lime,
                accent: colors.shades.black,
                error: colors.red.accent3,
                card1: colors.red,
                card2: colors.yellow,
                card3: colors.orange,
                card4: colors.green,
                card5: colors.pink,
                card6: colors.cyan,
                card7: colors.blue,
                logocolor: "#0364a7"
            },
            dark: {
                primary: colors.blue.lighten3,
            },
        },
    },
})
export default vuetify