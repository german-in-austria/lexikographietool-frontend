<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        outlined
        :to="'/collections/' + collection.id"
        :elevation="hover ? 2 : 0"
      >
        <v-card-title>{{ collection.name }}</v-card-title>
        <v-card-subtitle>{{collection.description}}</v-card-subtitle>
        <v-card-subtitle v-if="!!collection.groupname">Gruppe: {{collection.groupname}}</v-card-subtitle>
        <v-card-text>
          <v-chip>{{collection.count_lexemes}} Wörter</v-chip>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>
<script>
export default {
    data: () =>({
    }),
    props: ['collection']
};
</script>