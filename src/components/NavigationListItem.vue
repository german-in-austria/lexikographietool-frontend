<template>
  <v-list-item
      link
      :to="link"
  >
    <v-badge overlap  :value="!!badgeContent" color="error" :content="badgeContent">
        <v-icon >{{ icon }}</v-icon>
    </v-badge>

    <v-list-item-title class="ml-5">

        {{ name }}
      </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: "NavigationListItem",
  props:['link','icon','name', 'badgeContent']
}
</script>

<style scoped>

</style>