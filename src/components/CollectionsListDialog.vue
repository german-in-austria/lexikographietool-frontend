<template>
<v-dialog
        v-model="value"
        width="500"
    >
    <p>hoi</p>
    </v-dialog>
</template>
<script>
export default {
  data : () =>({
    value:false,
  }),
  computed: {
  propModel: {
    get () { return this.value },
    set (value) { this.$emit('input', value) },
  },
},

}
</script>