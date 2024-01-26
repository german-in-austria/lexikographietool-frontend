<template>
    <v-dialog v-model="dialog" max-width="40rem" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <slot name="activator">
          <v-btn outlined v-bind="attrs" v-on.native.stop="on"
          >Gruppe beitreten
          </v-btn>
        </slot>
      </template>
      <v-card>
        <v-card-title>Gruppe beitreten</v-card-title>
        <v-card-text class="pa-3">
          <p class="text-body-1">{{ $t("joinGroup.passwdRequired") }}</p>
          <v-text-field v-model="password" type="password" flat solo-inverted :label='$t("general.password")'></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-btn
              :disabled="!password"
              elevation="2"
              @click="join"
          >Beitreten
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "GroupDetailJoinWithPasswordDialog",
  props: ['group'],
  data(){
    return{
      password:'',
    }
  },
  methods: {
    join() {
      axios.post('join/' + this.group.id + '/', {
        password: this.password
      }).then(() => this.$router.go())

    },
  }
}
</script>

<style scoped>

</style>