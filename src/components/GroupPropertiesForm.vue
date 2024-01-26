<template>
    <div>
        <v-text-field v-model="group.name" :label="$t('groupSettings.name')"></v-text-field>
          <v-text-field v-model="group.description" :label="$t('groupSettings.description')"></v-text-field>
          <v-text-field v-model="group.organization" :label="$t('groupSettings.organization')"></v-text-field>


          Bearbeitungsrechte:
          Mitglieder
          <v-switch v-model="group.settings.membersCreate" :label="$t('groupSettings.addCollectionMembers')"></v-switch>
          Jeder:
          <v-switch v-model="group.settings.pub" :label="$t('groupSettings.seeGroup')"></v-switch>

      <v-switch v-model="group.settings.allCreate" :label="$t('groupSettings.addCollection')" :disabled="!group.settings.pub"></v-switch>

          Beitreten:
      <v-switch v-model="group.settings.canJoin" :label="$t('groupSettings.joinGroup')" :disabled="!group.settings.pub"></v-switch>

      <v-switch v-model="group.settings.needPassword" :label="$t('groupSettings.needPassword')"></v-switch>
          <v-text-field v-model="group.settings.password" :label="$t('general.password')" :disabled="!group.settings.needPassword"></v-text-field>

    </div>
</template>

<script>
export default {
    props:['group']
}
</script>