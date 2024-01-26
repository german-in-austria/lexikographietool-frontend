<template>
  <v-dialog scrollable v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }"
            @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="white--text">Hinweis</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="text-body-1 pt-5" style="height: 150px">Dieses Wort gibt es bereits so, oder in ähnlicher
        Ausführung. Möchtest du es trotzdem erstellen? Hier siehst du die bereits vorhandenen, ähnlichen Wörter:
      </v-card-text>
      <v-card-text>
        <div v-for="(item, index) in items" :key="index" class="card">
          <card-dialect :small="true" :card="item"></card-dialect>
        </div>
      </v-card-text>
      <v-card-text v-if="false">
        <card-slide-bar :items="items"></card-slide-bar>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click.native="agree">Trotzdem erstellen</v-btn>
        <v-btn color="grey" text @click.native="cancel">Abbrechen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CardSlideBar from "@/components/CardSlideBar";
import CardDialect from "@/components/CardDialect";

/**
 * Vuetify Confirm Dialog component
 *
 * Insert component where you want to use it:
 * <confirm ref="confirm"></confirm>
 *
 * Call it:
 * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
 * Or use await:
 * if (await this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
 *   // yes
 * }
 * else {
 *   // cancel
 * }
 *
 * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
 * <template>
 *   <v-app>
 *     ...
 *     <confirm ref="confirm"></confirm>
 *   </v-app>
 * </template>
 *
 * mounted() {
 *   this.$root.$confirm = this.$refs.confirm.open
 * }
 */
export default {
  components: {CardDialect, CardSlideBar},
  props: ['items'],
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: 'primary',
      width: 400,
      zIndex: 200
    }
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  }
}
</script>

<style>
.card {
  padding: 10px 20px;
}
</style>