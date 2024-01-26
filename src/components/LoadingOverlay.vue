<template>
  <div>
    <v-overlay :value="!!overlay || !!loading">
      <v-progress-circular
          v-if="!!loading"
          :size="150"
          color="white"
          indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "LoadingOverlay",
  props:['overlay', 'loading']
}
</script>

<style scoped>

</style>