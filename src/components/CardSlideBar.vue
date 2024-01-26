<template>
  <div class="scrollmenu">
        <div v-for="(item, index) in items" :key="index" class="card">
          <card-dialect :small="true" :card="item"></card-dialect>
        </div>

  </div>
</template>

<script>
import CardDialect from "@/components/CardDialect";
export default {
name: "CardSlideBar",
  components: {CardDialect},
  props:['items']
}
</script>

<style scoped>
.scrollmenu {
  overflow: auto;
  white-space: nowrap;
}

.card {
  display: inline-block;
  color: white;
  padding: 14px;
  text-decoration: none;
  max-width: 300px;
  vertical-align: middle;
}
</style>