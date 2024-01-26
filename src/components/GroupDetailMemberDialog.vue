<template>
  <v-dialog v-model="dialog" max-width="40rem" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator">
        <v-list-item v-bind="attrs" v-on.native.stop="on" text
        >{{ $t("groupDetails.members") }}
        </v-list-item>
      </slot>
    </template>
    <v-card>
      <v-card-title>{{ $t("groupDetails.members") }}</v-card-title>
      <v-card-text>
    <v-list>


      <v-list-item>
        <v-list-item-title>
          <router-link class="text-decoration-none" :to="`/account/${group.owner.username}`">

          {{ group.owner.username }}
          </router-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-item
          v-for="(member, index) in group.members"
          :key="member.username"
      >
        <v-list-item-title>
          <router-link class="text-decoration-none" :to="`/account/${member.username}`">
          {{ member.username }}</router-link>
        </v-list-item-title>
        <v-list-item-icon v-if="group.is_owner"
        ><v-icon @click="removeMember(member.username, index)"
        >mdi-delete</v-icon
        ></v-list-item-icon
        >
      </v-list-item>
    </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
name: "GroupDetailMemberDialog",
  props:['group'],
  data:()=>({
    dialog:false,
  }),
  methods:{

    removeMember(user, listindex) {
      axios
          .delete("group/" + this.$route.params.id + "/" + user + "/")
          .then(() => {
            this.group.members.splice(listindex, 1);
          });
    },
  }
}
</script>

<style scoped>

</style>
