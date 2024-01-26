<template>
  <v-dialog v-model="dialog" max-width="40rem" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator">
        <v-list-item v-bind="attrs" v-on.native.stop="on" text
        >{{ $t("groupDetails.invitationLink") }}
        </v-list-item>
      </slot>
    </template>
    <v-card>
      <v-card-text class="pa-3">
        <v-text-field
            v-model="inviteLink"
            id="tocopy"
            append-icon="mdi-content-copy"
            @click:append="copyText"
            outlined
            readonly
            :label=' $t("groupDetails.invitationLink") '
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="1000" color="info">
      Kopiert
    </v-snackbar>
  </v-dialog>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";

export default {
name: "GroupDetailInvitationLinkDialog",
  data:()=>({
    inviteLink:'',
    snackbar:false,
    dialog:false,
  }),
  mounted() {
    RequestHandler.getInvite(this.$route.params.id).then((response) => {
      this.inviteLink =
          "https://lex.dioe.at/groups/join/" +
          this.$route.params.id +
          "/" +
          response.data;
    });
  },
  methods:{
    copyText() {
      let input = document.getElementById("tocopy");
      input.select();
      document.execCommand("copy");
      this.snackbar = true;
    },
  }
}
</script>

<style scoped>

</style>