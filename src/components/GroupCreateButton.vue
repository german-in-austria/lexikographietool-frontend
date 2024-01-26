<template>
  <div>

    <span v-if="text">
    <a class="success--text" @click="dialog=true">{{ text }}</a></span>
    <v-list-item v-else @click.stop="dialog=true">neue Gruppe erstellen</v-list-item>
    <!--    <v-hover v-slot="{ hover }">-->
    <!--      <v-card-->
    <!--        @click.prevent="dialog = true"-->
    <!--        :elevation="hover ? 4 : 0"-->
    <!--        outlined-->
    <!--        class="mx-auto"-->
    <!--      >-->
    <!--        <v-card-title>Gruppe erstellen</v-card-title>-->
    <!--        <v-card-actions class="justify-center">-->

    <!--          <v-icon-->
    <!--            size="48-->
    <!--"-->
    <!--            >mdi-plus-->
    <!--          </v-icon>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-hover>-->

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline"> Neue Gruppe</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <group-properties-form :group="group"></group-properties-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="createGroup()"
          >erstellen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Axios from 'axios';
import GroupPropertiesForm from "./GroupPropertiesForm.vue";

export default {
  components: {GroupPropertiesForm},
  props:['text'],
  data: () => ({
    dialog: false,
    group: {
      name: '',
      description: null,
      organization: null,
      settings: {
        pub: false,
        membersCreate: true,
        allCreate: false,
        needPassword: false,
      }
    },
  }),
  methods: {
    async createGroup() {
      const response = await Axios.post('group/', this.group)
      await Axios.put('group/settings/' + response.data.id + '/', {
        'members_create_collection': this.group.settings.membersCreate,
        'public_create_collection': this.group.settings.allCreate,
        'need_password': this.group.settings.needPassword,
        'join_password': this.group.settings.password,
        'public': this.group.settings.pub
      })
      this.$router.push('/groups/' + response.data.id)

    },
  },
};
</script>