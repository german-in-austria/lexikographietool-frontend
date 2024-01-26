<template>
  <div ref="container">
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-fab-transition>
          <v-btn
                 color="pink"
                 dark
                 fixed
                 top
                 right
                 @click="unsee"

                 fab
                 class="notification-btn"
                 v-bind="attrs"
                 v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <v-list >
        <v-list-item
            @click="routeTo(item)"
            v-for="(item, i) in notifications"
            :key="i"
        >
          <v-list-item-title>{{ item.message }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!!next" @click="loadMore">Mehr...</v-list-item>
      </v-list>

    </v-menu>
    <notification-pop-up ref="popUp"></notification-pop-up>
  </div>

</template>

<script>

import axios from "axios";
import NotificationPopUp from "@/components/NotificationPopUp";
export default {
  name: "Notifications",
  components: {NotificationPopUp},
  data: () => ({
    next: null,
    notifications: null
  }),
  mounted() {
    axios.get("notifications/").then(response => {
      this.notifications = response.data.results
      this.next = response.data.links.next
    })

  },
  methods: {
    loadMore() {
      axios.get(this.next).then(response => {
        this.notifications = this.notifications.concat(response.data.results);
        this.next = response.data.links.next;
      })
    },
    routeTo(item) {
      if (item.refers_to_lexeme != null)
        this.$router.push('/lexeme/' + item.refers_to_lexeme)
      if (item.refers_to_posting != null)
        this.$router.push('/posting/' + item.refers_to_posting)
    },
    unsee() {


    }
  },
  computed: {
    unseen() {
      return this.notifications?.[0]?.active
    }
  }

}
</script>

<style scoped>
.notification-btn {
  margin-top: 150px;
}
</style>