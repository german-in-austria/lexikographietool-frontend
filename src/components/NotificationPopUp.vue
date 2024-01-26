<template>
  <div style="position: fixed; top: 140px; right: -50px; z-index: 5;">
    <v-tab-transition group>
      <v-hover
          :key="item" v-for="(item,index) in messages"
          v-slot:default="{ hover }"

          :style="'top: ' + ((index)*70) +'px;' " class="notificationbar"
      >
      <v-btn rounded color="orange" @click="routeTo(index)"  absolute bottom
             right
             :style="'top: ' + ((index)*70) +'px;' " class="notificationbar">
        <v-icon style="position: absolute;left: 0;">mdi-bell-outline</v-icon>
        <span style="text-transform: none" class="ml-6 text-body-2 mr-8">{{ item.message }}</span>

        <v-fab-transition>
        <v-btn v-if="hover" @click="remove(index)" color="error" absolute top right x-small fab style="left: -20px; top: -27px">
          <v-icon>mdi-close</v-icon>
        </v-btn></v-fab-transition>
      </v-btn>
      </v-hover>
    </v-tab-transition>
    <Interval delay="10s" @tick="loadFromApi()" immediate/>
  </div>
</template>

<script>
import axios from "axios";
import Interval from "@/components/Interval";

export default {
  name: "NotificationPopUp",
  components: {Interval},
  data: () => ({
    messages: []
  }),
  methods: {
    addItem(item) {
      if (this.messages.length > 7)
        return
      if (!this.messages.some(obj => obj.id === item.id))
        this.messages.push(item)
    },
    routeTo(index) {
      let item = this.messages[index]
      this.remove(index)

      if (item.refers_to_lexeme != null)
        this.$router.push('/lexeme/' + item.refers_to_lexeme)
      if (item.refers_to_posting != null)
        this.$router.push('/posting/' + item.refers_to_posting)
    },
    remove(index) {
      axios.post("unset_notification/" + this.messages[index].id)
      this.messages.splice(index, 1)
    },
    loadFromApi() {
      axios.get("notifications/").then(response => {
        this.notifications = response.data.results
        response.data.results.forEach((item, i) => {
          setTimeout(this.addItem(item), i * 1000);
        })
      })
    }
  }
}
</script>

<style scoped>
.notificationbar {
  z-index: 60;
  min-height: 50px;
}
</style>