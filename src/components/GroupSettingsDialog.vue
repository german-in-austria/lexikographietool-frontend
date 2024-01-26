<template>
  <v-dialog v-model="dialog" persistent max-width="30rem" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">{{ $t("general.settings") }}</v-list-item>

    </template>
    <v-card>
      <v-card-title class="headline">
        {{ $t("general.settings") }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <group-properties-form :group="grp"></group-properties-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">
          Verwerfen
        </v-btn>
        <v-btn color="green darken-1" text @click="update">
          Änderungen speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import GroupPropertiesForm from "./GroupPropertiesForm.vue";

export default {
  name: "GroupSettingsDialog",
  components: {GroupPropertiesForm},
  props: ["group"],
  data: function () {
    return {
      dialog: false,
      settingsId: "",
      grp: {
        name: '',
        description: null,
        organization: null,
        settings: {
          id: null,
          pub: false,
          membersCreate: true,
          allCreate: false,
          needPassword: false,
          canJoin: false,
        }
      },
    }
  },
  methods: {
    update() {
      axios
          .put("group/settings/" + this.group.id + "/", {
            id: this.grp.settings.id,
            members_create_collection: this.grp.settings.membersCreate,
            public_create_collection: this.grp.settings.allCreate,
            need_password: this.grp.settings.needPassword,
            join_password: this.grp.settings.password,
            public_can_join: this.grp.settings.canJoin,
            public: this.grp.settings.pub,
          })
          .then(() => {
            this.dialog = false;
          });

      axios
          .put("group/" + this.group.id + "/", {
            id: this.group.id,
            name: this.grp.name,
            description: this.grp.description,
            settings: this.grp.settingsId,
            organization: this.grp.organization,
          })
          .then(() => {
            this.group.name = this.grp.name;

            this.group.description = this.grp.description;
            this.group.organization = this.grp.organization;
            this.dialog = false;

          });
    },
  },
  watch: {
    dialog() {
      this.grp.name = this.group.name
      this.grp.description = this.group.description
      this.grp.organization = this.group.organization
      axios.get("group/settings/" + this.group.id + "/").then((response) => {
        this.grp.settings.id = response.data.id;
        this.grp.settings.membersCreate = response.data.members_create_collection;
        this.grp.settings.allCreate = response.data.public_create_collection;
        this.grp.settings.needPassword = response.data.need_password;
        this.grp.settings.password = response.data.join_password;
        this.grp.settings.pub = response.data.public;
        this.grp.settings.canJoin = response.data.public_can_join;
      });
    },
  },
};
</script>

<style scoped>
</style>