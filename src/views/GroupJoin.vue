<template>
  <v-container fluid>
    {{ $t("joinGroup.text", {group: group.name}) }}
    <p v-if="group.requires_password">{{ $t("joinGroup.passwdRequired") }}</p>
    <v-text-field v-if="group.requires_password"  v-model="password" type="password" flat solo-inverted :label='$t("general.password")'></v-text-field>
    <v-card-actions>
      <v-btn
          :disabled="group.requires_password && !password"
          elevation="2"
          @click="join"
      >Beitreten
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import Group from "@/objects/Group";
import axios from 'axios'

export default {
  name: "GroupJoin",
  data: () => ({
    group: new Group(),
    password: '',
  }),
  mounted() {
    axios.get('/groupname/' + this.$route.params.id + '/').then((response) => {
      this.group = response.data;
    });
  },
  methods: {
    join() {
      axios.post('join/' + this.$route.params.id + '/', {
        hash: this.$route.params.hash,
        password: this.password
      }).then(() => this.$router.push('/groups/' + this.$route.params.id))

    },
  }
}
</script>

<style scoped>

</style>